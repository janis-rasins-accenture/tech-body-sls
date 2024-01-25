import { UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './lib/ddbDocClient';

export const updateItem = async (params: UpdateCommandInput) => {
  try {
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.log(
      'Success - item updated: httpStatusCode ',
      data.$metadata.httpStatusCode
    );
    return data.Attributes;
  } catch (error: any) {
    console.log('Error: ', error.stack);
    const errorResponse = {
      success: false,
      message: error.message,
    };
    throw errorResponse;
  }
};
