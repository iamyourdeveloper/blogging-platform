import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatarImage: {
    type: String
  },
  coverImage: {
    type: String
  },
  coverImageFilename: {
    type: String
  },
  title: {
    type: String, 
    required: true
  },
  text: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  tags: {
    type: [String]
  },
  themes: {
    type: [String]
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      avatarImage: {
        type: String
      },
      createdAt: {
        type: String, 
        default: Date().mow
      }
    }
  ],
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);

// updatedAt: {
//   type: String, 
//   default: Date.now()
// },
// createdAt: {
//   type: String, 
//   default: new Date().toISOString()
// }