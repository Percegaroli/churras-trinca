import { useContext } from "react";
import { ToastContext } from "../providers/Toast";

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context.addToast) throw new Error ('useToast should be used as a child of ToastContext.Provider');
  return context;
}

export default useToast;