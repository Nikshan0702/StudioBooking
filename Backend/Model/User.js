import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    password: String,
    cpassword: String,
    mobile: String
});



const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
