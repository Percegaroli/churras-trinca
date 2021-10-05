import { NewChurrasFormSchema } from "../components/NewChurrasForm/types"
import { ChurrasModel } from "../model/Churras"
import { v4 } from 'uuid'
import { ChurrasInvitationStatus } from "../enum/InvitationStatus"
import { Currency } from "../../../shared/services/Currency"

const mapFormStateToChurrasState = ({
  date, 
  description, 
  guests, 
  name, 
  suggestedValue, 
  suggestedValueOpenbar
}: NewChurrasFormSchema): ChurrasModel => {
  return {
    id: v4(),
    date,
    description,
    name,
    suggestedValues: {
      regular: Currency.convertToCents(suggestedValue),
      openBar: Currency.convertToCents(suggestedValueOpenbar)
    },
    guests: guests.map(guest => ({
      id: v4(),
      name: guest.name,
      status: ChurrasInvitationStatus.PENDING,
    }))
  }
}

export const ChurrasModelMapper = {
  mapFormStateToChurrasState
}