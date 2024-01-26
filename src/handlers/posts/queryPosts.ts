import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { returnQueryItems } from '../../aws/dynamodb/queryItems';

export const handler = async () => {
  const { TABLE_NAME_POSTS } = process.env;
  if (!TABLE_NAME_POSTS) {
    const errMessage = 'No TABLE_NAME_POSTS';
    console.log(errMessage);
    throw new Error(errMessage);
  }
  const params: QueryCommandInput = {
    IndexName: 'isActiveIndex',
    KeyConditionExpression: 'isActive = :i',
    ExpressionAttributeValues: {
      ':i': 1,
    },
    TableName: TABLE_NAME_POSTS,
    ScanIndexForward: true,
  };
  return returnQueryItems(params, 'Posts list');
};
