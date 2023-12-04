import { QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './lib/ddbDocClient';

export const queryItems = async (params: QueryCommandInput) => {
  try {
    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log('Success: ', data.Items);
    return data.Items;
  } catch (error: any) {
    console.error('Error', JSON.stringify(error));
    throw new Error(error.message);
  }
};
