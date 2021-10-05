import { UserGroupIcon } from "@heroicons/react/solid";
import { useMemo } from 'react';
import { format } from "date-fns";
import { motion } from "framer-motion";
import useAmmountCollected from "../../hooks/useAmountCollected";
import ChurrasGuestList from "../ChurrasGuestList";
import { ChurrasDetailsCardProps } from "./interface";
import { ChurrasInvitationStatus } from "../../enum/InvitationStatus";

const ChurrasDetailsCard: React.FC<ChurrasDetailsCardProps> = ({ id, data, className = ''}) => {
  const { date, description, guests, name, suggestedValues } = data;
  const ammountCollected = useAmmountCollected(guests);

  const confirmedGuests = useMemo(() => {
    const confirmedGuests = guests.filter(guest => guest.contribution && guest.status === ChurrasInvitationStatus.ACCEPTED)
    return confirmedGuests.length;
  }, [guests])

  return (
    <div>
      <motion.div 
        layoutId={id}
        className={`shadow-md rounded-lg py-5 px-4 bg-white ${className}`}
        layout
      >
        <div className="flex flex-col sm:flex-row items-center gap-y-2 gap-x-6 justify-between mb-6">
        <h2 className="text-4xl text-gray-900 font-bold block">{name}</h2>
        <h3 className="text-gray-700 text-sm sm:text-base block">{format(date, 'dd/MM/yyyy')}</h3>
        </div>
        <p className="text-lg font-medium tracking-wide leading-7 mb-4">
          {description}
        </p>
        <ChurrasGuestList 
          churrasId={data.id}
          guests={guests}
          suggested={suggestedValues}
        />
        <div className="flex justify-between font-bold text-gray-700 mt-4 mr-4">
          <div className="flex gap-x-2 font-normal items-center">
            <UserGroupIcon width={20} height={20} className="text-yellow-400" />
            <span>{confirmedGuests}/{guests.length}</span>
          </div>
          Total: {ammountCollected}
        </div>
      </motion.div>
    </div>


  )
}

export default ChurrasDetailsCard;