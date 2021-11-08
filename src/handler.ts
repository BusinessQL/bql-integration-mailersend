import { sendEmail } from './mailersend';

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
  fail: (value: any) => HandlerContext;
};

export const handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    await sendEmail(event.body);

    return context.status(200).succeed({ sent: true });
  } catch (error: any) {
    return context.status(500).fail(error.message || 'Failed to send email.');
  }
};

export default handler;
