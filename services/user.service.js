const UserDao = require('../daos/user.dao');

exports.getUsers=()=>{
  return UserDao.getUsers()
}

exports.getInactiveUsers=()=>{
  return UserDao.getInactiveUsers()
}

exports.getActiveUsers=()=>{
  return UserDao.getActiveUsers()
}

exports.getUserById=(userId)=>{
  return UserDao.getUserById(userId)
}

exports.createUser=(userData)=>{
  return UserDao.createUser(userData)
}

exports.updateUser=(userId,userData)=>{
  return UserDao.updateUser(userId,userData)
}

exports.partialUpdateUser = async (userId, updates) => {
  return await UserDao.partialUpdateUser(userId, updates);
};

exports.softDeleteUser=(userId)=>{
  return UserDao.softDeleteUser(userId);
}
