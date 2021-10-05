import { createContext, useState, useEffect } from "react";
import { v4 } from "uuid";
import Toast from "../../components/molecules/Toast";
import { ToastType } from "../../components/molecules/Toast/interface";

interface IToastContext {
  addToast: (config: Omit<ToastConfig, 'id'>) => void
}

interface ToastConfig {
  id: string;
  type: ToastType,
  message: string;
  duration?: number;
}

export const ToastContext = createContext({} as IToastContext);

const ToastProvider: React.FC = ({children}) => {
  const [toasts, setToasts] = useState<Array<ToastConfig>>([]);
  const [removeId, setRemoveId] = useState('');

  useEffect(() => {
    if (removeId){
      setToasts(toasts.filter(toast => toast.id !== removeId));
    }
  }, [removeId])

  const addToast = (config: Omit<ToastConfig, 'id'>) => {
    const id = v4()
    setToasts([
      ...toasts,
      {
        id,
        ...config
      }
    ])
    setTimeout(() => {
      setRemoveId(id);
    }, config.duration ?? 3000)
  }

  return (
    <ToastContext.Provider value={{addToast}}>
      <div className="fixed bottom-6 right-6 flex flex-col gap-y-2 z-50">
        {toasts.map(({message, type, id}, index) => (
          <Toast
            key={id}
            message={message}
            type={type}
            offsetY={index}
          />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;