import { useListCategoriesQuery } from '@/generated/graphql';
import { useMemo } from 'react';

function useCategoriesSelect() {
  const { data: listCategoriesResponse, loading: isListCategoriesLoading } = useListCategoriesQuery(
    {
      fetchPolicy: 'network-only',
      variables: {
        page: 1,
        size: 100,
        filter: {
          parentID: [0],
        },
      },
    },
  );
  const listCategories = useMemo(() => listCategoriesResponse?.result?.list.map(({ name, ID }) => ({
    name,
    value: `${ID}`,
  })) ?? [], [listCategoriesResponse]);

  return {
    listCategories,
    isListCategoriesLoading,
  };
}

export default useCategoriesSelect;
