import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { PutCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcrypt';
import { GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { putItem } from '../../aws/dynamodb/putItem';
import { returnData } from '../../utils/returnData';
import { InputUserCreateIF } from '../../types/users';
import { userCreateSchema } from './validation/usersValidation';
import { validateInput } from '../../utils/validateInput';
import { getItem } from '../../aws/dynamodb/getItem';
import { queryItems } from '../../aws/dynamodb/queryItems';

const isUserExist = async (
  user: InputUserCreateIF,
  tableNameAuth: string,
  tableNameUsers: string
) => {
  const authParams: GetItemCommandInput = {
    Key: {
      email: { S: user.email },
    },
    TableName: tableNameAuth,
  };
  const authResult = await getItem(authParams);
  console.log('Auth result: ', authResult);
  if (authResult.email) {
    throw returnData(400, 'This email already exist');
  }
  const userParams: QueryCommandInput = {
    IndexName: 'userNameIndex',
    KeyConditionExpression: 'userName = :u',
    ExpressionAttributeValues: {
      ':u': user.userName,
    },
    TableName: tableNameUsers,
    ScanIndexForward: true,
  };
  console.log('User result params ', userParams);
  const usersResult = await queryItems(userParams);
  console.log('User result: ', usersResult);
  if (usersResult?.length) {
    throw returnData(400, 'This user name already exist');
  }
};

export const handler = async (event: APIGatewayEvent) => {
  const { TABLE_NAME_USERS, TABLE_NAME_AUTH } = process.env;
  if (!TABLE_NAME_USERS || !TABLE_NAME_AUTH) {
    return returnData(400, 'Table name is not defined!');
  }
  if (!event.body) {
    return returnData(400, 'No body!');
  }
  const user: InputUserCreateIF = JSON.parse(event.body);
  await validateInput(userCreateSchema, user);

  await isUserExist(user, TABLE_NAME_AUTH, TABLE_NAME_USERS);

  const uuid = uuidv4();
  const params: PutCommandInput = {
    TableName: TABLE_NAME_USERS,
    Item: {
      userId: uuid,
      firstName: user.firstName,
      isActive: 1,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      avatarUrl: user.avatarUrl,
      isAdmin: 0,
      followed: [],
    },
  };

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password.toString(), salt);

  const paramsAuth: PutCommandInput = {
    TableName: TABLE_NAME_AUTH,
    Item: {
      userId: uuid,
      email: user.email,
      password: hashedPassword,
    },
  };
  try {
    const [result, resultAuth] = await Promise.all([
      putItem(params),
      putItem(paramsAuth),
    ]);

    if (result.success && resultAuth.success) {
      console.log(`User with Id ${uuid} created!`);
      return returnData(200, 'Success!', { userId: uuid });
    }
    return returnData(400, 'Failed to create user or auth entry');
  } catch (error) {
    return returnData(500, 'Internal Server Error', { error });
  }
};
