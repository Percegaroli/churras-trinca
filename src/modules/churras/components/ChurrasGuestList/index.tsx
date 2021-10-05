import { CheckCircleIcon, CurrencyDollarIcon, MinusCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { useState } from 'react';
import Image from 'next/image';
import WithFallback from "../../../../shared/components/atoms/WithFallback";
import { ChurrasInvitationStatus } from "../../enum/InvitationStatus";
import GuestForm from "../GuestForm";
import WithoutGuestsFallback from "../WithoutGuestsFallback";
import { ChurrasGuestListProps } from "./interface";
import GuestPopover from "../GuestPopOver";
import { ChurrasAccessType } from "../../enum/AcessType";
import { Currency } from "../../../../shared/services/Currency";

const ChurrasGuestList: React.FC<ChurrasGuestListProps> = ({
  guests, 
  className = '', 
  churrasId,
  suggested
}) => {
  const [isAddingGuests, setIsAddingGuests] = useState(false);

  const renderStatusIcon = (status: ChurrasInvitationStatus) => {
    const iconDimension = 14
    if (status === ChurrasInvitationStatus.ACCEPTED){
      return <CheckCircleIcon 
        className="text-green-500" 
        width={iconDimension} 
        height={iconDimension}
      />
    }
    if (status === ChurrasInvitationStatus.PENDING){
      return <MinusCircleIcon 
        className="text-yellow-500" 
        width={iconDimension} 
        height={iconDimension}
      />
    }
    return <XCircleIcon 
      className="text-red-700" 
      width={iconDimension}
      height={iconDimension}
    />
  }

  return (
      <WithFallback
        fallback={() => <WithoutGuestsFallback addGuest={() => setIsAddingGuests(true)}/>}
        shouldRenderFallback={!guests.length && !isAddingGuests }
      >
        <div className="max-h-96 scrollbar-hide">
          <ul className={`${className} flex flex-col divide-y divide-gray-100`}>
            {guests.map(({id, name, status, contribution}) => (
              <li 
                className="py-3 flex items-center justify-between p-2 rounded-md"
                key={id}
              >
                <div className="flex items-center gap-x-2">
                  {renderStatusIcon(status)}
                  <h3 className="font-semibold text-base text-gray-800">{name}</h3>
                  {contribution && contribution.type === ChurrasAccessType.OPEN_BAR ? (
                    <div className={`${className} flex items-center gap-x-1 rounded-lg p-1.5 bg-indigo-100 ml-1`}>
                      <Image
                        src="/beer-mug.png"
                        width={14}
                        height={14}
                        alt=""
                      />
                      <span className="text-xs font-bold hidden sm:block">
                        Open bar
                      </span>
                    </div>
                  ) : null}
                </div>
        
                <div className="flex items-center gap-x-1">
                  <CurrencyDollarIcon 
                    width={16} 
                    height={16} 
                    className="text-green-400"
                  />
                  <span className="mr-1">
                    {contribution 
                      ? (
                        <span className="font-semibold">
                          {Currency.format(contribution.value)} 
                        </span>
                      )
                      : (
                        <span className="text-gray-400">
                          {Currency.format(suggested.regular)}
                        </span>
                      )
                    }
                  </span>
                  <GuestPopover
                    churrasId={churrasId}
                    guest={{
                      id,
                      name,
                      status,
                      contribution
                    }}
                    suggested={suggested}
                    addNewGuest={() => setIsAddingGuests(true)}
                  />
                </div>
              </li>
            ))}
          </ul>
          <WithFallback
            fallback={() => null}
            shouldRenderFallback={!isAddingGuests}
          >
            <GuestForm 
              churrasId={churrasId}
              onCancel={() => setIsAddingGuests(false)}
              onFinish={() => setIsAddingGuests(false)}
            />
          </WithFallback>
        </div>
      </WithFallback>
  )
}

export default ChurrasGuestList;