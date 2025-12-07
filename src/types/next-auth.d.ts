import type { DefaultUser } from 'next-auth/src/core/types';
import type { CommonAPISessionExt, CommonAPIUser, CommonAPIUserAccount } from '@/types';

declare module 'next-auth/jwt' {
  type JWT = {
    user: CommonAPIUser;
    account: CommonAPIUserAccount;
    session: CommonAPISessionExt;
  };
}

declare module 'next-auth' {
  // eslint-disable-next-line
  interface Session {
    user: CommonAPIUser;
    account: CommonAPIUserAccount;
    session: CommonAPISessionExt;
  }

  // eslint-disable-next-line
  interface User extends DefaultUser {
    id: string;
    user: CommonAPIUser;
    account: CommonAPIUserAccount;
    session: CommonAPISessionExt;
  }
}
