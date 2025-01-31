
const Http = require('../lib/http');

/**
 * @name getTimestamp
 * @description Get the server time.
 * @return {Object} { code, success, data }
 */
exports.getTimestamp = async function getTimestamp({key, secret, passphrase}) {
  /*
  {
    "code":"200000",
    "msg":"success",
    "data":1546837113087
  }
  */
  return await Http({key, secret, passphrase}).GET('/api/v1/timestamp');
};

/**
 * @name getStatus
 * @description Get the service status.
 * @return {Object} { code, success, data }
 */
exports.getStatus = async function getStatus({key, secret, passphrase}) {
  /*
  {
    "code": "200000",
    "data": {
      "status": "open",                //open, close, cancelonly
      "msg":  "upgrade match engine"   //remark for operation
    }
  }
  */
  return await Http({key, secret, passphrase}).GET('/api/v1/status');
};
