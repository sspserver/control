import type { ApplicationType, Maybe, PlatformType } from '@/generated/graphql';

export type ApplicationCreateFormProps = {
  onCancel?: () => void;
  onSubmit: () => void;
};

export type ApplicationCreateFormState = {
  title: string;
  description: string;
  URI: string;
  type: ApplicationType;
  platform: PlatformType;
  categories?: Maybe<number[]>;
  result?: string;
};
