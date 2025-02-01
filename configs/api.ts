const defaultApiPath = 'none';

export const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
export const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || defaultApiPath;
