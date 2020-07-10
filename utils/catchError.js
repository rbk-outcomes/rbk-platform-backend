const appError = require("../utils/appError");


module.exports = async (context, fn) => {
    const { ERROR, VALIDATION_ERROR, NOT_FOUND } = context.outputs;
      return fn().catch(error => {
          switch (error.type) {
        case "ValidationError":{
            return context.emit(VALIDATION_ERROR, new appError(error.message, VALIDATION_ERROR, 401));
        }
        case "NotFoundError":{
            return context.emit(NOT_FOUND, new appError(error.message, NOT_FOUND, 404));
        }
        default:{
            return context.emit(ERROR, new appError(error.message, ERROR));
        }
          }
      });

};

// catch (error) {
//     console.log(error);
//     console.log("HERE")
//     //any error you have add in this switch statement
//     switch (error.message) {
//         case "ValidationError":{
//             return context.emit(VALIDATION_ERROR, error);
//         }
//         case "NotFoundError":{
//             return context.emit(NOT_FOUND, error);
//         }
//         default:{
//             return context.emit(ERROR, error);
//         }
//     }
//
//     // if (error.message === "ValidationError") {
//     //     return context.emit(VALIDATION_ERROR, error);
//     // } else if (error.message === "NotFoundError") {
//     //     return context.emit(NOT_FOUND, error);
//     // } else {
//     //     return context.emit(ERROR, error);
//     // }
// }
//
// case "ValidationError":{
// //     return context.emit(VALIDATION_ERROR, new appError(error.message, VALIDATION_ERROR, 401));
// // }
// // case "NotFoundError":{
// //     return context.emit(NOT_FOUND, new appError(error.message, NOT_FOUND, 404));
// }
// default:{
//     return context.emit(ERROR, new appError(error.message, ERROR));
// }