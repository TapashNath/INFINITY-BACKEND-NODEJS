module.exports.response = (error, resp, data) => {
  error === 1
    ? resp.status(400).send({
        error: error === 0 ? false : true,
        data: data.data,
        message: data.message,
      })
    : resp.status(200).send({
        error: error === 0 ? false : true,
        data: data.data,
        message: data.message,
      });
};
