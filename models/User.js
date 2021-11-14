import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  // user: {type: Schema.Types.ObjectId}, // auto created
  firstName: {
    type: String, 
    required: true
  },
  lastName: {
    type: String, 
    // required: true
  },
  username: {
    type: String, 
    required: true,
    unique: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  },
  avatarImage: {
    type: String
  },
  avatarImageFilename: {
    type: String
  },
  password: {
    type: String, 
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
// export default User = mongoose.model('User', UserSchema);
// module.exports = mongoose.model('User', UserSchema);