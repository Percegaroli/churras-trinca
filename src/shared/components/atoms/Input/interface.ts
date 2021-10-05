import { ChangeEvent } from "react";

export interface InputProps {
  className?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string;
}