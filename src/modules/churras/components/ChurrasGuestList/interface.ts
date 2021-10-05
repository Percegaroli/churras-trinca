import { SuggestedChurrasContribution } from "../../model/Churras";
import { ChurrasGuest } from "../../model/Guest";

export interface ChurrasGuestListProps {
  guests: Array<ChurrasGuest>
  className?: string;
  churrasId: string;
  suggested: SuggestedChurrasContribution;
}