import { APIGatewayEvent } from 'aws-lambda';
import { GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { getItem } from '../../aws/dynamodb/getItem';
import { returnData } from '../../utils/returnData';

export const getUserProfile = async (userId: string, tableName: string) => {
  const params: GetItemCommandInput = {
    Key: {
      userId: { S: userId },
    },
    TableName: tableName,
  };
  try {
    const data = await getItem(params);
    const unmarshalledData = {
      ...unmarshall(data),
      followed: data.followed.SS ?? [],
    };
    return unmarshalledData;
  } catch (error: any) {
    const errMessage = error.message ?? 'Unknown error';
    console.error(errMessage);
    throw returnData(500, 'Internal error', { message: errMessage });
  }
};

export const handler = async (event: APIGatewayEvent) => {
  const { TABLE_NAME_USERS } = process.env;
  if (!TABLE_NAME_USERS) {
    const errMessage = 'No table name USERS';
    console.log(errMessage);
    throw new Error(errMessage);
  }
  const userId = event.pathParameters?.userId as string;
  const data = await getUserProfile(userId, TABLE_NAME_USERS);
  return returnData(200, 'Selected user', data);
};
