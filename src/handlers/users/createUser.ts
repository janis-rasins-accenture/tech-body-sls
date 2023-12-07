import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { ValidationError } from 'yup';
import { putItem } from '../../aws/dynamodb/putItem';
import { returnData } from '../../utils/returnData';
import { InputUserCreateIF } from '../../types/users';
import { userCreateSchema } from './validation/usersValidation';

export const handler = async (event: APIGatewayEvent) => {
  const { TABLE_NAME_USERS } = process.env;
  if (!TABLE_NAME_USERS) {
    return returnData(400, 'Table name is not defined!');
  }
  if (!event.body) {
    return returnData(400, 'No body!');
  }
  const user: InputUserCreateIF = JSON.parse(event.body);
  try {
    await userCreateSchema.validate(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return returnData(400, error.message);
    }
    return returnData(400, 'Something goes wrong', { error });
  }
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
    },
  };
  const result = await putItem(params);
  if (result.success) {
    console.log(`User with Id ${uuid} created!`);
    return returnData(200, 'Success!', { userId: uuid });
  }
  return returnData(400, result.error);
};
