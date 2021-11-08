'use strict';

module.exports = async (event, context) => {
  const result = {
    name: 'mailersend',
    version: '0.0.1-test',
    event,
    context,
  };

  return context.status(200).succeed(result);
};
