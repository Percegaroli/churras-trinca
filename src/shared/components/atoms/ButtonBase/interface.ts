export enum ButtonVariant {
  PRIMARY,
  SECONDARY
}

export interface ButtonBaseProps {
  variant?: ButtonVariant
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}