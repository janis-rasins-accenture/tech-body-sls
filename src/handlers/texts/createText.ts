import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { ValidationError } from 'yup';
import { putItem } from '../../aws/dynamodb/putItem';
import { returnData } from '../../utils/returnData';
import { InputTextCreateIF } from '../../types/texts';
import { textCreateSchema } from './validation/textsValidation';

export const handler = async (event: APIGatewayEvent) => {
  const { TABLE_NAME_TEXTS } = process.env;
  if (!TABLE_NAME_TEXTS) {
    return returnData(400, 'Table name is not defined!');
  }
  if (!event.body) {
    return returnData(400, 'No body!');
  }
  const text: InputTextCreateIF = JSON.parse(event.body);
  try {
    await textCreateSchema.validate(text);
  } catch (error) {
    if (error instanceof ValidationError) {
      return returnData(400, error.message);
    }
    return returnData(400, 'Something goes wrong', { error });
  }
  const uuid = uuidv4();
  const params: PutCommandInput = {
    TableName: TABLE_NAME_TEXTS,
    Item: {
      textId: uuid,
      title: text.title,
      isActive: 1,
      text: text.text,
    },
  };
  const result = await putItem(params);
  if (result.success) {
    console.log(`Text with Id ${uuid} created!`);
    return returnData(200, 'Success!', { textId: uuid });
  }
  return returnData(400, result.error);
};
