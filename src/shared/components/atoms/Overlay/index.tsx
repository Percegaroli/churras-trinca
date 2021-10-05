import { motion } from "framer-motion";
import { OverlayProps } from "./interface";

const Overlay: React.FC<OverlayProps> = ({onClick}) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.2}}
      className="cursor-pointer w-full h-full bg-black/70 fixed left-0 top-0 z-20"
    />
  )
}

export default Overlay;