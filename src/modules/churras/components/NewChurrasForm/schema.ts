import { startOfDay } from 'date-fns';
import * as yup from 'yup';

export const NewChurrasSchema = yup.object().shape({
  name: yup
    .string()
    .max(30, 'Máximo 30 caracteres')
    .required('Campo obrigatório'),
  description: yup.string().default('').required('Campo obrigatório'),
  date: yup
    .date()
    .required()
    .min(startOfDay(new Date()), 'Data não pode ser retroativa'),
  suggestedValue: yup.string().required('Campo obrigatório'),
  suggestedValueOpenbar: yup.string().required('Campo obrigatório'),
  guests: yup.array().of(yup.object().shape({
    name: yup
      .string()
      .max(14, 'Máximo 14 caracteres')
      .required('Nome do convidado obrigatório'),
  })).required()
})