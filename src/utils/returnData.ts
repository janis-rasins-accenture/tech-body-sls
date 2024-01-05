export interface BodyDataIF {
  message: string;
  success: boolean;
  data?: {
    [key: string]: any;
  };
}
export interface StandardResponse {
  statusCode: number;
  body: string;
}

export const returnData = (
  statusCode: number,
  message: string,
  data?: Object
): StandardResponse => {
  const body: BodyDataIF = {
    message,
    success: statusCode === 200,
  };

  if (data && Object.keys(data).length) {
    body.data = data;
  }

  return {
    statusCode,
    body: JSON.stringify(body, null, 2),
  };
};
