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
  zoneIDs: string[] | null;
  applicationIDs?: string[] | null;
  formatCodes?: string[] | null;
  deviceTypeIDs?: string[] | null;
  deviceIDs?: string[] | null;
  OSIDs?: string[] | null;
  browserIDs?: string[] | null;
  carrierIDs?: string[] | null;
  countryCodes?: string[] | null;
  languageCodes?: string[] | null;
  result?: string;
};

export type TrafficRoutersCreateFormProps = {
  onCancel?: () => void;
  onSubmit?: () => void;
};
