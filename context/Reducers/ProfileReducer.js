export const profileInitialState = {
  profileData: {},
  profileStats: null, // individual profile
  profilePosts: null,
  profiles: [],
  followingList: null,  // []
  followersList: null, // []
  loading: true,
  error: {}
};

export const ProfileReducer = (state = profileInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_PROFILES":
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case "GET_PROFILE":
      return {
        ...state,
        profile: {
          profileData: payload,
          loading: false
        }
      };
    case "CREATE_PROFILE":
      return {
        ...state,
        profile: {
          profileData: payload,
          loading: false
        }
        // profileData: payload.myUserData, // data.myUserData
        // profileStats: {
        //   profileDetails: payload.myProfileInfo, // data.myProfileInfo
        //   profileSocials: payload.mySocialsInfo, // data.mySocialsInfo
        //   followers: payload.profileFollowers,
        //   following: payload.profileFollowing
        // },
        // profilePosts: payload.profilePosts,
        // followingList: null,
        // followersList: null,
      }
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: {
          profileData: payload, // data.myUserData
          profileStats: {
            profileDetails: { ...state.profile.myProfileInfo }, // data.myProfileInfo
            profileSocials: { ...state.profile.mySocialsInfo }, // data.mySocialsInfo
            followers: { ...state.profile.profileFollowers },
            following: { ...state.profile.profileFollowing }
          },
          profilePosts: { ...state.profile.profilePosts },
          followingList: null,
          followersList: null,
          loading: false
        }
      }

    case "FOLLOW_PROFILE":
      return {
        ...state,
        profileStats: {
          profileDetails: {...state.profileStats.profileDetails},
          profileSocials: {...state.profileStats.profileSocials},
          followers: [...state.profileStats.followers, ...payload.followUser],
          following: [...state.profileStats.following]
        },
        loading: false
      }

    case "UNFOLLOW_PROFILE":
      return {
        ...state,
        profileStats: {
          profileDetails: {...state.profileStats.profileDetails},
          profileSocials: {...state.profileStats.profileSocials},
          followers: [...state.profileStats.followers.filter(follow => follow.follower_id !== payload.followUser)],
          following: [...state.profileStats.following]
        },
        loading: false
      }

    case "CLEAR_PROFILE":
      return {
        ...state,
        profileData: null,
        profileStats: null,
        profilePosts: null,
      };

    case "ACCOUNT_DELETED":
      return {
        ...state,
        profileData: null,
        profileStats: null,
        profilePosts: null,
        loading: false
      }

    case "PROFILE_ERROR":
      return {
        ...state,
        error: payload,
        loading: false
      };

    case "FOLLOWING_PROFILE_LIST": 
      return {
        ...state,
        followingList: payload.following,
        loading: false
      };

    case "FOLLOWERS_PROFILE_LIST":
      return {
        ...state,
        followersList: payload.followers,
        loading: false
      };

    default: return state;
  }
};