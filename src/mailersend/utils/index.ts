const MailRecipient = require('mailersend').Recipient;
const EmailParams = require('mailersend').EmailParams;
const MailerSend = require('mailersend');

export type Recipient = {
  name: string;
  email: string;
  variables?: Variables;
};

export type From = {
  email: string;
  name: string;
};

export type Template = {
  id: string;
};

export type Variables = {
  [key: string]: string;
};

export type SendEmailOptions = {
  from: From;
  recipients: Recipient[];
  template: Template;
  subject: string;
  variables?: Variables;
  apiKey: string;
};

export const sendEmail = async ({
  from,
  subject,
  template,
  recipients,
  variables,
  apiKey,
}: SendEmailOptions): Promise<void> => {
  const mailersend = new MailerSend({
    api_key: apiKey,
  });

  const allVariables: any[] = [];

  const formattedRecipients = recipients.map((recipient) => {
    return new MailRecipient(recipient.email, recipient.name);
  });

  recipients.forEach((recipient) => {
    const combinedVariables = {
      ...variables,
      ...recipient.variables,
    };
    const substitutions = formatVariables(combinedVariables);

    if (substitutions.length) {
      allVariables.push({
        email: recipient.email,
        substitutions,
      });
    }
  });

  let emailParams = new EmailParams()
    .setFrom(from.email)
    .setFromName(from.name)
    .setRecipients(formattedRecipients)
    .setSubject(subject)
    .setTemplateId(template.id);

  if (allVariables.length) {
    emailParams = emailParams.setVariables(allVariables);
  }

  const result = await mailersend.send(emailParams);
  const success = result.status >= 200 && result.status <= 299;

  if (!success) {
    throw new Error(result.statusText || 'Unknown error');
  }
};

export const formatVariables = (variables?: Variables) => {
  if (!variables || !Object.keys(variables)) {
    return [];
  }

  return Object.keys(variables).map((key) => {
    return { var: key, value: variables[key] };
  });
};
