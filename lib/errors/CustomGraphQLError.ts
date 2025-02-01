import type { GraphQLFormattedError } from 'graphql/index';

class CustomGraphQLError extends Error {
  constructor(public error: string | ReadonlyArray<GraphQLFormattedError>) {
    let superError;

    if (Array.isArray(error)) {
      superError = JSON.stringify(error);
    } else {
      superError = JSON.stringify({ message: error });
    }

    super(superError);

    this.name = 'CustomGraphQLErrors';
  }

  static toGraphQLFormattedError(error: string): ReadonlyArray<GraphQLFormattedError> {
    return JSON.parse(error);
  }
}

export default CustomGraphQLError;
