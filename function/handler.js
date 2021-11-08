'use strict';

module.exports = async (event, context) => {
  const result = {
    name: 'mailersend',
    version: '0.0.2-test',
    event,
    context,
  };

  return context
    .status(200)
    .headers({ 'content-type': 'application/json' })
    .succeed(result);
};
