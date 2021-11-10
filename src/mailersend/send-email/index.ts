import { EventBody, HandlerEvent, HandlerContext } from '../../handler';
import { From, Recipient, sendEmail, Template, Variables } from '..';

export interface SendEmailEvent extends HandlerEvent {
  body: SendEmailEventBody;
}

export interface SendEmailEventBody extends EventBody {
  payload: {
    apiKey: string;
    from: From;
    recipients: Recipient[];
    template: Template;
    subject: string;
    variables?: Variables;
  };
}

export const sendEmailHandler = async (
  event: SendEmailEvent,
  context: HandlerContext
) => {
  try {
    const { apiKey, from, recipients, template, subject, variables } =
      event.body.payload;

    if (!apiKey) {
      throw new Error('Missing apiKey');
    }

    if (!from) {
      throw new Error('Missing from');
    }

    if (!recipients) {
      throw new Error('Missing recipients');
    }

    if (!template) {
      throw new Error('Missing template');
    }

    if (!subject) {
      throw new Error('Missing subject');
    }

    await sendEmail({ apiKey, from, recipients, template, subject, variables });

    return context.status(200).succeed({ sent: true });
  } catch (error: any) {
    return context.status(500).fail(error.message || 'Failed to send email.');
  }
};
