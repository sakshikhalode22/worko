const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

mongoose
  .connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
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
