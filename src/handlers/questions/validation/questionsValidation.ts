import * as Yup from 'yup';
import { InputQuestionCreateIF } from '../../../types/questions';

const MIN_NAME_LETTERS_TITLE = 2;
const MAX_NAME_LETTERS_TITLE = 50;
const MIN_NAME_LETTERS_TEXT = 2;
const MAX_NAME_LETTERS_TEXT = 200;

export const questionCreateSchema: Yup.ObjectSchema<InputQuestionCreateIF> =
  Yup.object({
    question: Yup.string()
      .required('First name is required!')
      .min(
        MIN_NAME_LETTERS_TITLE,
        `Name must be at least ${MIN_NAME_LETTERS_TITLE} letters`
      )
      .max(
        MAX_NAME_LETTERS_TITLE,
        `Name must not exceed ${MAX_NAME_LETTERS_TITLE} letters`
      ),
    answer: Yup.string()
      .required('Surname is required!')
      .min(
        MIN_NAME_LETTERS_TEXT,
        `Surname must be at least ${MIN_NAME_LETTERS_TEXT} letters`
      )
      .max(
        MAX_NAME_LETTERS_TEXT,
        `Surname must not exceed ${MAX_NAME_LETTERS_TEXT} letters`
      ),
  });
