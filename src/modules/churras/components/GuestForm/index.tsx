import * as yup from 'yup';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import FormController from "../../../../shared/components/molecules/FormController";
import ButtonBase from "../../../../shared/components/atoms/ButtonBase";
import useChurrasContext from "../../hooks/useChurrasContext";
import useToast from "../../../../shared/hooks/useToast";
import { ToastType } from "../../../../shared/components/molecules/Toast/interface";
import { GuestFormProps } from './interface';
import AddItemButton from '../../../../shared/components/molecules/AddItemButton';
import { XIcon } from '@heroicons/react/solid';
import { ButtonVariant } from '../../../../shared/components/atoms/ButtonBase/interface';

interface Form {
  guests: Array<{
    name: string
  }>
}

const schema = yup.object().shape({
  guests: yup.array().of(yup.object().shape({
    name: yup.string().required('Campo obrigatório').max(14, 'Máximo 14 caracteres')
  }))
});

const GuestForm: React.FC<GuestFormProps> = ({
  onFinish,
  onCancel,
  churrasId
}) => {
  const methods = useForm<Form>({
    defaultValues: {
      guests: [{
        name: ''
      }]
    },
    mode: 'onBlur',
    resolver: yupResolver<yup.AnyObjectSchema>(schema)
  })
  const { fields, append, remove } = useFieldArray({
    name: 'guests',
    control: methods.control
  })
  const { addGuests } = useChurrasContext();
  const { addToast } = useToast();

  const addNewGuest = () => append({name: ''})

  const onUpdateGuest = async (data: Form) => {
    const response = await addGuests(churrasId, data.guests);
    if (response){
      addToast({
        type: ToastType.SUCCESS,
        message: 'Guests updated'
      });
      onFinish();
    }
    else {
      addToast({
        type: ToastType.ERROR,
        message: 'There was an error updating guests. Please try again'
      })
    }
  }

  return (
    <>
      <ul className="flex flex-col gap-y-2">
        {fields.map((field, index) => (
          <li key={field.id} className="flex items-center gap-x-2">
            <Controller
              key={field.id}
              name={`guests.${index}.name`}
              control={methods.control}
              render={({field, fieldState}) => (
                <FormController
                  name={`guests.${index}.name`}
                  error={fieldState.error}
                  label=''
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={'Nome do convidado'}
                />
              )}
            />
            { index !== fields.length - 1 ?  (
              <ButtonBase 
                variant={ButtonVariant.SECONDARY} 
                className="!p-1 rounded-full"
                onClick={() => remove(index)}
              >
                <XIcon width={16} height={16} className="text-white"/>
              </ButtonBase>
            ) : (
              <AddItemButton onClick={addNewGuest} iconHeight={16} iconWidth={16} buttonClassName="!p-1"/>
            )}
          </li>
        ))}
      </ul>
      
      <div className="flex justify-end mt-6 gap-x-4">
        <ButtonBase variant={ButtonVariant.SECONDARY} onClick={onCancel}>
          Cancelar
        </ButtonBase>
        <ButtonBase onClick={methods.handleSubmit(onUpdateGuest)}>
          Salvar
        </ButtonBase>
      </div>
    </>
  )
}

export default GuestForm;