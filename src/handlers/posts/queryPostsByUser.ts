import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import { queryItems } from '../../aws/dynamodb/queryItems';
import { returnData } from '../../utils/returnData';
import { PostsByUserPathParams } from '../../types/posts';

export const handler = async ({ pathParameters }: APIGatewayEvent) => {
  const { TABLE_NAME_POSTS } = process.env;
  if (!TABLE_NAME_POSTS) {
    const errMessage = 'No TABLE_NAME_POSTS';
    console.log(errMessage);
    throw new Error(errMessage);
  }
  const pathParams = pathParameters as unknown as PostsByUserPathParams;

  if (!pathParams || !pathParams.userId) {
    const errMessage = 'userId not found in pathParameters';
    console.log(errMessage);
    return returnData(400, 'Bad Request', { message: errMessage });
  }

  const { userId } = pathParams;
  const params: QueryCommandInput = {
    IndexName: 'userIndex',
    KeyConditionExpression: 'userId = :u',
    ExpressionAttributeValues: {
      ':u': userId,
    },
    TableName: TABLE_NAME_POSTS,
    ScanIndexForward: true,
  };
  try {
    const data = await queryItems(params);
    return returnData(200, 'Posts by user list', data);
  } catch (error: any) {
    const errMessage = error.message ?? 'Unknown error';
    console.error(errMessage);
    return returnData(500, 'Internal error', { message: errMessage });
  }
};
