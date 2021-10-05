import { motion } from 'framer-motion';
import useDisableScroll from '../../../hooks/useDisableScroll';
import Overlay from '../Overlay';
import { ModalProps } from './interface';

const Modal: React.FC<ModalProps> = ({children, open, onClose, className = ''}) => {
  useDisableScroll(open)
  
  return open ? (
    <>
      <Overlay onClick={onClose}/>
      <div className={`fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 ${className}`}>
      <motion.div 
        className="bg-white p-4 rounded-md"
        animate={{
          y: 0
        }}
        transition={{
          type: 'spring',
          stiffness: 85
        }}
        initial={{
          y: -500
        }}
        style={{transform: 'translate'}}
      >
        {children}
      </motion.div>
      </div>
    </>
  ) : null
}

export default Modal;