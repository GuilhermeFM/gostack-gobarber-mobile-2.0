import * as Yup from 'yup';

import getValidationErros, { Erros } from '../getValidationErrors';

const validate = async (data: object): Promise<Erros | undefined> => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome Obrigatório.'),
      email: Yup.string()
        .required('E-mail é obrigatório.')
        .email('Digite um email válido.'),
      password: Yup.string().min(6, 'No mínimo 6 caracteres.'),
    });

    await schema.validate(data, { abortEarly: false });
    return undefined;
  } catch (err) {
    return getValidationErros(err);
  }
};

export default validate;
