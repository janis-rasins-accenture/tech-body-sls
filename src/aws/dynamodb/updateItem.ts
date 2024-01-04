import { UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './lib/ddbDocClient';

export const updateItem = async (params: UpdateCommandInput) => {
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.log(
      'Success - item updated: httpStatusCode ',
      data.$metadata.httpStatusCode
    );
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.log('Error: ', error.stack);
    return {
      success: false,
      error,
    };
  }
};
