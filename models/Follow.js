import mongoose from 'mongoose';
// TODO --- combine into user schema?
// *** not yet implemented into api
// following_id id of user you are following
// follower_id your user id

const FollowSchema = new mongoose.Schema({
  following_id: {
    type: String
  },
  follower_id: {
    type: String
  }
});

module.exports = mongoose.model('Follow', FollowSchema);