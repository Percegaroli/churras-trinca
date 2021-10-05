import Input from "../../atoms/Input";
import { FormControllerProps } from "./interface";

const FormController: React.FC<FormControllerProps> = (props) =>{
  const {renderInput, ...rest} = props;
  const {
    label, 
    name, 
    onChange, 
    value, 
    error, 
    className = '',
    placeholder= '',
    labelClassName = ''
  } = rest;

  const internalRenderInput = () => {
    if (renderInput) return renderInput({...rest})
    return (
      <Input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    )
  }

  return (
    <div className={`${className} w-full flex flex-col`}>
      <label className={`${labelClassName} font-semibold mb-1`} htmlFor={name}>
        {label}
      </label>
      {internalRenderInput()}
      <h5 className="text-red-600 text-xs">{error?.message}</h5>
    </div>
  )
}

export default FormController;