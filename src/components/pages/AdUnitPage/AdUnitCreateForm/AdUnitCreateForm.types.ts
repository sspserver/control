export type AdUnitCreateFormProps = {
  onCancel?: () => void;
  onSubmit?: () => void;
};

export type AdUnitCreateFormState = {
  title: string;
  description?: string;
  codename?: string;
  minECPM?: number;
  fixedPurchasePrice?: number;
  result?: string;
};
