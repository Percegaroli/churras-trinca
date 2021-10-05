import Image from 'next/image';
import WithFallback from "../../../../shared/components/atoms/WithFallback";
import useChurrasContext from "../../hooks/useChurrasContext";
import ChurrasCard from "../ChurrasCard";
import { ChurrasListProps } from "./interface";

const ChurrasList: React.FC<ChurrasListProps> = () => {
  const { churras } = useChurrasContext();

  const renderFallback = () => {
    return (
      <div className="flex flex-col justify-center items-center">
          <Image
            src="/barbecue.jpg"
            width={200}
            height={200}
            alt=""
            className="rounded-3xl"
          />
        <span className="mt-6 text-gray-400 text-base text-center">Ainda não foi cadastrado nenhum churrasco</span>
      </div>
    )
  }

  return (
    <WithFallback
      shouldRenderFallback={!churras.length}
      fallback={renderFallback}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
        {churras.map(item => (
          <ChurrasCard data={item} key={item.id}/>
        ))}
      </div>
    </WithFallback>
 
  )
}

export default ChurrasList;