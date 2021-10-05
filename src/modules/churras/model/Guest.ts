import { ChurrasAccessType } from "../enum/AcessType";
import { ChurrasInvitationStatus } from "../enum/InvitationStatus";

export interface ChurrasGuest {
  id: string;
  name: string;
  status: ChurrasInvitationStatus
  contribution?: ChurrasContribution
}

export interface ChurrasContribution {
  type: ChurrasAccessType
  value: number;
}