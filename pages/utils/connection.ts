//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose";
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env;

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  // OUR TODO SCHEMA
  const TodoSchema = new mongoose.Schema({
    item: String,
    completed: Boolean,
  });

  // OUR TODO MODEL
  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

  const UserSchema = new mongoose.Schema({
    email: mongoose.SchemaTypes.Email,
    password: String,
  });

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  return { conn, Todo, User };
};
