import type { ListCountriesQuery } from '@/generated/graphql';
import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import { ListCountriesDocument } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import Multiselect from '@tailus-ui/Multiselect';

type CountriesSelectProps = {} & Omit<MultiselectProps, 'data'>;

function CountriesSelect(props: CountriesSelectProps) {
  const { loading: isLoading, data: deviceTypes } = useQuery<ListCountriesQuery>(ListCountriesDocument, { fetchPolicy: 'cache-first' });
  const selectData = deviceTypes?.list?.map(({ ID, name }) => ({ name, value: `${ID}` })) ?? [];

  return (
    <Multiselect loading={isLoading} data={selectData} {...props} />
  );
}

export default CountriesSelect;
