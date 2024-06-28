const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/worko/users', UserController.getUsers);
router.get('/worko/users/inactive', UserController.getInactiveUsers);
router.get('/worko/users/active', UserController.getActiveUsers);
router.get('/worko/users/:userId', UserController.getUserById);
router.post('/worko/users', UserController.createUser);
router.put('/worko/users/:userId', UserController.updateUser);
router.patch('/worko/users/:userId', UserController.partialUpdateUser);
router.delete('/worko/users/:userId', UserController.deleteUser);

module.exports = router;