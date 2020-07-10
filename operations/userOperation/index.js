const Operation = require("../operation");
const catchError = require("../../utils/catchError");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserOperation extends Operation {
  constructor() {
    super();
    this.catchError = catchError.bind(null, this);
    this.userService = require("../../services").DbService.userService;
    this._signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME });
  }

  async login({ email, password }) {
    //error message
    const message = 'Incorrect Password or email';

    return this.catchError(async () => {
      let user = await this.userService.getUsersByFilter({email});
      if(user.length){
        user = user[0];
        const bool = await bcrypt.compare(password, user.password);
        if(!bool || !user){
          throw {
            type: "ValidationError",
            message
          };
        }else if (bool && user){
          const token = this._signToken(user._id);
          return this.emit('SUCCESS',{token});
        }
      }else {
        throw {
          type: "ValidationError",
          message
        }
      }
    });
    // const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    // try {
    //   // const user = await this.userBdService.
    //   return this.emit(SUCCESS, {});
    // } catch (error) {
    //   if (error.message === "ValidationError") {
    //     return this.emit(VALIDATION_ERROR, error);
    //   } else if (error.message === "NotFoundError") {
    //     return this.emit(NOT_FOUND, error);
    //   } else {
    //     return this.emit(ERROR, error);
    //   }
    // }
  }

  async signup({ email, password ,type ,phoneNumber, LastName, firstName}) {
    return this.catchError(async () => {
      let user = await this.userService.getUsersByFilter({email});
      if(user.length){
        throw {
          type: "ValidationError",
          message: "user Already exists"
        };
      }
      user = await this.userService.addUser({email, password ,type, phoneNumber, LastName, firstName});
      const token = this._signToken(user._id);
      return this.emit('SUCCESS',{user, token});
    });

    // User.findOne({ userName: userName }, function (err, results) {
    //   if (results) {
    //     next(new Error('User already exist!'));
    //   } else {
    //     User.create({
    //       userName: userName,
    //       password: password
    //     }, function (err, user) {
    //       if (err) {
    //         next(new Error(err));
    //       } else {
    //         var token = jwt.encode(user, 'secret');
    //         res.json({ token: token });
    //       }
    //     });
    //   };
    // });




    // const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    // try {
    //   // const user = await this.userBdService.
    //   return this.emit(SUCCESS, {});
    // } catch (error) {
    //   console.log(error);
    //   if (error.message === "ValidationError") {
    //     return this.emit(VALIDATION_ERROR, error);
    //   } else if (error.message === "NotFoundError") {
    //     return this.emit(NOT_FOUND, error);
    //   } else {
    //     return this.emit(ERROR, error);
    //   }
    // }
  }

  async getAllUsers() {
    return this.catchError(async () => {
      const users = await this.userService.getAllUsers();
      return this.emit('SUCCESS', { users });
    });

    //    const {SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = context.outputs;
    // try {
    //      const users = await this.userService.getAllUsers();
    //       return this.emit(SUCCESS, { users });
    // } catch (error) {
    //   console.log(error);
    //   if (error.message === "ValidationError") {
    //     return this.emit(VALIDATION_ERROR, error);
    //   } else if (error.message === "NotFoundError") {
    //     return this.emit(NOT_FOUND, error);
    //   } else {
    //     return this.emit(ERROR, error);
    //   }
    // }
  }

  async getUserById({ _id }) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      console.log(_id);
      const user = await this.userService.getUserById(_id);

      return this.emit(SUCCESS, { user });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }

  async updateUserById({ _id }, payload) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const user = await this.userService.updateUserById(_id, payload);

      return this.emit(SUCCESS, { user });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }

  async deleteUserById({ _id }) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const user = await this.userService.deleteUserById(_id);

      return this.emit(SUCCESS, { user });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }

  async getUsersByFilter(filter) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const user = await this.userService.getUsersByFilter(filter);

      return this.emit(SUCCESS, { user });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }

  async deleteUsersByFilter(payload) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const user = await this.userService.deleteUsersByFilter(payload);

      return this.emit(SUCCESS, { user });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }

  async updateUsersByFilter(payload) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const user = await this.userService.updateUsersByFilter(payload.filter, payload.payload);

      return this.emit(SUCCESS, { user });
    } catch (error) {
      console.log(error);
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      } else if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      } else {
        return this.emit(ERROR, error);
      }
    }
  }
}
UserOperation.setOutputs(["SUCCESS", "ERROR", "VALIDATION_ERROR", "NOT_FOUND"]);
module.exports = UserOperation;

// case "ValidationError":{
// //     return context.emit(VALIDATION_ERROR, new appError(error.message, VALIDATION_ERROR, 401));
// // }
// // case "NotFoundError":{
// //     return context.emit(NOT_FOUND, new appError(error.message, NOT_FOUND, 404));
// // }
// // default:{
// //     return context.emit(ERROR, new appError(error.message, ERROR));
// // }