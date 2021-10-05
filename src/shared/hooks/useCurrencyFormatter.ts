import { useMemo } from "react";
import { Currency } from "../services/Currency";

const useFormattedPrice = (value: string | number): string => {
  return useMemo(() => Currency.formatTrailing(value), [value])
}

export default useFormattedPrice;