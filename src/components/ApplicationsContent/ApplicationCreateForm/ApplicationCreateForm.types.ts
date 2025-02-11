import type { ApplicationType, PlatformType } from '@/generated/graphql';

export type ApplicationCreateFormProps = {
  onCancel?: () => void;
};

export type ApplicationCreateFormState = {
  title: string;
  description: string;
  URI: string;
  type: ApplicationType;
  platform: PlatformType;
  categories: number[];
};
