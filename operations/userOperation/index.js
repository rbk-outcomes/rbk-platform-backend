const Operation = require("../operation");

class UserOperation extends Operation {
  constructor() {
    super();
    this.userService = require("../../services").DbService.userService;
  }

  async login({ email, password }) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      // const user = await this.userBdService.
      return this.emit(SUCCESS, {});
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

  async signup({ email, password }) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.outputs;
    try {
      // const user = await this.userBdService.
      return this.emit(SUCCESS, {});
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
