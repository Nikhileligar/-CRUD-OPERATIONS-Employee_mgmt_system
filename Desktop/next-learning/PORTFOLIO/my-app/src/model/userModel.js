import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    email: {
        type: String,
        require: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'password is required to login/signup']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
const User = mongoose.models.portUser || mongoose.model('portUser', userSchema);
export default User; 