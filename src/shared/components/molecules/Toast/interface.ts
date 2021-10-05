export enum ToastType {
  SUCCESS,
  ERROR
}

export interface ToastProps {
  type: ToastType
  message: string;
  offsetY: number;
}