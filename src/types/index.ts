export type CommonAPIUser = {
  ID?: string | number;
  email?: string;
  status?: string;
  isAcceptAgreement?: boolean;
};

export type CommonAPIUserAccount = {
  ID?: string | number;
  name?: string;
  description?: string;
  status?: string;
};

export type CommonAPISessionExt = {
  accessToken?: string;
  expiresAt?: Date | null;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  isAnonymous?: boolean;
  roles?: string[];
};
