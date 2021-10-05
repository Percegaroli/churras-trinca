import { motion } from "framer-motion";
import { ToastProps, ToastType } from "./interface";

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  offsetY
}) => {
  return (
    <motion.div
      className={`${type === ToastType.SUCCESS ? 'bg-green-400 text-white' : 'bg-red-500'} rounded-md shadow-sm py-2 px-4`}
      animate={{
        x: 0,
        y: offsetY
      }}
      initial={{
        y: 20
      }}
      transition={{
        type: 'spring',
        stiffness: 500
      }}
    >
      {message}
    </motion.div>
  )
}

export default Toast;