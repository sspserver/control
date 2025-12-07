import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import Multiselect from '@tailus-ui/Multiselect';
import {
  Ordering,
  useListZonesQuery,
} from '@/generated/graphql';

type AdUnitSelectProps = {} & Omit<MultiselectProps, 'data'>;

function AdUnitSelect(props: AdUnitSelectProps) {
  const {
    data: responseAdUnitList,
    loading: isAdUnitListLoading,
  } = useListZonesQuery({
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

  const selectData = responseAdUnitList
    ?.result
    ?.list
    ?.map(
      ({ ID, title }) => ({ name: `[${ID}]: ${title}`, value: ID }),
    ) ?? [];

  return (
    <Multiselect loading={isAdUnitListLoading} data={selectData} {...props} />
  );
}

export default AdUnitSelect;
