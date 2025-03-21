import type { JWT } from 'next-auth/jwt';
import type { NextRequestWithAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';
// import { configPathRoutes } from '@configs/routes';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// const { signIn, verifyRequest, newUser } = configPathRoutes;

type AuthorizedProps = {
  token: JWT | null;
  req: NextRequest;
};

async function middleware(request: NextRequestWithAuth) {
  const { nextUrl, nextauth } = request;
  const { pathname } = nextUrl;
  const isVisitAuthPage = pathname.startsWith('/auth');
  const token = nextauth.token;

  if (isVisitAuthPage && token && token.session && token.session.accessToken && token.session.expiresAt && new Date(token.session.expiresAt) > new Date()) {
    const url = request.nextUrl.clone();
    url.pathname = '/';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

const authMiddleware = withAuth(middleware, {
  // pages: {
  //   signIn,
  //   verifyRequest,
  //   newUser,
  // },
  callbacks: {
    authorized: ({ token, req }: AuthorizedProps) => {
      const { pathname } = req.nextUrl;
      const isVisitAuthPage = pathname.startsWith('/auth');

      if (!isVisitAuthPage) {
        if (!token || !token.session || !token.session?.accessToken) {
          return false;
        }
        if (token.session.expiresAt && new Date(token.session.expiresAt) < new Date()) {
          return false;
        }
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
     * - manifest.webmanifest (web manifest file)
     */
    '/((?!api|_next/static|_next/image|icons|favicon.ico|public|images|css|manifest.webmanifest).*)',
  ],
};

export default authMiddleware;
