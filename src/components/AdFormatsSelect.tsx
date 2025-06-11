import type { ListAdFormatsQuery } from '@/generated/graphql';
import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import { ListAdFormatsDocument } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import Multiselect from '@tailus-ui/Multiselect';

type AdFormatsSelectProps = {} & Omit<MultiselectProps, 'data'>;

function AdFormatsSelect(props: AdFormatsSelectProps) {
  const { loading: isLoading, data: adFormats } = useQuery<ListAdFormatsQuery>(ListAdFormatsDocument, { fetchPolicy: 'network-only' });
  const selectData = adFormats?.result?.list?.map(({ codename, title }) => ({ name: title, value: codename })) ?? [];

  return (
    <Multiselect
      loading={isLoading}
      data={selectData}
      {...props}
    />
  );
}

export default AdFormatsSelect;
