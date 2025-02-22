import type { ListOsQuery } from '@/generated/graphql';
import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import { ActiveStatus, ListOsDocument } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import Multiselect from '@tailus-ui/Multiselect';

type OsSelectProps = {} & Omit<MultiselectProps, 'data'>;

function OsSelect(props: OsSelectProps) {
  const { loading: isLoading, data: deviceTypes } = useQuery<ListOsQuery>(ListOsDocument, {
    variables: {
      size: 1000,
      filter: {
        active: ActiveStatus.Active,
      },
    },
    fetchPolicy: 'network-only',
  });
  const selectData = deviceTypes?.result?.list?.map(({ ID, name }) => ({ name, value: ID })) ?? [];

  return (
    <Multiselect loading={isLoading} data={selectData} {...props} />
  );
}

export default OsSelect;
