const UserDao = require('../daos/user.dao');

exports.getUsers=()=>{
  return UserDao.getUsers()
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

exports.softDeleteUser=(userId)=>{
  return UserDao.softDeleteUser(userId);
}
