'use strict';

module.exports = async (event, context) => {
  const result = {
    name: 'mailersend',
    version: '0.0.1',
    'content-type': 'application/json',
  };

  return context.status(200).succeed(result);
};
