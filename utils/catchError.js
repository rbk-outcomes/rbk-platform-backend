module.exports = async (context, fn) => {
    const { ERROR, VALIDATION_ERROR, NOT_FOUND } = context.outputs;
    try{
      return fn();
  }catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
          return context.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
          return context.emit(NOT_FOUND, error);
      } else {
          return context.emit(ERROR, error);
      }
  }
};