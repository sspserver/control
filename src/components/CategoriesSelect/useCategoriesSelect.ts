import { useMemo } from 'react';
import { useListCategoriesQuery } from '@/generated/graphql';

function useCategoriesSelect() {
  const { data: listCategoriesResponse, loading: isListCategoriesLoading } = useListCategoriesQuery(
    {
      variables: {
        size: 1000,
        filter: { parentID: [0] },
      },
      fetchPolicy: 'network-only',
    },
  );
  const listCategories = useMemo(() => listCategoriesResponse?.result?.list.map(({ name, ID, childrens }) => ({
    name,
    group: childrens.map(({ name, ID }) => ({ name, value: ID })),
    value: ID,
  })) ?? [], [listCategoriesResponse]);

  return {
    listCategories,
    isListCategoriesLoading,
  };
}

export default useCategoriesSelect;
