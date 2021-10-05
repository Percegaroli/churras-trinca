import { PlusIcon } from '@heroicons/react/solid';
import ButtonBase from '../../../../shared/components/atoms/ButtonBase';
import { AddItemButtonProps } from './interface';

const AddItemButton: React.FC<AddItemButtonProps> = ({
  buttonClassName = '!p-2',
  iconHeight = 24,
  iconClassName,
  iconWidth = 24,
  onClick
}) => {
  return (
    <ButtonBase 
      className={`${buttonClassName} !rounded-full`} 
      onClick={onClick}>
      <PlusIcon 
        width={iconWidth} 
        height={iconHeight} 
        className={`${iconClassName} text-white`}
      />
    </ButtonBase>
  )
}

export default AddItemButton;