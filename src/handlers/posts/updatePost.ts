import { UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';
import { updateItem } from '../../aws/dynamodb/updateItem';
import { returnData } from '../../utils/returnData';
import { PostBaseIF, PostUpdatePathParams } from '../../types/posts';
import { postUpdateSchema } from './validation/postValidation';
import { validateInput } from '../../utils/validateInput';

export const handler = async ({
  pathParameters,
  body,
  requestContext,
}: APIGatewayEvent) => {
  const { TABLE_NAME_POSTS } = process.env;

  const pathParams = pathParameters as unknown as PostUpdatePathParams;

  if (!pathParams || !pathParams.postId) {
    const errMessage = 'postId not found in pathParameters';
    console.log(errMessage);
    return returnData(400, 'Bad Request', { message: errMessage });
  }

  const { postId } = pathParams;

  if (!body) {
    const errMessage = 'body not found in pathParameters';
    console.log(errMessage);
    return returnData(400, 'Bad Request', { message: errMessage });
  }
  const userId: string = requestContext.authorizer?.lambda.userId;
  console.log('Request context ', JSON.stringify(requestContext));

  const postData: PostBaseIF = JSON.parse(body);
  await validateInput(postUpdateSchema, postData);

  const params: UpdateCommandInput = {
    TableName: TABLE_NAME_POSTS,
    Key: {
      postId,
    },
    UpdateExpression:
      'set title = :title, #txt = :txt, imageUrl = :imageUrl, userId = :userId, unixTimestamp = :unixTimestamp, isActive = :isActive',
    ExpressionAttributeValues: {
      ':title': postData.title,
      ':txt': postData.text,
      ':imageUrl': postData.imageUrl,
      ':userId': userId,
      ':unixTimestamp': new Date().valueOf(),
      ':isActive': 1,
    },
    ExpressionAttributeNames: {
      '#txt': 'text',
    },
    ReturnValues: 'ALL_NEW',
  };
  const response = await updateItem(params);
  return returnData(200, 'Posts list', response);
};
