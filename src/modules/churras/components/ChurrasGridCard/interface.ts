import { ChurrasModel } from "../../model/Churras";

export interface ChurrasGridCardProps {
  id: string;
  data: Pick<ChurrasModel, 'guests' | 'name' | 'date'>
}