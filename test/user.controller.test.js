const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const userController = require("../controllers/user.controller");
const UserService = require("../services/user.service");
const UserValidator = require("../utilities/user.validator");
const UserDTO = require("../dtos/user.dto");
const helper = require("../utilities/user.helpers");

jest.mock("../services/user.service");
jest.mock("../utilities/user.validator");
jest.mock("../dtos/user.dto");
jest.mock("../utilities/user.helpers");

describe("User Controller", () => {
  let req;
  let res;

  beforeAll(async () => {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnThis();
    jest.resetAllMocks(); // Reset mocks after each test
  });

  describe("getUsers", () => {
    it("returns all users when getUsers is called", async () => {
      const users = [{ name: "John Doe" }, { name: "Jane Doe" }];
      UserService.getUsers.mockResolvedValue(users);
      UserDTO.mockImplementation((user) => user);

      await userController.getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("returns 500 error when getUsers fails", async () => {
      UserService.getUsers.mockRejectedValue(new Error("Database error"));

      await userController.getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching users",
      });
    });
  });

  describe("getInactiveUsers", () => {
    it("should get all inactive users", async () => {
      const users = [{ name: "John Doe" }, { name: "Jane Doe" }];
      UserService.getInactiveUsers.mockResolvedValue(users);
      UserDTO.mockImplementation((user) => user);

      await userController.getInactiveUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return 500 if an error occurs", async () => {
      UserService.getInactiveUsers.mockRejectedValue(
        new Error("Database error")
      );

      await userController.getInactiveUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching users",
      });
    });
  });

  describe("getActiveUsers", () => {
    it("should get all active users", async () => {
      const users = [{ name: "John Doe" }, { name: "Jane Doe" }];
      UserService.getActiveUsers.mockResolvedValue(users);
      UserDTO.mockImplementation((user) => user);

      await userController.getActiveUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return 500 if an error occurs", async () => {
      UserService.getActiveUsers.mockRejectedValue(new Error("Database error"));

      await userController.getActiveUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching users",
      });
    });
  });

  describe("getUserById", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        params: { userId: "123" },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should get a user by id", async () => {
      const mockUser = {
        id: "123",
        name: "John Doe",
        email: "john.doe@gmail.com",
      };
      UserValidator.validateId.mockResolvedValue({ error: null });
      UserService.getUserById.mockResolvedValue(mockUser);

      await userController.getUserById(req, res);

      expect(UserValidator.validateId).toHaveBeenCalledWith(req.params.userId);
      expect(UserService.getUserById).toHaveBeenCalledWith(req.params.userId);
      expect(res.json).toHaveBeenCalledWith(new UserDTO(mockUser));
    });

    it("should return 400 if user id is invalid", async () => {
      UserValidator.validateId.mockResolvedValue({ error: "Invalid user ID" });

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid user ID" });
    });

    it("should return 404 if user is not found", async () => {
      UserValidator.validateId.mockResolvedValue({ error: null });
      UserService.getUserById.mockResolvedValue(null);

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 404 if an error occurs", async () => {
      UserValidator.validateId.mockResolvedValue({ error: null });
      UserService.getUserById.mockRejectedValue(new Error("Database error"));

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  describe('loginUser', () => {
    let req;
    let res;
  
    beforeEach(() => {
      req = {
        body: { username: 'JohnDoe', password: 'password123' },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    it('should login a user', async () => {
      const mockUser = { id: '123', username: 'JohnDoe', password: 'password123' };
      UserService.loginUser.mockResolvedValue(mockUser);
  
      await userController.loginUser(req, res);
  
      expect(UserService.loginUser).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        user: new UserDTO(mockUser),
      });
    });
  
    it('should return 404 if user is not found', async () => {
      UserService.loginUser.mockResolvedValue(null);
  
      await userController.loginUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  
    it('should return 404 if an error occurs', async () => {
      UserService.loginUser.mockRejectedValue(new Error('Database error'));
  
      await userController.loginUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });
  
  describe("createUser", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        body: { name: "John Doe", email: "john.doe@gmail.com" },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should create a user", async () => {
      helper.generateUserId.mockResolvedValue("123");
      UserValidator.validateCreateUser.mockResolvedValue({ error: null });
      UserService.createUser.mockResolvedValue(req.body);

      await userController.createUser(req, res);

      expect(helper.generateUserId).toHaveBeenCalled();
      expect(UserValidator.validateCreateUser).toHaveBeenCalledWith(
        new UserDTO(req.body)
      );
      expect(UserService.createUser).toHaveBeenCalledWith(
        new UserDTO(req.body)
      );
      expect(res.json).toHaveBeenCalledWith(new UserDTO(req.body));
    });

    it("should return 400 if user data is invalid", async () => {
      helper.generateUserId.mockResolvedValue("123");
      UserValidator.validateCreateUser.mockResolvedValue({
        error: "Invalid user data",
      });

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid request" });
    });

    it("should return 500 if an error occurs", async () => {
      helper.generateUserId.mockResolvedValue("123");
      UserValidator.validateCreateUser.mockResolvedValue({ error: null });
      UserService.createUser.mockRejectedValue(new Error("Database error"));

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error creating user" });
    });
  });

  describe("updateUser", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        params: { userId: "123" },
        body: { name: "John Doe" },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should update a user", async () => {
      UserValidator.validateId.mockResolvedValue({ error: null });
      UserValidator.validateUpdateUser.mockResolvedValue({ error: null });
      UserService.updateUser.mockResolvedValue(req.body);

      await userController.updateUser(req, res);

      expect(UserValidator.validateId).toHaveBeenCalledWith(req.params.userId);
      expect(UserValidator.validateUpdateUser).toHaveBeenCalledWith(
        new UserDTO(req.body)
      );
      expect(UserService.updateUser).toHaveBeenCalledWith(
        req.params.userId,
        new UserDTO(req.body)
      );
      expect(res.json).toHaveBeenCalledWith(new UserDTO(req.body));
    });

    it("should return 400 if user id is invalid", async () => {
      UserValidator.validateId.mockResolvedValue({ error: "Invalid user ID" });

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid user ID" });
    });

    it("should return 400 if user data is invalid", async () => {
      UserValidator.validateId.mockResolvedValue({ error: null });
      UserValidator.validateUpdateUser.mockResolvedValue({
        error: "Invalid user data",
      });

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid request" });
    });

    it("should return 500 if an error occurs", async () => {
      UserValidator.validateId.mockResolvedValue({ error: null });
      UserService.updateUser.mockRejectedValue(new Error("Database error"));

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error updating user" });
    });
  });

  describe("partialUpdateUser", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        params: { userId: "123" },
        body: { age: 30 },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should partially update a user", async () => {
      UserService.partialUpdateUser.mockResolvedValue(req.body);

      await userController.partialUpdateUser(req, res);

      expect(UserService.partialUpdateUser).toHaveBeenCalledWith(
        req.params.userId,
        req.body
      );
      expect(res.json).toHaveBeenCalledWith(new UserDTO(req.body));
    });

    it("should return 400 if update contains invalid fields", async () => {
      req.body = { invalidField: "invalid" };

      await userController.partialUpdateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Cannot update fields: invalidField",
      });
    });

    it("should return 500 if an error occurs", async () => {
      UserService.partialUpdateUser.mockRejectedValue(
        new Error("Database error")
      );

      await userController.partialUpdateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to update user" });
    });
  });

  describe("deleteUser", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        params: { userId: "123" },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("should delete a user", async () => {
      UserValidator.validateId.mockResolvedValue({ error: null });
      UserService.softDeleteUser.mockResolvedValue();

      await userController.deleteUser(req, res);

      expect(UserValidator.validateId).toHaveBeenCalledWith(req.params.userId);
      expect(UserService.softDeleteUser).toHaveBeenCalledWith(
        req.params.userId
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "User deleted successfully",
      });
    });

    it("should return 400 if user id is invalid", async () => {
      UserValidator.validateId.mockResolvedValue({ error: "Invalid user ID" });

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid user ID" });
    });

    it("should return 400 if an error occurs", async () => {
      UserValidator.validateId.mockResolvedValue({ error: null });
      UserService.softDeleteUser.mockRejectedValue(new Error("Database error"));

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Error deleting user" });
    });
  });
});
