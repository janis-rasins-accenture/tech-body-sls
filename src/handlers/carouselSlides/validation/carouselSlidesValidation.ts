import * as Yup from 'yup';
import { CarouselSlidesBaseIF } from '../../../types/carouselSlides';

const MIN_NAME_LETTERS_TITLE = 2;
const MAX_NAME_LETTERS_TITLE = 20;
const MIN_NAME_LETTERS_DESCRIPTION = 50;
const MAX_NAME_LETTERS_DESCRIPTION = 200;

export const carouselSlidesSchema: Yup.ObjectSchema<CarouselSlidesBaseIF> =
  Yup.object({
    title: Yup.string()
      .required('Title is required!')
      .min(
        MIN_NAME_LETTERS_TITLE,
        `Title must be at least ${MIN_NAME_LETTERS_TITLE} letters`
      )
      .max(
        MAX_NAME_LETTERS_TITLE,
        `Title must not exceed ${MAX_NAME_LETTERS_TITLE} letters`
      ),
    description: Yup.string()
      .required('Descritpion is required!')
      .min(
        MIN_NAME_LETTERS_DESCRIPTION,
        `Descritpion must be at least ${MIN_NAME_LETTERS_DESCRIPTION} letters`
      )
      .max(
        MAX_NAME_LETTERS_DESCRIPTION,
        `Descritpion must not exceed ${MAX_NAME_LETTERS_DESCRIPTION} letters`
      ),
    link: Yup.string().required('Link is required!'),
  });
