'use strict';

module.exports = async (event, context) => {
  const result = {
    name: 'mailersend',
    body: JSON.stringify(event.body),
    'content-type': event.headers['content-type'],
  };

  return context.status(200).succeed(result);
};
