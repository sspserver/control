import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const gqQuery = async (query: string, variables: any, token: string | undefined = undefined) => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PBLIC_API_URL env var not provided');
  }

  const headers = {
    'Content-Type': 'application/json',
  } as { [key: string]: string };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const body = JSON.stringify(variables ? { query, variables } : { query });
  const response = await fetch(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL, {
    method: 'POST',
    headers,
    body,
  });
  const { errors, data } = await response.json();
  if (errors) {
    throw new Error(errors[0].message);
  }
  return data;
};

const login = async (username: string, password: string) => {
  const query = `mutation {
    login (login: "${username}", password: "${password}") {
      token
      expiresAt
      isAdmin
      roles
    }
  }`;

  const data = await gqQuery(query, null);
  const token = data?.login?.token || null;
  const isAdmin = data?.login?.isAdmin || false;
  const roles = data?.login?.roles || [];
  const expiresAt = data?.login?.expiresAt || null;

  return {
    username,
    token,
    isAdmin,
    roles,
    expiresAt,
  };
};

const switchAccount = async (accountID: number, token: string) => {
  const query = `mutation {
    switchAccount (id: ${accountID}) {
      token
      expiresAt
      isAdmin
      roles
    }
  }`;

  const data = await gqQuery(query, null, token);
  const newToken = data?.switchAccount?.token || null;
  const isAdmin = data?.switchAccount?.isAdmin || false;
  const roles = data?.switchAccount?.roles || [];
  const expiresAt = data?.switchAccount?.expiresAt || null;

  return {
    token: newToken,
    isAdmin,
    roles,
    expiresAt,
  };
};

const currentAccount = async (token: string) => {
  const query = `query currentAccount {
    user: currentUser {
      user {
        ID
        username
        status
      }
    }
    account: currentAccount {
      account {
        ID
        status
        title
        description
        logoURI
      }
    }
  }`;

  const data = await gqQuery(query, null, token);
  const account = (data?.account?.account || {});
  const user = (data?.user?.user || {});

  return { user, account };
};

const currentAccountTotal = async (token: string) => {
  const query = `query {
    user: currentUser {
      user {
        ID
        name: username
        username
        email: username
        status
      }
    }
    account: currentAccount {
      account {
        ID
        status
        title
        description
        logoURI
      }
    }
    session: currentSession {
      token
      expiresAt
      isAdmin
      roles
    }
  }`;

  const data = await gqQuery(query, null, token);
  const account = (data?.account?.account ?? {});
  const user = (data?.user?.user ?? {});
  const session = (data?.session ?? {});

  return { user, account, session };
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/register',
  },
  callbacks: {
    // TODO: define types
    async jwt({ user, token }: { token: JWT; user: User | null }) {

      if (user && !!user?.session) {
        token.user = user.user;
        token.account = user.account;
        token.session = user.session;
      }

      console.log('xxx session jwt', token);

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // console.log('xxx session authOptions 1', session, token);


      session.user = token.user;
      session.account = token.account;
      session.session = token.session;

      console.log('xxx session session', session);

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
        password: { label: 'Password', type: 'password' },
      },
      // TODO: fix username typings issue, remove credentials any, etc
      async authorize(credentials: any): Promise<User> {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error('NEXT_PBLIC_API_URL env var not provided');
        }
        const { username, password } = credentials;
        const { token, isAdmin, roles, expiresAt } = await login(username, password);

        if (!token) {
          throw new Error ('Incorrect login or password');
        }
        const { user, account } = await currentAccount(token);

        console.log('xxx user, account, session 22', token, user, account)


        return { id: `${user.ID}`, user, account, session: {
          accessToken: token,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
          isAdmin,
          isSuperAdmin: roles.includes('system:admin'),
          isAnonymous: roles.includes('anonymous'),
          roles: roles || [],
        } };
      },
    }),
    CredentialsProvider({
      id: 'token',
      name: 'Token',
      type: 'credentials',
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials: any): Promise<User> {

        console.log('xxx user, account, session', credentials);

        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error('NEXT_PBLIC_API_URL env var not provided');
        }

        const { token } = credentials;
        const { user, account, session } = await currentAccountTotal(token);

        console.log('xxx user, account, session', user, account, session)


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
    CredentialsProvider({
      id: 'switch',
      name: 'Switch Account',
      type: 'credentials',
      credentials: {
        accountID: { label: 'Account ID', type: 'number' },
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials: any): Promise<User> {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error('NEXT_PBLIC_API_URL env var not provided');
        }

        const { accountID, token } = credentials;
        const { token: newToken } = await switchAccount(accountID, token);
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
