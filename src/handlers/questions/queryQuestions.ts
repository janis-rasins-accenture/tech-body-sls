import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { queryItems } from '../../aws/dynamodb/queryItems';
import { returnData } from '../../utils/returnData';

export const handler = async () => {
  const { TABLE_NAME_QUESTIONS } = process.env;
  if (!TABLE_NAME_QUESTIONS) {
    const errMessage = 'No TABLE_NAME_QUESTIONS';
    console.log(errMessage);
    throw new Error(errMessage);
  }
  const params: QueryCommandInput = {
    IndexName: 'isActiveQuestionsIndex',
    KeyConditionExpression: 'isActive = :i',
    ExpressionAttributeValues: {
      ':i': 1,
    },
    TableName: TABLE_NAME_QUESTIONS,
    ScanIndexForward: true,
  };
  try {
    const data = await queryItems(params);
    return returnData(200, 'Questions list', data);
  } catch (error: any) {
    const errMessage = error.message ?? 'Unknown error';
    console.error(errMessage);
    return returnData(500, 'Internal error', { message: errMessage });
  }
};