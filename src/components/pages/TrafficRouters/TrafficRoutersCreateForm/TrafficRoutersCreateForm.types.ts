import type { AnyIPv4IPv6, AnyOnlyExclude, AuctionType } from '@/generated/graphql';

export type TrafficRoutersCreateFormState = {
  auctionType: AuctionType;
  title?: string;
  description?: string;
  percent?: number;
  secure?: AnyOnlyExclude;
  adBlock?: AnyOnlyExclude;
  privateBrowsing?: AnyOnlyExclude;
  IP?: AnyIPv4IPv6;
  RTBSourceIDs: string[] | null;
  zones: string[] | null;
  applications?: string[] | null;
  formats?: string[] | null;
  deviceTypes?: string[] | null;
  devices?: string[] | null;
  OS?: string[] | null;
  browsers?: string[] | null;
  carriers?: string[] | null;
  countries?: string[] | null;
  languages?: string[] | null;
  result?: string;
};

export type TrafficRoutersCreateFormProps = {
  onCancel?: () => void;
  onSubmit?: () => void;
};
