import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "context/Store";
import api from "@/utils/api";
import { updateUserForm, createUpdateProfileForm } from "@/utils/formDataServices";
import AsideNav from "components/UI/Aside";
// import { Button } from "components/UI/Button";
import { ControlGroup, ControlGroupFileUpload } from '../../components/UI/FormControlGroup';
import ProfileField from "components/profile/profileField";
import Navbar from "../../components/NavBar";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios';
import ProfileHeader from "/components/profile/profileHeader";
import ProfileUserFrom from "/components/profile/profileUserForm";
import ProfileForm from "/components/profile/profileForm"
// import PersonImage from "../img/blog2.jpg";

/*
xport const ControlGroupThemes = () => {
  const [gender, setGender] = useState("");
  return(
    <div className="control-group-gender">
      <label htmlFor="male"></label>
      <input onClick={()=> setGender("male")} checked={gender ==="male"} className="genderInput" value="Male" name="gender" type="radio" id="male"/>
      <label htmlFor="female">Female</label>
      <input onClick={()=> setGender("female")} checked={gender === "female"} className="genderInput" value="Female" name="gender" type="radio" id="female"/>
      <label htmlFor="other">Other</label>
      <input onClick={()=> setGender("other")} checked={gender === "other" } className="genderInput" value="Other" name="gender" type="radio" id="other"/>
    </div>
  )
}
*/

/*
import { useRouter } from 'next/router';
function SomePage(props) {
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  }
}
export async function getServerSideProps(context) {
  // Database logic here
}
---------------------------------------------------
async function handleSubmit() {
  const userData = /* create an object from the form /
  const res = await fetch('/api/user', {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  // Check that our status code is in the 200s,
  // meaning the request was successful.
  if (res.status < 300) {
    refreshData();
  }
}
*/

// const Profile = ({profileData: initProfileData}) => {
const Profile = ({initProfile}) => {
  const { state, dispatch } = useAppContext();
  const { auth, profile } = state;
  const [userForm, setUserForm] = useState(false);
  const [profileForm, setProfileForm] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated && auth.user.role !== 'user') return router.push("/");
  }, []);

  useEffect(() => {
    if (Object.keys(profile.profileData).length === 0) {
      dispatch({type: "GET_PROFILE", payload: initProfile})
    }
  }, []);
  
  const updateUserHandler = () => {
    console.log("updating user")
    if (profileForm) setProfileForm(false);
    setUserForm(true);
    console.log("profileForm")
    console.log(profileForm)
  };
  
  const profileHandler = () => {
    console.log("profile handler")
    if (userForm) setUserForm(false);
    setProfileForm(true);
    console.log(profileForm)
  };

  const cancelHandler = () => {
    setProfileForm(false);
    setUserForm(false);
  };
  
  return (
    <div className="profile">
      <div className="container">
        <Navbar />
      </div>
      <div className="profileCenter">
        <AsideNav />
        <div className="container">
          <div className="profileCenterContent">
            <div className="userAvatar">
              {auth.user.avatarImage && (
                <Image
                  src={auth.user.avatarImage}
                  fill="layout"
                  alt="user avatar"
                  width={500}
                  height={250}
                  // layout="fill"
                />
              )}
            </div>
            <ProfileHeader />
            {/* {Object.keys(initProfile).length > 0 ? ( */}
            {userForm ? (
              <button className="btn btn--contained editProfileContent" onClick={cancelHandler}>Cancel</button>
            ) : (
              <button className="btn btn--contained editProfileContent" onClick={updateUserHandler}>Update User</button>
            )}
            {profileForm ? (
              <button className="btn btn--contained editProfileContent" onClick={cancelHandler}>Cancel</button>
            ) : Object.keys(state.profile.profileData).length === 0 && Object.keys(initProfile).length === 0 ? (
              <button className="btn btn--contained editProfileContent" onClick={profileHandler}>Create Profile</button>
            ) : (
              <button className="btn btn--contained editProfileContent" onClick={profileHandler}>Edit</button>
            )}
            {!profileForm && !userForm && (<>
              <ProfileField label={"Username"} value={auth.user.username} />
              {/* <ProfileField
                label={"Hobbies"}
                value={"Some Hobby text that discribes the user's hobbies"}
              /> */}
              <ProfileField
                label={"Location"}
                value={profile?.profileData.location || "Optional"}
              />
              <ProfileField
                label={"Bio"}
                value={profile?.profileData.bio || "No bio available."}
              />
            </>)}
            {userForm && (
              <ProfileUserFrom setUserForm={setUserForm} />
            )}
            {profileForm && (
              <ProfileForm initProfile={initProfile} setProfileForm={setProfileForm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
export const getServerSideProps = async (context) => {
  try {
    let token = context.req.cookies.blog__token;

    console.log("Token")
    console.log(token)
    const initProfileData = await axios({
      method: 'get',
      url: 'http://localhost:3000/api/user/my-profile',
      headers: context.req ? { cookie: context.req.headers.cookie } : undefined
    })
    console.log("initProfileData")
    console.log(initProfileData.data.data)
    return {
      // props: { profileData: initProfileData }
      props: { initProfile: initProfileData.data.data.profile }
    }
  } catch (err) {
    return {
      props: { initProfile: [] }
    }
  }
};