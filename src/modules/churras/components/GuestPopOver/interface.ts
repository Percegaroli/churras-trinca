import { SuggestedChurrasContribution } from "../../model/Churras";
import { ChurrasGuest } from "../../model/Guest";

export interface GuestPopoverProps {
  churrasId: string;
  suggested: SuggestedChurrasContribution,
  addNewGuest: () => void
  guest: ChurrasGuest;
}