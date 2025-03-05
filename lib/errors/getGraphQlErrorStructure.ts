import type { GraphQLFormattedError } from 'graphql/index';

function getGraphQlErrorStructure(errorMessage: string): ReadonlyArray<GraphQLFormattedError> | null {
  return [
    {
      message: errorMessage,
    },
  ];
}

export default getGraphQlErrorStructure;
