import { ChurrasAccessType } from "../../enum/AcessType";
import { PaymentBadgeProps } from "./interface";

const PaymentBadge: React.FC<PaymentBadgeProps> = ({
  paymentType,
  className
}) => {
  return (
    <div className={`${className} rounded-lg px-3 py-0.5 ${paymentType === ChurrasAccessType.OPEN_BAR ? 'bg-indigo-400' : 'bg-green-400'}`}>
      {paymentType === ChurrasAccessType.OPEN_BAR ? 'Open bar' : 'Normal'}
    </div>
  )
}

export default PaymentBadge;