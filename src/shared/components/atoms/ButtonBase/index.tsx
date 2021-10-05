import { ButtonBaseProps, ButtonVariant } from "./interface";

const variantStyles = new Map<ButtonVariant, string>([
  [ButtonVariant.PRIMARY, 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm'],
  [ButtonVariant.SECONDARY, 'bg-red-400 hover:bg-red-500 active:bg-red-600 text-white']
])

const ButtonBase: React.FC<ButtonBaseProps> = ({
  children, 
  variant = ButtonVariant.PRIMARY, 
  disabled, 
  onClick,
  className = ''
}) => {
  return (
    <button
      type="button"
      className={`${variantStyles.get(variant)} px-3 py-2 font-semibold rounded-md text-base leading-5 ${className}`} 
      disabled={disabled} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonBase;