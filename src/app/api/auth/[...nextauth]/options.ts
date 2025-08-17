import type { NextAuthOptions, Session, SessionOptions, User } from 'next-auth';

import type { JWT } from 'next-auth/jwt';

import { getPublicEnv } from '@configs/api';
import { configPathRoutes } from '@configs/routes';
import { currentAccount } from '@lib/api/currentAccount';
import { currentAccountTotal } from '@lib/api/currentAccountTotal';
import { login } from '@lib/api/login';

import { switchAccount } from '@lib/api/switchAccount';
import CustomGraphQLError from '@lib/errors/CustomGraphQLError';
import CredentialsProvider from 'next-auth/providers/credentials';

const nextAuthOptionSession: Partial<SessionOptions> = {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
};

const {
  signIn,
  newUser,
} = configPathRoutes;

const authOptions: NextAuthOptions = {
  session: nextAuthOptionSession,
  pages: {
    signIn,
    newUser,
  },
  callbacks: {
    async jwt({ user: jwtUser, token }) {
      if (jwtUser && !!jwtUser?.session) {
        const { user, account, session } = jwtUser;
        token = { ...token, user, account, session };
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user;
      session.account = token.account;
      session.session = token.session;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email Address',
          type: 'email',
          placeholder: 'example@example.com',
        },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User> {
        const publicApiUrl = getPublicEnv().NEXT_PUBLIC_API_URL;
        if (!publicApiUrl) {
          throw new CustomGraphQLError('NEXT_PUBLIC_API_URL env var not provided');
        }

        if (!credentials?.username || !credentials?.password) {
          throw new CustomGraphQLError('Username and password is required');
        }

        const { username, password } = credentials;
        const { token, isAdmin, roles, expiresAt, errors } = await login(username, password);

        if (errors) {
          throw new CustomGraphQLError(errors);
        }

        if (!token) {
          throw new CustomGraphQLError('Incorrect login or password');
        }
        const { user, account } = await currentAccount(token);

        return {
          id: `${user.ID}`,
          user,
          account,
          session: {
            accessToken: token,
            expiresAt: expiresAt ? new Date(expiresAt) : null,
            isAdmin,
            isSuperAdmin: roles.includes('system:admin'),
            isAnonymous: roles.includes('anonymous'),
            roles: roles || [],
          },
        };
      },
    }),
    CredentialsProvider({
      id: 'token',
      name: 'Token',
      type: 'credentials',
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials): Promise<User> {
        const publicApiUrl = getPublicEnv().NEXT_PUBLIC_API_URL;
        if (!publicApiUrl) {
          throw new CustomGraphQLError('NEXT_PBLIC_API_URL env var not provided');
        }

        if (!credentials?.token) {
          throw new CustomGraphQLError('Token is required');
        }

        const { token } = credentials;
        const { user, account, session, errors } = await currentAccountTotal(token);

        if (errors) {
          throw new CustomGraphQLError(errors);
        }

        return {
          id: `${user.ID}`,
          user,
          account,
          session: {
            accessToken: session.token,
            expiresAt: session.expiresAt ? new Date(session.expiresAt) : null,
            isAdmin: session.isAdmin,
            isSuperAdmin: session.roles.includes('system:admin'),
            isAnonymous: session.roles.includes('anonymous'),
            roles: session.roles || [],
          },
        };
      },
    }),
    CredentialsProvider({
      id: 'switch',
      name: 'Switch Account',
      type: 'credentials',
      credentials: {
        accountID: { label: 'Account ID', type: 'number' },
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials): Promise<User> {
        const publicApiUrl = getPublicEnv().NEXT_PUBLIC_API_URL;
        if (!publicApiUrl) {
          throw new Error('NEXT_PUBLIC_API_URL env var not provided');
        }

        if (!credentials?.accountID || !credentials?.token) {
          throw new Error ('Account ID and token is required');
        }

        const { accountID, token } = credentials;
        const { token: newToken } = await switchAccount(Number(accountID), token);
        if (!newToken) {
          throw new Error ('Account switch failed');
        }
        const { user, account, session } = await currentAccountTotal(newToken);

        return { id: `${user.ID}`, user, account, session: {
          accessToken: session.token,
          expiresAt: session.expiresAt ? new Date(session.expiresAt) : null,
          isAdmin: session.isAdmin,
          isSuperAdmin: session.roles.includes('system:admin'),
          isAnonymous: session.roles.includes('anonymous'),
          roles: session.roles || [],
        } };
      },
    }),
  ],
};

export default authOptions;
