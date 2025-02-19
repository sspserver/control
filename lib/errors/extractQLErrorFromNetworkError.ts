import type { GraphQLFormattedError } from 'graphql/index';

export const extractQLErrorFromNetworkError = (originalError: unknown): ReadonlyArray<GraphQLFormattedError> | null =>
  originalError != null
  && typeof originalError === 'object'
  && 'networkError' in originalError
  && originalError?.networkError != null
  && typeof originalError?.networkError === 'object'
  && 'result' in originalError.networkError
  && originalError?.networkError?.result != null
  && typeof originalError?.networkError.result === 'object'
  && 'errors' in originalError?.networkError.result
  && Array.isArray(originalError.networkError.result.errors)
    ? originalError.networkError.result.errors
    : null;
