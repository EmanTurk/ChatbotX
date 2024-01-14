import mongoose from "mongoose";

// schema: name, description, category, age, date, location and image.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: [true, "This email is already in use"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  age: { type: Number },
  location: { type: String },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
