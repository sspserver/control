type PublicEnv = {
  NEXT_PUBLIC_API_URL?: string;
  API_URL?: string;
};

export const getPublicEnv = (): PublicEnv =>
  typeof window !== 'undefined'
    ? (window as any).__ENV__ ?? {}
    : {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        API_URL: process.env.API_URL,
      };

// const defaultApiPath = 'none';

// export const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
// export const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || defaultApiPath;
