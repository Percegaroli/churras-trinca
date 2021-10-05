import { UserIcon, CurrencyDollarIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import useAmmountCollected from '../../hooks/useAmountCollected';
import { ChurrasGridCardProps } from './interface';

const ChurrasGridCard: React.FC<ChurrasGridCardProps> = ({id, data}) => {
  const { guests, name, date } = data;
  const ammountCollected = useAmmountCollected(guests);

  return (
    <motion.div 
      layoutId={id}
      className="shadow-md rounded-lg py-5 px-4 bg-white cursor-pointer"
      whileHover={{scale: 1.05}}
      exit={{opacity: 0}}
      layout
    >
      <h2 className="text-lg  text-gray-900 font-bold mb-1 sm:mb-2">{name}</h2>
      <h3 className="text-gray-700 text-sm mb-3">{format(date, 'dd/MM/yyyy')}</h3>
      <div className="flex flex-row sm:flex-col justify-between">
        <div className="flex items-center gap-x-2 mb-1">
          <UserIcon width={24} height={24} className="text-blue-300"/>
          <h4 className="">{guests.length}</h4>
        </div>
        <div className="flex items-center gap-x-2">
          <CurrencyDollarIcon width={24} height={24} className="text-blue-300"/>
          <h4 className="font-semibold">{ammountCollected}</h4>
        </div>
      </div>
    </motion.div>
  )
}

export default ChurrasGridCard;