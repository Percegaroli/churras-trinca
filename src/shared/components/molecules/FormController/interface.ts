import { ChangeEvent } from "react";
import { FieldError } from "react-hook-form";

export interface FormControllerProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: FieldError
  className?: string;
  renderInput?: (props: Omit<FormControllerProps, 'renderInput'>) => JSX.Element
  placeholder?: string;
  labelClassName?: string;
}