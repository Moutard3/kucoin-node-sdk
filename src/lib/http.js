const createHttp = require('./createHttp');
const utils = require('./utils');

let httpInstance = null;
const constructHttp = ({key, secret, passphrase}) => {

  /** Gen Http Instance */
  let _baseUrl = 'https://api.kucoin.com';
  if (!_baseUrl) {
    _baseUrl = process.env.PRODUCTION === 'prod'
      ? 'https://api.kucoin.io'
      : 'https://openapi-sandbox.kucoin.io';
  }

  const Http = createHttp({
    baseUrl: _baseUrl,
  });

  // insert auth hook
  Http.useBefore(async (ctx, next) => {
    // console.log('ctx.body', typeof ctx.body);
    const authHeaders = utils.auth(
      {key, secret, passphrase},
      ctx.method,
      ctx.url + (!ctx.query ? '' : ((/\?/g.test(ctx.url) ? '&' : '?') + (ctx.query || ''))),
      ctx.body || ''
    );
    ctx.headers = {
      ...ctx.headers,
      ...authHeaders,
    };
    next(ctx);
  });

  return Http;
};

module.exports = constructHttp;
