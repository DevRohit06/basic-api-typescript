import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const userModal = mongoose.model("User", UserSchema);

export const getUsers = () => {
 return userModal.find();
};

export const getUserByEmail = (email: string) => {
  return userModal.findOne({ email });
};

export const getUserBySessionToken = (sessionToken: string) => {
  return userModal.findOne({ "authentication.sessionToken": sessionToken });
};

export const getUserBYId = (id: string) => {
  return userModal.findById(id);
};

export const createUser = async (values: Record<string, any>) => {
  return new userModal(values).save();
};

export const deleteUserById = (id: string) => {
  return userModal.findByIdAndDelete(id);
};
export const updateUserById = (id: string, values: Record<string, any>) => {
  return userModal.findByIdAndUpdate(id, values);
};

export const getUserByUsername = (username: string) => {
  return userModal.findOne({ username });
};
