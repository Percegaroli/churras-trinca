import { AnimateSharedLayout } from "framer-motion";
import { useState } from "react";
import Overlay from "../../../../shared/components/atoms/Overlay";
import useDisableScroll from "../../../../shared/hooks/useDisableScroll";
import useUniqueId from "../../../../shared/hooks/useUniqueId";
import ChurrasDetailsCard from "../ChurrasDetailsCard";
import ChurrasGridCard from "../ChurrasGridCard";
import { ChurrasCardProps } from "./interface";

const ChurrasCard: React.FC<ChurrasCardProps> = ({data}) => {
  const [isDetailed, setIsDetailed] = useState(false);
  const layoutId = useUniqueId();
  useDisableScroll(isDetailed);
  return (
    <AnimateSharedLayout>
      <div>
      {isDetailed 
        ? ( 
          <>
            <Overlay onClick={() => setIsDetailed(false)}/>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 max-w-3xl w-full">
              <ChurrasDetailsCard id={layoutId} data={data} className="z-30"/> 
            </div>
          </>
        )
        : (
          <div onClick={() => setIsDetailed(!isDetailed)}>
            <ChurrasGridCard id={layoutId} data={data}/>
          </div>
        )
      }
      </div>
    </AnimateSharedLayout>
  )
}

export default ChurrasCard;