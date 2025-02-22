import type { ListDeviceModelsQuery } from '@/generated/graphql';
import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import { ListDeviceModelsDocument } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import Multiselect from '@tailus-ui/Multiselect';

type DevicesSelectProps = {} & Omit<MultiselectProps, 'data'>;

function DevicesSelect(props: DevicesSelectProps) {
  const { loading: isLoading, data: deviceTypes } = useQuery<ListDeviceModelsQuery>(ListDeviceModelsDocument, { fetchPolicy: 'network-only' });
  const selectData = deviceTypes?.result?.list?.map(({ ID, name }) => ({ name, value: ID })) ?? [];

  return (
    <Multiselect loading={isLoading} data={selectData} {...props} />
  );
}

export default DevicesSelect;
