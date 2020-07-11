const Operation = require("../operation");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../utils/config");
const ErrorUtil = require("../../utils/ErrorUtil");

class UserOperation extends Operation {
  constructor() {
    super();
    this.userService = require("../../services").DbService.userService;
  }

  async login({ email, password }) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      let user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw ErrorUtil.createNotFoundError({ details: "User not found. Please register" });
      }
      let isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw ErrorUtil.createValidationError({ details: "Wrong password" });
      }
      let token = jwt.sign(
        {
          email: user.email,
          _id: user._id
        },
        jwtSecret,
        {
          expiresIn: "1h"
        }
      );
      return this.emit(SUCCESS, { token, user });
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

  async signup(payload) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      let existingUser = await this.userService.getUserByEmail(payload.email);
      if (existingUser) {
        throw ErrorUtil.createValidationError({ details: "User already exists" });
      }
      let hashedPassword = bcrypt.hashSync(payload.password, bcrypt.genSaltSync(8), null);
      payload.password = hashedPassword;
      let user = await this.userService.addUser(payload);

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

  async getAllUsers() {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      const users = await this.userService.getAllUsers();
      return this.emit(SUCCESS, { users });
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

  async getUserById({ _id }) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
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
