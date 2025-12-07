import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import type { ListOsQuery } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import Multiselect from '@tailus-ui/Multiselect';
import { useMemo } from 'react';
import { ListOsDocument, Ordering } from '@/generated/graphql';

type OsSelectProps = {} & Omit<MultiselectProps, 'data'>;

function OsSelect(props: OsSelectProps) {
  const { loading: isLoading, data: osesResponse } = useQuery<ListOsQuery>(ListOsDocument, {
    variables: {
      size: 1000,
      filter: { parentID: [0] },
      order: [
        {
          name: Ordering.Asc,
        },
      ],
    },
    fetchPolicy: 'cache-first',
  });
  const osesData = useMemo(() => osesResponse?.result?.list ?? [], [osesResponse]);
  const selectData = useMemo(() => osesData.map(({ name, ID, versions }) => ({
    name,
    group: versions?.map(({ name, ID }) => ({ name, value: ID })),
    value: ID,
  })) ?? [], [osesData]);

  return (
    <Multiselect loading={isLoading} data={selectData} {...props} />
  );
}

export default OsSelect;
