import { useListCategoriesQuery } from '@/generated/graphql';
import { useMemo } from 'react';

function useCategoriesSelect() {
  const { data: listCategoriesResponse, loading: isListCategoriesLoading } = useListCategoriesQuery(
    {
      variables: {
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
