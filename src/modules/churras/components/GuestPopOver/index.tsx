import { Popover, Disclosure, Switch } from '@headlessui/react';
import * as yup from 'yup';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import useChurrasContext from '../../hooks/useChurrasContext';
import { GuestPopoverProps } from './interface';
import { yupResolver } from '@hookform/resolvers/yup';
import FormController from '../../../../shared/components/molecules/FormController';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import PriceInput from '../../../../shared/components/molecules/PriceInput';
import ButtonBase from "../../../../shared/components/atoms/ButtonBase";
import { ChurrasAccessType } from '../../enum/AcessType';
import useToast from '../../../../shared/hooks/useToast';
import { ToastType } from '../../../../shared/components/molecules/Toast/interface';
import { Currency } from '../../../../shared/services/Currency';

interface Form {
  isOpenBar: boolean;
  value: string;
}

const schema = yup.object().shape({
  isOpenBar: yup.boolean().required(),
  value: yup.string().required('Campo obrigatório')
});

const GuestPopover: React.FC<GuestPopoverProps> = ({
  churrasId,
  suggested,
  guest,
  addNewGuest
}) => {
  const { removeGuest, changePayment } = useChurrasContext();
  const { addToast } = useToast();
  const methods = useForm<Form>({
    defaultValues: guest.contribution ? {
      isOpenBar: guest.contribution.type === ChurrasAccessType.OPEN_BAR,
      value: Currency.format(guest.contribution.value)
    } : {
      isOpenBar: false,
      value: ''
    },
    resolver: yupResolver<yup.AnyObjectSchema>(schema)
  })
  
  const isOpenBar = useWatch({
    name: 'isOpenBar', 
    control:methods.control
  })

  useEffect(() => {
    const finalValue = isOpenBar ? suggested.openBar : suggested.regular
    methods.setValue('value', Currency.format(finalValue));
  }, [isOpenBar, suggested])

  const onRemoveGuest = (cb: () => void) => {
    removeGuest(churrasId, guest.id);
    cb();
  }

  const onAddGuests = (cb: () => void) => {
    addNewGuest()
    cb();
  } 

  const onSubmit = async (data: Form) => {
    const response = await changePayment(churrasId, guest.id, {
      type: data.isOpenBar ? ChurrasAccessType.OPEN_BAR : ChurrasAccessType.REGULAR,
      value: Currency.convertToCents(data.value)
    });
    if(response){
      addToast({
        type: ToastType.SUCCESS,
        message: 'Guest updated'
      });
    }
  }

  return (
    <Popover className="relative">
      <Popover.Button className="shadow-sm rounded-full p-1 cursor-pointer hover:shadow-md">
        <DotsVerticalIcon className="text-blue-400" width={16} height={16}/>
      </Popover.Button>
      <Popover.Panel className="absolute top-8 right-0 shadow-lg rounded-md overflow-hidden bg-white w-48 z-10">
        {({close}) => (
          <>
            <Disclosure>
              {({open}) => (
                <>
                  <Disclosure.Button
                    className={`p-2 hover:bg-gray-50 hover:font-semibold text-sm cursor-pointer w-full flex justify-start ${open ? 'bg-gray-50 font-semibold' : 'bg-white'}`} 
                    onClick={() => close()}
                    >
                    Alterar pagamento
                  </Disclosure.Button>
                  <Disclosure.Panel className="p-2">
                    <div className="flex items-center gap-x-3 mb-2">
                      <p className={`text-sm ${!isOpenBar ? 'font-semibold' : 'font-normal'}`}>
                        Normal
                      </p>
                      <Controller
                        name="isOpenBar"
                        control={methods.control}
                        render={({field}) => (
                          <Switch 
                            checked={field.value} 
                            onChange={field.onChange}
                            className={`${isOpenBar ? 'justify-end' : 'justify-start'} bg-blue-900 inline-flex flex-shrink-0 h-[20px] w-[40px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                          >
                            <span
                              aria-hidden="true"
                              className={`
                                pointer-events-none inline-block h-[16] w-[16px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                            />
                          </Switch>
                        )}
                      />
                      <p className={`text-sm ${isOpenBar ? 'font-semibold' : 'font-normal'}`}>
                        Open Bar
                      </p>
                    </div>
                    <Controller
                      name="value"
                      control={methods.control}
                      render={({field, fieldState}) => (
                        <FormController
                          name="value"
                          value={field.value}
                          onChange={field.onChange}
                          label="Valor"
                          labelClassName="text-sm font-normal"
                          error={fieldState.error}
                          renderInput={({placeholder, value, onChange}) => (
                            <PriceInput
                              className="!py-1 !text-sm"
                              onChange={onChange}
                              value={value}
                              placeholder={placeholder}
                            />
                          )}
                        />
                      )}
                    />
                    <div className="flex justify-end mt-2">
                    <ButtonBase 
                      className="!py-2 !px-1.5 text-sm" 
                      onClick={methods.handleSubmit(onSubmit)}
                    >
                      Salvar
                    </ButtonBase>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
              
            </Disclosure>
            <div 
              className="p-2 bg-white hover:bg-gray-50 hover:font-semibold text-sm cursor-pointer" 
              onClick={() => onRemoveGuest(close)}
            >
              Remover
            </div>
            <div 
              className="p-2 bg-white hover:bg-gray-50 hover:font-semibold text-sm cursor-pointer" 
              onClick={() => onAddGuests(close)}
            >
              Adicionar convidados
            </div>
          </>
        )}
      </Popover.Panel>
    </Popover>
  )
}

export default GuestPopover;