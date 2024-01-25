import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import { UserNamePathParams } from '../../types/users';
import { returnData } from '../../utils/returnData';
import { queryItems } from '../../aws/dynamodb/queryItems';

export const handler = async ({ pathParameters }: APIGatewayEvent) => {
  const { TABLE_NAME_USERS } = process.env;
  if (!TABLE_NAME_USERS) {
    const errMessage = 'No table name';
    console.log(errMessage);
    throw new Error(errMessage);
  }
  const pathParams = pathParameters as unknown as UserNamePathParams;

  if (!pathParams || !pathParams.userName) {
    const errMessage = 'user name not found in pathParameters';
    console.log(errMessage);
    return returnData(400, 'Bad Request', { message: errMessage });
  }

  const { userName } = pathParams;
  const params: QueryCommandInput = {
    IndexName: 'userNameIndex',
    KeyConditionExpression: 'userName = :u',
    ExpressionAttributeValues: {
      ':u': userName,
    },
    TableName: TABLE_NAME_USERS,
    ScanIndexForward: true,
  };
  try {
    const data = await queryItems(params);
    if (data?.length) {
      return returnData(200, 'User profile', data[0]);
    }
    return returnData(200, 'There is no such user');
  } catch (error: any) {
    const errMessage = error.message ?? 'Unknown error';
    console.error(errMessage);
    return returnData(500, 'Internal error', { message: errMessage });
  }
};
