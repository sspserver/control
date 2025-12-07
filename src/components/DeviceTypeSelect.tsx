import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import type { ListDeviceTypesQuery } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import Multiselect from '@tailus-ui/Multiselect';
import { ListDeviceTypesDocument } from '@/generated/graphql';

type DeviceTypeSelectProps = {} & Omit<MultiselectProps, 'data'>;

function DeviceTypeSelect(props: DeviceTypeSelectProps) {
  const { loading: isLoading, data: deviceTypes } = useQuery<ListDeviceTypesQuery>(ListDeviceTypesDocument, { fetchPolicy: 'cache-first' });
  const selectData = deviceTypes?.result?.map(({ ID, name }) => ({ name, value: ID })) ?? [];

  return (
    <Multiselect loading={isLoading} data={selectData} {...props} />
  );
}

export default DeviceTypeSelect;
