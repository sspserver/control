import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';
import {
  Ordering,
  useListApplicationsQuery,
} from '@/generated/graphql';
import Multiselect from '@tailus-ui/Multiselect';

type ApplicationsSelectProps = {} & Omit<MultiselectProps, 'data'>;

function ApplicationsSelect(props: ApplicationsSelectProps) {
  const {
    data: responseApplicationsList,
    loading: isListApplicationsLoading,
  } = useListApplicationsQuery(
    {
      variables: {
        // filter: {
        //   active: ActiveStatus.Active,
        // },
        order: {
          createdAt: Ordering.Desc,
        },
      },
      fetchPolicy: 'network-only',
    },
  );

  const selectData = responseApplicationsList
    ?.result
    ?.list
    ?.map(
      ({ ID, title }) => ({ name: `[${ID}]: ${title}`, value: ID }),
    ) ?? [];

  return (
    <Multiselect loading={isListApplicationsLoading} data={selectData} {...props} />
  );
}

export default ApplicationsSelect;
