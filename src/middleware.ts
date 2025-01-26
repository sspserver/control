import type { JWT } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

const authMiddleware = withAuth({
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
    newUser: '/auth/register',
  },
  callbacks: {
    authorized: ({ req, token }: {
      token: JWT | null;
      req: NextRequest;
    }) => {

      return true;
      if (!token || !token.session || !token.session?.accessToken) {
        return false;
      }
      if (token.session.expiresAt && new Date(token.session.expiresAt) < new Date()) {
        return false;
      }
      return true;
    },
  },
});

export const config = {
  matcher: [
    /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - _next/image/icons (icons optimization files)
         * - favicon.ico (favicon file)
         * - auth (authentication routes)
         */
    '/((?!api|_next/static|_next/image|icons|favicon.ico|auth|public|images|css).*)',
  ],
};

export default authMiddleware;
