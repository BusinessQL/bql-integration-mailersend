import { Integration } from './integrations';
import { sendEmailHandler, SendEmailEvent } from './mailersend/send-email';

export interface HandlerEvent {
  body: EventBody;
  headers: {
    [key: string]: string;
  };
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  query: any;
  path: string;
}

export interface EventBody {
  method: string;
  payload?: any;
  integration?: Integration;
}

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
    const { method } = event.body;

    if (!method) {
      throw new Error('Missing method');
    }

    switch (method) {
      case 'sendEmail':
        return sendEmailHandler(event as SendEmailEvent, context);

      default:
        break;
    }

    throw new Error(`Invalid method: ${method}`);
  } catch (error: any) {
    return context.status(500).fail(error.message || 'Failed');
  }
};

export default handler;
