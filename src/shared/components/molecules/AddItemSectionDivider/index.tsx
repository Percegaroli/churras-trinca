import AddItemButton from "../AddItemButton"
import { AddItemSectionDividerProps } from "./interface"

const AddItemSectionDivider: React.FC<AddItemSectionDividerProps> = ({action}) => {
  return (
    <div className="flex items-center gap-x-4 w-full">
      <div className="border-solid border-b border-gray-200 w-full" />
        <AddItemButton onClick={action}/>
      <div className="border-b border-gray-200 w-full" />
    </div>
  )  
}

export default AddItemSectionDivider;