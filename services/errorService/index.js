// when express sees a 4 params in the handler, express well automatically consider this middle is an error handling middleware
module.exports = ({message = 'error', status = 'ERROR', statusCode = 500, ...Other}, req, res, next) => {
  res.status(statusCode).send({
    status,
    statusCode,
    message
  });
};
