const User = require("../model/user.model");

exports.getUsers = () => {
  return User.find().exec();
};

exports.loginUser = (userData) => {
  return User.findOne({
    email: userData.email,
    password: userData.password,
    deletedAt: null,
  }).exec();
};

exports.getUserById = (userId) => {
  return User.findOne({ id: userId }).exec();
};

exports.getActiveUsers = () => {
  return User.find({ deletedAt: null }).exec();
};

exports.getInactiveUsers = () => {
  return User.find({ deletedAt: { $ne: null } }).exec();
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.updateUser = (userId, userData) => {
  return User.findOneAndUpdate({ id: userId, deletedAt: null, }, userData, { new: true }).exec();
};

exports.partialUpdateUser = async (userId, updates) => {
  return await User.findOneAndUpdate({ id: userId, deletedAt: null, }, updates, { new: true });
};

exports.softDeleteUser = async (userId) => {
  return User.updateOne({ id: userId, deletedAt: null, }, { $set: { deletedAt: Date.now() } });
};
