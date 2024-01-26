import * as QueryPostsByUser from './queryPostsByUser';
import * as QueryItems from '../../aws/dynamodb/queryItems';
import { mockPosts } from '../../mockData/mockPosts';
import { mockAPIGatewayEvent } from '../../mockData/mockEvent';

describe('Unit test for AWS lambda query posts by user handler', () => {
  let spyQueryPostsCall: jest.SpyInstance;
  let spyQueryItems: jest.SpyInstance;
  const OLD_ENV = process.env;
  const eventDataPostsByUser = {
    ...mockAPIGatewayEvent,
    pathParameters: { userId: '14' },
  };
  beforeAll(() => {
    spyQueryItems = jest.spyOn(QueryItems, 'queryItems');
    spyQueryPostsCall = jest.spyOn(QueryPostsByUser, 'handler');
  });
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV, TABLE_NAME_POSTS: 'tablePosts' }; // Make a copy
  });

  afterEach(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  const expectedBodyMessage = 'Posts list';

  it('Handles posts', async () => {
    const callBody = {
      message: expectedBodyMessage,
      data: mockPosts,
    };
    spyQueryItems.mockImplementation(() => Promise.resolve(mockPosts));
    const response = await QueryPostsByUser.handler(eventDataPostsByUser);
    expect(spyQueryPostsCall).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body).message).toEqual('Posts by user list');
    expect(JSON.parse(response.body).data).toEqual(callBody.data);
  });
  it('Handle no table name', async () => {
    process.env = { ...OLD_ENV, TABLE_NAME_POSTS: '' };
    const response = QueryPostsByUser.handler(eventDataPostsByUser);
    await expect(response).rejects.toThrow('No TABLE_NAME_POSTS');
  });
  it('Handle DynamoDB error', async () => {
    const errorResponse = {
      success: false,
    };
    spyQueryItems.mockImplementation(() => Promise.reject(errorResponse));
    const response = await QueryPostsByUser.handler(eventDataPostsByUser);
    expect(response.statusCode).toEqual(500);
    expect(JSON.parse(response.body).message).toEqual('Internal error');
    expect(JSON.parse(response.body).data.message).toEqual('Unknown error');
  });
  it('Handle DynamoDB error', async () => {
    const errorResponse = {
      success: false,
      message: '',
    };
    spyQueryItems.mockImplementation(() => Promise.reject(errorResponse));
    const response = await QueryPostsByUser.handler(eventDataPostsByUser);
    expect(response.statusCode).toEqual(500);
    expect(JSON.parse(response.body).message).toEqual('Internal error');
    expect(JSON.parse(response.body).data.message).toEqual(
      errorResponse.message
    );
  });
  it('Handles missing userId in pathParameters', async () => {
    const response = await QueryPostsByUser.handler({
      ...mockAPIGatewayEvent,
      pathParameters: {},
    });
    expect(response.statusCode).toEqual(400);
    expect(JSON.parse(response.body).message).toEqual('Bad Request');
    expect(JSON.parse(response.body).data.message).toEqual(
      'userId not found in pathParameters'
    );
  });
});
