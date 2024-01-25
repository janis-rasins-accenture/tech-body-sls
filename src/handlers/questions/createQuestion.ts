import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { ValidationError } from 'yup';
import { putItem } from '../../aws/dynamodb/putItem';
import { returnData } from '../../utils/returnData';
import { InputQuestionCreateIF } from '../../types/questions';
import { questionCreateSchema } from './validation/questionsValidation';

export const handler = async (event: APIGatewayEvent) => {
  const { TABLE_NAME_QUESTIONS } = process.env;
  if (!TABLE_NAME_QUESTIONS) {
    return returnData(400, 'Table name is not defined!');
  }
  if (!event.body) {
    return returnData(400, 'No body!');
  }
  const question: InputQuestionCreateIF = JSON.parse(event.body);
  try {
    await questionCreateSchema.validate(question);
  } catch (error) {
    if (error instanceof ValidationError) {
      return returnData(400, error.message);
    }
    return returnData(400, 'Something goes wrong', { error });
  }
  const uuid = uuidv4();
  const params: PutCommandInput = {
    TableName: TABLE_NAME_QUESTIONS,
    Item: {
      questionId: uuid,
      question: question.question,
      isActive: 1,
      answer: question.answer,
    },
  };
  const result = await putItem(params);
  return returnData(200, 'Success!', result);
};
