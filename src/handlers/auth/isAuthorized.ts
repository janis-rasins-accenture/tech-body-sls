import { APIGatewayEvent } from 'aws-lambda';
import { verifyCookie } from './lib/cookies';
import { getUserProfile } from '../users/getUser';
import { returnData } from '../../utils/returnData';

export const handler = async (event: APIGatewayEvent) => {
  const { JWT_SECRET, TABLE_NAME_USERS } = process.env;
  if (!TABLE_NAME_USERS) {
    return returnData(400, 'Table name is not defined!');
  }
  const unauthorized = {
    statusCode: 401,
    body: JSON.stringify({ success: false, err: 'Unauthorized' }),
  };
  const cookieHeader = event.headers.cookie ?? event.headers.Cookie;
  console.log('event.headers', event.headers);
  const decoded = verifyCookie(cookieHeader, JWT_SECRET);
  if (!(decoded instanceof Object)) {
    return unauthorized;
  }
  const currentTimestamp = new Date().getTime();
  const expireTimestamp = decoded.exp ? decoded.exp * 1000 : 1000;
  if (expireTimestamp < currentTimestamp) {
    return unauthorized;
  }
  const user = await getUserProfile(decoded.userId, TABLE_NAME_USERS);
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      data: {
        expireTimestamp,
        user,
      },
    }),
  };
};
