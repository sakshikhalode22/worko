const UserService = require("../services/user.service");
const UserValidator = require("../utilities/user.validator");
const UserDTO = require("../dtos/user.dto");
const helper = require("../utilities/user.helpers");

exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    const userDTOs = users.map((user) => new UserDTO(user));
    res.json(userDTOs);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Error fetching users" });
  }
};

exports.getInactiveUsers = async (req, res) => {
  try {
    const users = await UserService.getInactiveUsers();
    const userDTOs = users.map((user) => new UserDTO(user));
    res.json(userDTOs);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Error fetching users" });
  }
};

exports.getActiveUsers = async (req, res) => {
  try {
    const users = await UserService.getActiveUsers();
    const userDTOs = users.map((user) => new UserDTO(user));
    res.json(userDTOs);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Error fetching users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { error } = await UserValidator.validateId(userId);
    if (error) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const userDTO = new UserDTO(user);
      res.json(userDTO);
    }
  } catch (error) {
    console.error(error);
    res.status(404);
    res.json({ message: "User not found" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await UserService.loginUser(req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const userDTO = new UserDTO(user);
      res.json({
        message: "Login successful",
        user: userDTO,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(404);
    res.json({ message: "User not found" });
  }
}

exports.createUser = async (req, res) => {
  try {
    req.body.id = await helper.generateUserId();
    const userData = new UserDTO(req.body);
    const { error } = await UserValidator.validateCreateUser(userData);
    if (error) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const user = await UserService.createUser(userData);
    const userDTO = new UserDTO(user);
    res.json(userDTO);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Error creating user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { error } = await UserValidator.validateId(userId);
    if (error) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userData = new UserDTO(req.body);
    const { error: userDataError } = await UserValidator.validateUpdateUser(
      userData
    );
    if (userDataError) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const user = await UserService.updateUser(userId, userData);
    const userDTO = new UserDTO(user);
    res.json(userDTO);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ message: "Error updating user" });
  }
};

exports.partialUpdateUser = async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;

  // Validate the updates object to ensure it only contains allowed fields
  const allowedFields = ["age", "zipCode", "city", "password"];
  const invalidFields = Object.keys(updates).filter(
    (field) => !allowedFields.includes(field)
  );
  if (invalidFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Cannot update fields: ${invalidFields.join(", ")}` });
  }

  try {
    const user = await UserService.partialUpdateUser(userId, updates);
    const userDTO = new UserDTO(user);
    res.json(userDTO);
  } catch (err) {
    res.status(500);
    res.json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { error } = await UserValidator.validateId(userId);
    if (error) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    await UserService.softDeleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json({ message: "Error deleting user" });
  }
};
