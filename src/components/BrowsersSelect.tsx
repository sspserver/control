import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import type { ListBrowsersQuery } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import Multiselect from '@tailus-ui/Multiselect';
import { ActiveStatus, ListBrowsersDocument } from '@/generated/graphql';

type BrowsersSelectProps = {} & Omit<MultiselectProps, 'data'>;

function BrowsersSelect(props: BrowsersSelectProps) {
  const { loading: isLoading, data: deviceTypes } = useQuery<ListBrowsersQuery>(ListBrowsersDocument, {
    variables: {
      filter: {
        active: ActiveStatus.Active,
      },
      size: 1000,
    },
    fetchPolicy: 'network-only',
  });
  const selectData = deviceTypes?.result?.list?.map(({ ID, name }) => ({ name, value: ID })) ?? [];

  return (
    <Multiselect loading={isLoading} data={selectData} {...props} />
  );
}

export default BrowsersSelect;
