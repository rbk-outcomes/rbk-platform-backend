const User = require("../../../models/user");

module.exports = new (class UserService {
  constructor() {
    this.user = User;
  }
  async getUserById(_id) {
    return this.user.findOne({ _id });
  }
  async getAllUsers() {
    return this.user.find();
  }
  async addUser(payload) {
    return this.user.create(payload);
  }
  async updateUserById(_id, payload) {
    return this.user.findOneAndUpdate({ _id }, payload, {
      new: true
    });
  }
  async deleteUserById(_id) {
    return this.user.findOneAndDelete({ _id });
  }
  async getUsersByFilter(filter) {
    return this.user.find(filter);
  }
  async updateUsersByFilter(filter, payload) {
    return this.user.updateMany(filter, payload, {
      upsert: false // do not create a new document if you don't find one
    });
  }
  async deleteUsersByFilter(filter) {
    return this.user.deleteMany(filter);
  }
})();
