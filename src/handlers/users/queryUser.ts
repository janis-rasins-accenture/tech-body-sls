import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import { queryItems } from '../../aws/dynamodb/queryItems';
import { returnData } from '../../utils/returnData';
import { UserPathParams } from '../../types/users';

export const handler = async ({ pathParameters }: APIGatewayEvent) => {
  const { TABLE_NAME_USERS } = process.env;
  if (!TABLE_NAME_USERS) {
    const errMessage = 'No TABLE_NAME_USERS';
    console.log(errMessage);
    throw new Error(errMessage);
  }
  const pathParams = pathParameters as unknown as UserPathParams;

  if (!pathParams || !pathParams.userId) {
    const errMessage = 'userId not found in pathParameters';
    console.log(errMessage);
    return returnData(400, 'Bad Request', { message: errMessage });
  }

  const { userId } = pathParams;
  const params: QueryCommandInput = {
    KeyConditionExpression: 'userId = :u',
    ExpressionAttributeValues: {
      ':u': userId,
    },
    TableName: TABLE_NAME_USERS,
    ScanIndexForward: true,
  };
  try {
    const data = await queryItems(params);
    return returnData(200, 'User list', data);
  } catch (error: any) {
    const errMessage = error.message ?? 'Unknown error';
    console.error(errMessage);
    return returnData(500, 'Internal error', { message: errMessage });
  }
};
