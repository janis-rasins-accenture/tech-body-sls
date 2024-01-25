import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { ValidationError } from 'yup';
import { putItem } from '../../aws/dynamodb/putItem';
import { returnData } from '../../utils/returnData';
import { InputCarouselSlidesCreateIF } from '../../types/carouselSlides';
import { carouselSlidesSchema } from './validation/carouselSlidesValidation';

export const handler = async (event: APIGatewayEvent) => {
  const { TABLE_NAME_SLIDES } = process.env;
  if (!TABLE_NAME_SLIDES) {
    return returnData(400, 'Table name is not defined!');
  }
  if (!event.body) {
    return returnData(400, 'No body!');
  }
  const carouselSlides: InputCarouselSlidesCreateIF = JSON.parse(event.body);
  try {
    await carouselSlidesSchema.validate(carouselSlides);
  } catch (error) {
    if (error instanceof ValidationError) {
      return returnData(400, error.message);
    }
    return returnData(400, 'Something goes wrong', { error });
  }
  const uuid = uuidv4();
  const params: PutCommandInput = {
    TableName: TABLE_NAME_SLIDES,
    Item: {
      carouselSlidesId: uuid,
      title: carouselSlides.title,
      isActive: 1,
      descritpion: carouselSlides.description,
      link: carouselSlides.link,
    },
  };
  const result = await putItem(params);
  return returnData(200, 'Posts list', result);
};
