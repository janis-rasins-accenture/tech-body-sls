import * as Yup from 'yup';
import { PostBaseIF } from '../../../types/posts';

const MIN_TITLE_LETTERS = 3;
const MAX_TITLE_LETTERS = 100;
const MIN_TEXT_LETTERS = 3;
const MAX_TEXT_LETTERS = 1000;

export const postUpdateSchema: Yup.ObjectSchema<PostBaseIF> = Yup.object({
  title: Yup.string()
    .required('Title is required!')
    .min(
      MIN_TITLE_LETTERS,
      `Title must be at least ${MIN_TITLE_LETTERS} letters`
    )
    .max(
      MAX_TITLE_LETTERS,
      `Title must not exceed ${MAX_TITLE_LETTERS} letters`
    ),
  text: Yup.string()
    .required('Text is required!')
    .min(MIN_TEXT_LETTERS, `Text must be at least ${MIN_TEXT_LETTERS} letters`)
    .max(MAX_TEXT_LETTERS, `Text must not exceed ${MAX_TEXT_LETTERS} letters`),
  imageUrl: Yup.string(),
});
