module.exports = {
  to_user,
};

function to_user(res, code, status, error, resMsg, data) {
  var res_data = {
    responseCode: code,
    success: status,
    responseMessage: resMsg,
    error: error,
  };
  if (data) {
    res_data.result = data;
  }
  res.status(code).send(res_data);
}
