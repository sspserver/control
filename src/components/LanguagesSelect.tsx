import type { Lang } from '@/generated/graphql';

import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import { useQuery } from '@apollo/client';
import { gqlLanguagesQuery } from '@lib/graphql/queries/languages';
import Multiselect from '@tailus-ui/Multiselect';

type LanguagesSelectProps = {} & Omit<MultiselectProps, 'data'>;

function LanguagesSelect(props: LanguagesSelectProps) {
  const {
    data: responseLanguagesList,
    loading: isLanguagesListLoading,
  } = useQuery<{ languages: Lang[] }>(gqlLanguagesQuery, {
    fetchPolicy: 'cache-first',
  });
  const selectData = responseLanguagesList
    ?.languages
    ?.map(
      ({ ID, name }) => ({ name, value: ID }),
    ) ?? [];

  return (
    <Multiselect loading={isLanguagesListLoading} data={selectData} {...props} />
  );
}

export default LanguagesSelect;
