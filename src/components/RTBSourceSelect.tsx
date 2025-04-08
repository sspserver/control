import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import {
  Ordering,
  useListRtbSourcesQuery,
} from '@/generated/graphql';
import Multiselect from '@tailus-ui/Multiselect';

type RTBSourceSelectProps = {} & Omit<MultiselectProps, 'data'>;

function RTBSourceSelect(props: RTBSourceSelectProps) {
  const {
    data: responseRtbList,
    loading: isRtbListLoading,
  } = useListRtbSourcesQuery({
    variables: {
      // filter: {
      //   active: ActiveStatus.Active,
      // },
      order: {
        createdAt: Ordering.Desc,
      },
    },
    fetchPolicy: 'network-only',
  });
  const selectData = responseRtbList
    ?.result
    ?.list
    ?.map(
      ({ ID, title }) => ({ name: `[${ID}]: ${title}`, value: ID }),
    ) ?? [];

  return (
    <Multiselect loading={isRtbListLoading} data={selectData} {...props} />
  );
}

export default RTBSourceSelect;
