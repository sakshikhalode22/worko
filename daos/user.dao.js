const User = require("../model/user.model");

exports.getUsers = () => {
  return User.find().exec();
};

exports.getUserById = (userId) => {
  return User.findOne({ id: userId }).exec();
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.updateUser = (userId, userData) => {
  return User.findOneAndUpdate({ id: userId }, userData, { new: true }).exec();
};

exports.softDeleteUser = async (userId) => {
  return User.updateOne({ id: userId }, { $set: { deletedAt: Date.now() } });
}
