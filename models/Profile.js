import mongoose from 'mongoose';
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  backgroundImage: {
    type: String
  },
  backgroundImageFilename: {
    type: String
  },
  themes: {
    type: [String]
  },
  // skills: {
  //   type: [String]
  // },
  social: {
    website: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    reddit: {
      type: String
    },
    github: {
      type: String
    }
  },
}, {timestamps: true});

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
export default Profile;
// module.exports = mongoose.model('Profile', ProfileSchema);
// updatedAt: {
//   type: String, 
//   default: Date.now()
// },
// createdAt: {
//   type: String, 
//   default: new Date().toISOString()
// }

// ####################################
// ####################################
  // *** MOVE TO PROFILES
  
  // check if arr - convert to string
  // if (Array.isArray(categoriesChk)) categoriesChk = categoriesChk.join(', ');
  // if (Array.isArray(tagsChk)) tagsChk = tagsChk.join(', ');
  // if (Array.isArray(themesChk)) themesChk = themesChk.join(', ');
  // let backgroundUrl = '';
  // let backgroundFilename = '';
  // console.log(typeof interestsToString + " " + interestsToString)
  // get the socials, set as object for normalize
  // const socials = {
  //   youtube, facebook, twitter, instagram, linkedin, twitch, pinterest, reddit
  // };
  
  // console.dir(socials);
  // convert normalized results into arr
  // convert object into arr, take values only, ignore keys, map, check if each value is an array, if so convert into a string for db storage
  // Array.isArray(categoriesChk) ? interestsToString = interestsChk.join(", ") : interestsToString = interestsChk;
  // *** if entered as array convert to string
  // Array.isArray(interests) ? interestsToString = interests.join(", ") : interestsToString = interests
  // console.log("socials data...");
  // console.dir(socials);
  // for (const [key, value] of Object.entries(socials)) {
  //   if (!value) {
  //     socials[key] = ''; // console.log(value);
  //   }
  // }
  // looks like mornalize package only converts data as objects...
  // for (const [key, value] of Object.entries(socials)) {
  //   if (value && value.length > 0) {
  //     socials[key] = normalize(value, { forceHttps: true });
  //     // console.log(value);
  //   }
  // }
  
  // const socialsArr = Object.values(socials);
  // [youtubeNorm, facebookNorm, twitterNorm, instagramNorm, linkedinNorm, twitchNorm, pinterestNorm, redditNorm] = socialsArr;
  // *** MOVE TO PROFILES
// ####################################

/*
const str1 = "1, two";
const str2 = "3, four, 5";
const str3 = "5, 6, 7, 8";
//const parentArr = [str1, str2, str3]
const parentArr = [str1]
/* Array.isArray(interestsChk) ? interestsToString = interestsChk.join(", ") : interestsToString = interestsChk; /
let answer = [];
let interestsArr;
console.log("before")
console.log(parentArr)
//parentArr.map(item => (
  //answer.push(interestsArr = interestsToArr.split(',').map(interest => '' + interest.trim());)
  //answer.push(Array.isArray(item) ? itemToString = item.join(", ") : itemToString = item)
  //console.log("after in loop")
  //console.log(item)
//))
if (typeof str1 === "string") {
  interestsArr = str1.split(',').map(interest => '' + interest.trim());
}
  console.log("after")
  console.log(interestsArr)
  /* console.log(parentArr) /
  /* console.log(answer) 
*/