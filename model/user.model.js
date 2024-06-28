const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/workodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

// Schema
const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    deletedAt: {
       type: Date,
    required: false, 
    default: null
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

// export
const user = mongoose.model("User", UserSchema);
module.exports = user;
