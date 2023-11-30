import { APIGatewayEvent } from 'aws-lambda';
import { returnData } from '../../utilites/returnData';

export const handler = async (event: APIGatewayEvent) => {
  return returnData(200, 'SLS is up and running', event);
};
