import { createContext, useState, useMemo } from "react";
import { v4 } from "uuid";
import { Currency } from "../../../shared/services/Currency";
import { NewChurrasFormSchema } from "../components/NewChurrasForm/types";
import { ChurrasInvitationStatus } from "../enum/InvitationStatus";
import { ChurrasModel } from "../model/Churras";
import { ChurrasContribution, ChurrasGuest } from "../model/Guest";
import { ChurrasModelMapper } from "../services/ChurrasModelMapper";

interface IChurrasContext {
  churras: Array<ChurrasModel>
  create: (churras: NewChurrasFormSchema) => Promise<boolean>
  update: (churras: ChurrasModel) => Promise<boolean>
  removeGuest: (churrasId: string, guestId: string) => Promise<boolean>
  addGuests: (churrasId: string, guests: Array<{name: string}>) => Promise<boolean>;
  changePayment: (churrasId: string, guestId: string, payment: ChurrasContribution) => Promise<boolean>
  updateGuests: (guests: Array<ChurrasGuest | {name: string}>, churrasId: string) => Promise<boolean>
}

export const ChurrasContext = createContext({} as IChurrasContext)

const ChurrasProvider: React.FC = ({children}) => {
  const [churras, setChurras] = useState<Array<ChurrasModel>>([]);

  const createChurras = (newChurras: NewChurrasFormSchema) => {
    const newChurrasModel = ChurrasModelMapper.mapFormStateToChurrasState(newChurras);
    setChurras([
      ...churras,
      newChurrasModel
    ])
    return Promise.resolve(true)
  }

  const updateChurras = (editingChurras: ChurrasModel) => {
    const { id } = editingChurras;
    const index = churras.findIndex(item => item.id === id);
    if (index !== -1){
      const churrasCopy = [...churras];
      churrasCopy[index] = editingChurras;
      setChurras(churrasCopy);
      return Promise.resolve(true);
    }
    return Promise.resolve(false)
  }

  const updateGuests = (guests: Array<ChurrasGuest | {name: string}>, churrasId: string) => {
    const index = churras.findIndex(item => item.id === churrasId);
    if (index !== -1){
      const churrasCopy = [...churras];
      const editingChurrasCopy = {...churrasCopy[index]};
      const guestsFormatted: Array<ChurrasGuest> = guests.map(guest => {
        if (Object.getOwnPropertyNames(guest).includes('id')) return guest as ChurrasGuest;
        return {
          id: v4(),
          name: guest.name,
          status: ChurrasInvitationStatus.PENDING
        }
      });
      editingChurrasCopy.guests = guestsFormatted;
      churrasCopy[index] = editingChurrasCopy;
      setChurras(churrasCopy);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  const addGuests = (churrasId: string, guests: Array<{name: string}>) => {
    const churrasCopy = [...churras]
    const index = churrasCopy.findIndex(item => item.id === churrasId);
    if (index !== -1){
      const itemCopy = {...churras[index]};
      const newGuests: Array<ChurrasGuest> = guests.map(({name}) => ({
        id: v4(),
        name,
        status: ChurrasInvitationStatus.PENDING,
      }))
      itemCopy.guests = newGuests.concat(itemCopy.guests)
      churrasCopy[index] = itemCopy;
      setChurras(churrasCopy);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  const removeGuest = (churrasId: string, guestId: string) => {
    const editingChurrasIndex = churras.findIndex(item => item.id === churrasId);
    if (editingChurrasIndex !== -1){
      const churrasCopy = [...churras];
      const itemCopy = {...churrasCopy[editingChurrasIndex]};
      itemCopy.guests = itemCopy.guests.filter(guest => guest.id !== guestId);
      churrasCopy[editingChurrasIndex] = itemCopy;
      setChurras(churrasCopy)
      return Promise.resolve(true);
    }
    return Promise.resolve(false)
  }

  const changePayment = (churrasId: string, guestId: string, payment: ChurrasContribution) => {
    const churrasCopy = [...churras];
    const index = churrasCopy.findIndex(item => item.id === churrasId);
    if (index !== -1){
      const guestsCopy = [...churrasCopy[index].guests];
      const guestIndex = guestsCopy.findIndex(guest => guest.id === guestId);
      if (guestIndex !== -1){
        const guestCopy = {...guestsCopy[guestIndex], contribution: {
          ...payment,
          value: Currency.convertToCents(payment.value)
        }}
        guestsCopy[guestIndex] = guestCopy;
        guestsCopy[guestIndex].status = ChurrasInvitationStatus.ACCEPTED;
        churrasCopy[index].guests = guestsCopy;
        setChurras(churrasCopy);
        return Promise.resolve(true)
      }
    }
    return Promise.resolve(false)
  }

  const value: IChurrasContext = useMemo(() => ({
    churras,
    create: createChurras,
    update: updateChurras,
    removeGuest,
    changePayment,
    updateGuests,
    addGuests
  }), [churras])

  return (
    <ChurrasContext.Provider value={value}>
      {children}
    </ChurrasContext.Provider>
  )
}

export default ChurrasProvider;