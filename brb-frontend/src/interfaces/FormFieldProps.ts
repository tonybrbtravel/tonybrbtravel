export interface BrbFormFieldProps {
  isMandatory?: boolean;
  placeholder?: string;
  label?: string;
  name?: string;
  disabled?: boolean;
  isError?: boolean;
  onChange?: (value: any) => void;
}
