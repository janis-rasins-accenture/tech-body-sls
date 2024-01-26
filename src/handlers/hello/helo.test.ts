import { mockAPIGatewayEvent } from '../../mockData/mockEvent';
import { responseData } from '../../mockData/mockResponse';
import * as HelloHandler from './hello';

describe('Unit test for AWS lambda hello handler', () => {
  let spyHelloCall: jest.SpyInstance;
  beforeAll(() => {
    spyHelloCall = jest.spyOn(HelloHandler, 'handler');
  });
  const expectedBodyMessage = 'SLS is up and running';

  it('Handles hello', async () => {
    const callBody = {
      message: expectedBodyMessage,
      data: responseData,
    };
    const response = await HelloHandler.handler(mockAPIGatewayEvent);
    expect(spyHelloCall).toHaveBeenCalledTimes(1);
    expect(spyHelloCall).toHaveBeenCalledWith(mockAPIGatewayEvent);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body).message).toEqual(callBody.message);
    expect(JSON.parse(response.body).data).toEqual(callBody.data);
  });
});
