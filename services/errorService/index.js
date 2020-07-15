// when express sees a 4 params in the handler, express well automatically consider this middle is an error handling middleware
module.exports = ({message = 'error', status = 'ERROR', statusCode = 500, stack, ...other}, req, res, next) => {
    // should be modified when deploying for prediction
    //stack, other should be removed
    res.status(statusCode).send({
      status,
      statusCode,
      message,
      stack,
      other
    });
};
