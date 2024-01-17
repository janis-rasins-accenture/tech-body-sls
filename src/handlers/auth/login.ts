import { APIGatewayEvent } from 'aws-lambda';
import { GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { returnData } from '../../utils/returnData';
import { UserAuthIF, UserAuthResponseIF } from '../../types/users';
import { matchPassword } from './lib/password';
import { generateCookie } from './lib/cookies';
import { authSchema } from './validation/authValidation';
import { validateInput } from '../../utils/validateInput';
import { getItem } from '../../aws/dynamodb/getItem';
import { getUserProfile } from '../users/getUser';

export const handler = async (event: APIGatewayEvent) => {
  if (!event.body) {
    return returnData(400, 'No body!');
  }
  const { TABLE_NAME_AUTH, TABLE_NAME_USERS } = process.env;
  if (!TABLE_NAME_AUTH || !TABLE_NAME_USERS) {
    return returnData(400, 'Table name is not defined!');
  }
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    return returnData(400, "Can't find JWT secret key");
  }
  const auth: UserAuthIF = JSON.parse(event.body);

  await validateInput(authSchema, auth);

  const { email, password } = auth;
  const params: GetItemCommandInput = {
    TableName: TABLE_NAME_AUTH,
    Key: {
      email: { S: email },
    },
  };

  const item: UserAuthResponseIF = (await getItem(params)) as any;
  if (!Object.keys(item).length) {
    return returnData(401, 'Email or password is incorrect');
  }

  const userId = item.userId.S;
  console.log('Auth query: ', item.email.S, userId);
  const hashedPassword = item.password.S;
  const isMatched = await matchPassword(password, hashedPassword);

  if (!isMatched) {
    return returnData(401, 'Email or password is incorrect');
  }
  const cookie = generateCookie(userId, 1, JWT_SECRET);
  const user = await getUserProfile(userId, TABLE_NAME_USERS);

  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': cookie,
    },
    body: JSON.stringify({
      message: 'Login succeeded!',
      success: true,
      data: {
        ...user,
      },
    }),
  };
};
