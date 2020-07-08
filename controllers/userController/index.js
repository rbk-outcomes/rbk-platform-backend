const UserOperation = require("../../operations/userOperation");

module.exports = {
  async login(req, res, next) {
    const userOperation = new UserOperation();
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userOperation.outputs;

    userOperation.on(SUCCESS, callback).on(ERROR, next).on(VALIDATION_ERROR, next).on(NOT_FOUND, next);

    // await userOperation.login(req.body);
  },

  async signup(req, res, next) {
    const userOperation = new UserOperation();
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userOperation.outputs;

    userOperation.on(SUCCESS, callback).on(ERROR, next).on(VALIDATION_ERROR, next).on(NOT_FOUND, next);

    // await userOperation.signup(req.body);
  },

  async getAllUsers(req, res, next) {
    const userOperation = new UserOperation();
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userOperation.outputs;

    userOperation
      .on(SUCCESS, (users) => res.status(200).send(users))
      .on(ERROR, next)
      .on(VALIDATION_ERROR, next)
      .on(NOT_FOUND, next);

    const users = await userOperation.getAllUsers();
  },

  async getUserById(req, res, next) {
    const userOperation = new UserOperation();
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userOperation.outputs;

    userOperation
      .on(SUCCESS, (user) => res.status(200).send(user))
      .on(ERROR, next)
      .on(VALIDATION_ERROR, next)
      .on(NOT_FOUND, next);
    const user = await userOperation.getUserById(req.params);
  },

  async updateUserById(req, res, next) {
    const userOperation = new UserOperation();
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userOperation.outputs;

    userOperation
      .on(SUCCESS, (user) => res.status(200).send(user))
      .on(ERROR, next)
      .on(VALIDATION_ERROR, next)
      .on(NOT_FOUND, next);

    const user = await userOperation.updateUserById(req.params, req.body);
  },

  async deleteUserById(req, res, next) {
    const userOperation = new UserOperation();
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userOperation.outputs;

    userOperation
      .on(SUCCESS, (user) => res.status(200).send(user))
      .on(ERROR, next)
      .on(VALIDATION_ERROR, next)
      .on(NOT_FOUND, next);
    const user = await userOperation.deleteUserById(req.params);
  },

  async getUsersByFilter(req, res, next) {
    const userOperation = new UserOperation();
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userOperation.outputs;

    userOperation
      .on(SUCCESS, (users) => res.status(200).send(users))
      .on(ERROR, next)
      .on(VALIDATION_ERROR, next)
      .on(NOT_FOUND, next);

    const users = await userOperation.getUsersByFilter(req.body);
  },

  async deleteUsersByFilter(req, res, next) {
    const userOperation = new UserOperation();
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userOperation.outputs;

    userOperation
      .on(SUCCESS, (users) => res.status(200).send(users))
      .on(ERROR, next)
      .on(VALIDATION_ERROR, next)
      .on(NOT_FOUND, next);

    const users = await userOperation.deleteUsersByFilter(req.body);
  },

  async updateUsersByFilter(req, res, next) {
    const userOperation = new UserOperation();
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = userOperation.outputs;

    userOperation
      .on(SUCCESS, (users) => res.status(200).send(users))
      .on(ERROR, next)
      .on(VALIDATION_ERROR, next)
      .on(NOT_FOUND, next);

    const users = await userOperation.updateUsersByFilter(req.body);
  }
};
