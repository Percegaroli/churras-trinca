import * as yup from 'yup';

export const GuestSchema = yup.object().shape({
  guests: yup.array().of(yup.object().shape({
    name: yup.string().required('Campo obrigatório').max(14, 'Máximo 14 caracteres')
  }))
})