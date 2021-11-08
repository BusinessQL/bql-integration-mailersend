export type HandlerEvent = {
  body: any;
  headers: {
    [key: string]: string;
  };
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  query: any;
  path: string;
};

export type HandlerContext = {
  statusCode: number;
  headerValues: {
    [key: string]: string;
  };
  cbCalled: number;
  status: (status: number) => HandlerContext;
  headers: (value: { [key: string]: string }) => HandlerContext;
  succeed: (value: any) => HandlerContext;
};

export const handler = async (event: HandlerEvent, context: HandlerContext) => {
  const result = {
    name: 'mailersend',
    version: '0.0.3-test',
    event,
    context,
  };

  return context
    .status(200)
    .headers({ 'content-type': 'application/json' })
    .succeed(result);
};

export default handler;
