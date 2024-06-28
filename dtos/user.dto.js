class UserDTO {
    constructor(user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.age = user.age;
      this.city = user.city;
      this.zipCode = user.zipCode;
      this.password = user.password;
      this.deletedAt= user.deletedAt;
    }
  }
  
  module.exports = UserDTO;