import type { AnyIPv4IPv6, AnyOnlyExclude, AuctionType, RtbRequestFormatType } from '@/generated/graphql';

export type RTBCreateFormProps = {
  onCancel?: () => void;
  onSubmit?: () => void;
};

export type RTBCreateFormState = {
  title: string;
  description?: string;
  protocol: string;
  auctionType: AuctionType;
  URL: string;
  method: string;
  requestType: RtbRequestFormatType;
  RPS: number;
  timeout: number;
  accuracy: number;
  priceCorrectionReduce: number;
  minBid: number;
  maxBid: number;
  formats?: string[] | null;
  deviceTypes?: string[] | null;
  devices?: string[] | null;
  OS?: string[] | null;
  browsers?: string[] | null;
  carriers?: string[] | null;
  countries?: string[] | null;
  secure?: AnyOnlyExclude;
  adBlock?: AnyOnlyExclude;
  privateBrowsing?: AnyOnlyExclude;
  IP?: AnyIPv4IPv6;
  result?: string;
};
