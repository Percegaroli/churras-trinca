import { useState, useEffect } from 'react';
import { Currency } from '../../../shared/services/Currency';
import { ChurrasGuest } from '../model/Guest';

const useAmmountCollected = (guests: Array<ChurrasGuest>): string => {
  const [ammountCollected, setAmmountCollected] = useState('0,00')
  
  useEffect(() => {
    console.log(guests)
    let total = 0;
    guests.forEach(guest => {
      if (guest.contribution){
        total = total + Currency.convertToCents(guest.contribution.value)
      }
    });
    setAmmountCollected(Currency.format(total));
  }, [guests]);

  return ammountCollected;
}

export default useAmmountCollected;