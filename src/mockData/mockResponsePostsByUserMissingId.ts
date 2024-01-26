import { APIGatewayEvent } from 'aws-lambda';

export const responseDataPostsByUserMissigUserId: APIGatewayEvent = {
  body: null,
  headers: {
    'user-agent': 'PostmanRuntime/7.32.2',
    accept: '*/*',
    'cache-control': 'no-cache',
    'postman-token': '3a0946b9-32e0-4af6-9e05-674c17a080bb',
    host: 'localhost:4000',
    'accept-encoding': 'gzip, deflate, br',
    connection: 'keep-alive',
  },
  isBase64Encoded: false,
  pathParameters: null,
  queryStringParameters: null,
  requestContext: {
    accountId: 'offlineContext_accountId',
    apiId: 'offlineContext_apiId',
    authorizer: { jwt: {} },
    domainName: 'offlineContext_domainName',
    domainPrefix: 'offlineContext_domainPrefix',
    requestId: 'offlineContext_resourceId',
    routeKey: 'GET /local/hello',
    stage: '$default',
    httpMethod: 'GET',
    protocol: 'HTTP/1.1',
    path: '/local/hello',
    requestTimeEpoch: 1686568437839,
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      clientCert: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: '',
      user: null,
      userAgent: null,
      userArn: null,
    },
    resourceId: '123',
    resourcePath: 'path',
  },
  stageVariables: null,
  httpMethod: 'GET',
  multiValueHeaders: {},
  path: '/local/hello',
  resource: '',
  multiValueQueryStringParameters: null,
};