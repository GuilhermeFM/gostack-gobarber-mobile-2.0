import { ValidationError } from 'yup';

export interface Erros {
  [key: string]: string;
}

const getValidationErros = (validationError: ValidationError): Erros => {
  const errors: Erros = {};

  validationError.inner.forEach((error) => {
    errors[error.path] = error.message;
  });

  return errors;
};

export default getValidationErros;
