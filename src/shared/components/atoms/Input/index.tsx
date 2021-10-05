import { InputProps } from "./interface";

const Input: React.FC<InputProps> = ({ onChange, value, className, placeholder}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`${className} p-2 text-lg leading-6 text-gray-800 bg-white outline-none focus:outline-indigo-800 border border-solid border-gray-200 focus:border-blue-200 rounded-md`}
      placeholder={placeholder}
    />
  )
}

export default Input;