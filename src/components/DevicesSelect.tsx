import type { ListDeviceModelsQuery } from '@/generated/graphql';
import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import { ListDeviceModelsDocument } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import Multiselect from '@tailus-ui/Multiselect';
import { useMemo } from 'react';

type DevicesSelectProps = {} & Omit<MultiselectProps, 'data'>;

function DevicesSelect(props: DevicesSelectProps) {
  const { loading: isLoading, data: deviceTypesResponse } = useQuery<ListDeviceModelsQuery>(ListDeviceModelsDocument, { fetchPolicy: 'network-only' });
  const deviceTypes = useMemo(() => deviceTypesResponse?.result?.list ?? [], [deviceTypesResponse]);
  const selectData = useMemo(() => deviceTypes.map(({ name, ID, versions }) => ({
    name,
    group: versions?.map(({ name, ID }) => ({ name, value: ID })),
    value: ID,
  })) ?? [], [deviceTypes]);

  return (
    <Multiselect loading={isLoading} data={selectData} {...props} />
  );
}

export default DevicesSelect;
