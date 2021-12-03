import { Request, Response } from 'express';
import { From, Recipient, sendEmail, Template, Variables } from '../utils';

export type SendEmailPayload = {
  apiKey: string;
  from: From;
  recipients: Recipient[];
  template: Template;
  subject: string;
  variables?: Variables;
};

export const sendEmailHandler = async (req: Request, res: Response) => {
  try {
    const { apiKey, from, recipients, template, subject, variables } = req.body
      .payload as SendEmailPayload;

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

    return res.json({ sent: true });
  } catch (error: any) {
    return res.status(500).send(error.message || 'Failed to send email.');
  }
};
