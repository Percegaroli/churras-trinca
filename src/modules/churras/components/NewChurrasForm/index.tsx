import { DatePicker } from "@material-ui/pickers";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FieldError, useFieldArray, useForm } from "react-hook-form";
import DatePickerProvider from "../../../../shared/components/atoms/DatePickerProvider";
import FormController from "../../../../shared/components/molecules/FormController";
import ButtonBase from '../../../../shared/components/atoms/ButtonBase'
import * as yup from 'yup';
import { NewChurrasFormProps, NewChurrasFormSchema } from "./types";
import PriceInput from "../../../../shared/components/molecules/PriceInput";
import WithFallback from "../../../../shared/components/atoms/WithFallback";
import WithoutGuestsFallback from "../WithoutGuestsFallback";
import { NewChurrasSchema } from "./schema";
import useChurrasContext from "../../hooks/useChurrasContext";
import useToast from "../../../../shared/hooks/useToast";
import { ToastType } from "../../../../shared/components/molecules/Toast/interface";
import AddItemSectionDivider from "../../../../shared/components/molecules/AddItemSectionDivider";

const NewChurrasForm: React.FC<NewChurrasFormProps> = ({
  close
}) => {
  const methods = useForm<NewChurrasFormSchema>({
    defaultValues: {
      name: '',
      date: new Date(),
      description: '',
      suggestedValue: '',
      suggestedValueOpenbar: '',
      guests: [],
    },
    resolver: yupResolver<yup.AnyObjectSchema>(NewChurrasSchema),
    mode: "onBlur"
  });
  const { create } = useChurrasContext();
  const { addToast } = useToast();

  const { fields, append } = useFieldArray({
    name: 'guests',
    control: methods.control
  })

  const addEmptyGuest = () => {
    append({name: ''})
  }

  const onSubmit = async (data: NewChurrasFormSchema) => {
    const response = await create(data);
    if (response){
      addToast({
        type: ToastType.SUCCESS,
        message: 'Churras criado com sucesso!'
      });
      close()
    }
    else {
      addToast({
        type: ToastType.ERROR,
        message: 'Erro ao criar churras, por favor tente novamente.'
      })
    }
  }

  const renderRegularInput = (name: keyof NewChurrasFormSchema, label: string, placeholder = '') => (
    <Controller
      name={name}
      control={methods.control}
      render={({field, fieldState}) => (
        <FormController
          value={field.value as string}
          onChange={field.onChange}
          name={name}
          label={label}
          error={fieldState.error as FieldError | undefined}
        />
      )}
    />
  )
  
  const renderPriceInput = (name: keyof NewChurrasFormSchema, label: string) => {
    return (
      <Controller
        name={name}
        control={methods.control}
        render={({field, fieldState}) => (
          <FormController
            value={field.value as string}
            onChange={field.onChange}
            name={name}
            label={label}
            error={fieldState.error as FieldError | undefined}
            renderInput={({value, onChange}) => (
              <PriceInput
                value={value}
                onChange={onChange}
              />
            )}
          />
        )}
      />
    )
  }

  return (
    <form className="max-w-none w-full flex flex-col gap-y-3 max-h-[500px] overflow-y-scroll scrollbar-hide">
      <h2 className="font-semibold text-xl mb-5 text-center">Novo churras</h2>
      {renderRegularInput('name', 'Nome')}
      {renderRegularInput('description', 'Descrição')}
      <DatePickerProvider>
        <Controller
          name="date"
          control={methods.control}
          render={({field, fieldState}) => (
            <div className="flex flex-col gap-y-1">
              <span className="font-semibold">Data</span>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                className="!p-2 !text-lg !leading-6 no-underline !text-gray-800 !bg-white !outline-none !focus:outline-indigo-800 !border !border-solid !border-gray-200 !focus:border-blue-200 !rounded-md"
              />
              <h5 className="text-red-600 text-sm">{fieldState.error?.message}</h5>
            </div>
          )}
        />
      </DatePickerProvider>
      <h2 className="text-lg font-bold">Valores sugeridos</h2>
      <div className="flex flex-col sm:flex-row gap-2">
        {renderPriceInput('suggestedValue', 'Normal')}
        {renderPriceInput('suggestedValueOpenbar', 'Open bar')}
      </div>
      <div className="border-b border-gray-200 mt-2 w-full"></div>
      <h2 className="text-lg font-bold">Convidados</h2>
      <WithFallback
        fallback={() => <WithoutGuestsFallback addGuest={addEmptyGuest}/>}
        shouldRenderFallback={!fields.length}
      >
        <>
          {fields.map(({id}, index) => (
            <Controller
              key={id}
              name={`guests.${index}.name`}
              control={methods.control}
              render={({field, fieldState}) => (
                <FormController
                  value={field.value}
                  onChange={field.onChange}
                  name={`guests.${index}.name`}
                  label=""
                  error={fieldState.error}
                  placeholder='Nome'
                />
              )}
            />
          ))}
          <AddItemSectionDivider action={addEmptyGuest}/>
        </>
      </WithFallback>

      <div className="flex justify-end mt-6">
        <ButtonBase
          onClick={methods.handleSubmit(onSubmit)}
        >
          Salvar
        </ButtonBase>
      </div>
    </form>
  )
}

export default NewChurrasForm;