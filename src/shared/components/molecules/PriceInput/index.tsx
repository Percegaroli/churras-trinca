import { ChangeEvent } from "react";
import useFormattedPrice from "../../../hooks/useCurrencyFormatter";
import Input from "../../atoms/Input";
import { InputProps } from "../../atoms/Input/interface";

const PriceInput: React.FC<InputProps> = ({value, onChange, ...rest}) => {
  const formattedPrice = useFormattedPrice(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/\D/g, '');
    if (onChange){
      return onChange(event);
    }
  }

  return (
    <Input
      {...rest}
      value={formattedPrice}
      onChange={handleChange}
    />
  )
}

export default PriceInput;