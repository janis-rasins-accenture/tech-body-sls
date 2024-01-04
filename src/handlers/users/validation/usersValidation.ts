import * as Yup from 'yup';
import { InputUserCreateIF, InputUserUpdateIF } from '../../../types/users';

const MIN_NAME_LETTERS = 2;
const MAX_NAME_LETTERS = 20;

export const userCreateSchema: Yup.ObjectSchema<InputUserCreateIF> = Yup.object(
  {
    firstName: Yup.string()
      .required('First name is required!')
      .min(
        MIN_NAME_LETTERS,
        `Name must be at least ${MIN_NAME_LETTERS} letters`
      )
      .max(
        MAX_NAME_LETTERS,
        `Name must not exceed ${MAX_NAME_LETTERS} letters`
      ),
    lastName: Yup.string()
      .required('Surname is required!')
      .min(
        MIN_NAME_LETTERS,
        `Surname must be at least ${MIN_NAME_LETTERS} letters`
      )
      .max(
        MAX_NAME_LETTERS,
        `Surname must not exceed ${MAX_NAME_LETTERS} letters`
      ),
    email: Yup.string()
      .required('Email is required')
      .email('Please input valid email'),
    avatarUrl: Yup.string(),
    userName: Yup.string()
      .required('Username is required!')
      .min(
        MIN_NAME_LETTERS,
        `Username must be at least ${MIN_NAME_LETTERS} letters`
      )
      .max(
        MAX_NAME_LETTERS,
        `Username must not exceed ${MAX_NAME_LETTERS} letters`
      ),
    password: Yup.string().required('Password is required!'),
  }
);

export const userUpdateSchema: Yup.ObjectSchema<InputUserUpdateIF> = Yup.object(
  {
    userId: Yup.string(),
    firstName: Yup.string()
      .min(
        MIN_NAME_LETTERS,
        `Name must be at least ${MIN_NAME_LETTERS} letters`
      )
      .max(
        MAX_NAME_LETTERS,
        `Name must not exceed ${MAX_NAME_LETTERS} letters`
      ),
    lastName: Yup.string()
      .min(
        MIN_NAME_LETTERS,
        `Surname must be at least ${MIN_NAME_LETTERS} letters`
      )
      .max(
        MAX_NAME_LETTERS,
        `Surname must not exceed ${MAX_NAME_LETTERS} letters`
      ),
    email: Yup.string().email('Please input valid email'),
    avatarUrl: Yup.string(),
    userName: Yup.string()
      .min(
        MIN_NAME_LETTERS,
        `Username must be at least ${MIN_NAME_LETTERS} letters`
      )
      .max(
        MAX_NAME_LETTERS,
        `Username must not exceed ${MAX_NAME_LETTERS} letters`
      ),
    password: Yup.string(),
  }
);
