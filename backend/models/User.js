import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User_info', userSchema);
export { User };