import Image from 'next/image';
import { WithoutGuestsFallbackProps } from './interface';

const WithoutGuestsFallback: React.FC<WithoutGuestsFallbackProps> = ({
  addGuest,
  className
}) => {
  return (
    <div className={`${className} flex flex-col items-center gap-y-3`}>
      <Image
        width={150}
        height={150}
        className="rounded-3xl"
        alt=""
        src="/group_people.jpg"
      />
      <p className="text-sm text-gray-600">
        Ainda não há convidados para esse churrasco!
        <span className="text-blue-400 hover:text-blue-600 cursor-pointer ml-1" onClick={addGuest}>Adicionar</span>
      </p>

    </div>
  )
}

export default WithoutGuestsFallback;