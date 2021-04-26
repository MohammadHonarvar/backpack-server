import { debug } from './log.js';
const log = debug('app/common/body-parser');

import querystring from 'querystring';

export const bodyParser = async (request) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('error', () => {
    throw {
      errorCode: 101,
      description: 'Invalid HTTP Body!',
    };
  });

  await new Promise((resolve) => request.on('end', resolve));

  const contentType = String(request.headers['content-type'])
    .toLowerCase()
    .trim();

  log('Body as %s: %o', contentType, body);

  if (body.length === 0) {
    return {};
  }

  let bodyParseResult = {};
  try {
    switch (contentType) {
      case 'application/json':
        bodyParseResult = JSON.parse(body);
        break;

      case 'application/x-www-form-urlencoded':
        bodyParseResult = querystring.parse(body);
        break;

      case 'text/plain':
        bodyParseResult = {
          text: body,
        };
        break;

      default:
        throw {
          message: `content-type ${contentType} not supported`,
        };
    }
    return bodyParseResult;
  } catch (error) {
    throw {
      errorCode: 102,
      description: "Can't Parse Body!",
      data: {
        contentType,
        error: error.message,
      },
    };
  }
};
