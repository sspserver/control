import type { GraphQLFormattedError } from 'graphql/index';

type ErrorMap<T> = Record<keyof T, string>;

function graphQLErrorToMap<T extends Record<string, any>>(errors: ReadonlyArray<GraphQLFormattedError>): ErrorMap<T> {
  const errorMap = new Map<keyof T, string>();

  errors.forEach((error) => {
    const { message, extensions } = error;
    const field = extensions?.field ?? 'result';
    const key = field as keyof T;

    errorMap.set(key, message);
  });

  return Object.fromEntries(errorMap) as ErrorMap<T>;
}

export default graphQLErrorToMap;
