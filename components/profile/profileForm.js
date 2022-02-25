import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { useAppContext } from 'context/Store';
import { FaUpload } from 'react-icons/fa';
import { toast } from "react-toastify";
import Image from "next/image";
import api from "@/utils/api";
import { createUpdateProfileForm } from '@/utils/formDataServices';
import { ControlGroup, ControlGroupFileUpload } from '../UI/FormControlGroup';

const ProfileForm = ({initProfile, setProfileForm}) => {
  console.log("Props")
  console.log(initProfile)
  const { state, dispatch } = useAppContext();
  const { auth, profile } = state;
  console.log("component profile state")
  console.log(profile)
  const [fileTypeError, setFileTypeError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: profile?.profileData.bio || "",
    location: profile?.profileData.location || "",
    image_url: profile?.profileData.backgroundImage || "",
    theme: profile?.profileData.themes || "",
    website: profile?.profileData?.social?.website || "",
    youtube: profile?.profileData?.social?.youtube || "",
    twitter: profile?.profileData?.social?.twitter || "",
    facebook: profile?.profileData?.social?.facebook || "",
    linkedin: profile?.profileData?.social?.linkedin || "",
    instagram: profile?.profileData?.social?.instagram || "",
    reddit: profile?.profileData?.social?.reddit || "",
    github: profile?.profileData?.social?.github || ""
  });

  const [uploading, setUploading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [showImageData, isShowImageData] = useState(false);

  const { bio, location, theme, website, youtube, facebook, twitter, linkedin, instagram, reddit, github } = profileData;

  useEffect(() => {
    setProfileData({
      bio: profile?.profileData.bio || "",
      location: profile?.profileData.location || "",
      image_url: profile?.profileData.image_url || "",
      theme: profile?.profileData.themes || "",
      website: profile?.profileData?.social?.website || "",
      youtube: profile?.profileData?.social?.youtube || "",
      twitter: profile?.profileData?.social?.twitter || "",
      facebook: profile?.profileData?.social?.facebook || "",
      linkedin: profile?.profileData?.social?.linkedin || "",
      instagram: profile?.profileData?.social?.instagram || "",
      reddit: profile?.profileData?.social?.reddit || "",
      github: profile?.profileData?.social?.github || ""
    })
  }, [state]);

  const onChangeProfile = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    let fileToUpload = e.target.files[0];
    checkFileType(fileToUpload);
    checkFileSize(fileToUpload);

    setProfileData({
      ...profileData,
      [e.target.name]: e.target.files[0],
    });
    // * set up image preview, if valid
    if (fileToUpload) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageData(reader.result)
        isShowImageData(true);
      });
      reader.readAsDataURL(fileToUpload);
    }
  };

  const checkFileType = (img) => {
    const types = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (types.every((type) => img.type !== type)) {
      return setFileTypeError(true);
    }
    return setFileTypeError(false);
  };

  const checkFileSize = (img) => {
    let size = 3 * 1024 * 1024; // size limit 3mb
    if (img.size > size) {
      return setFileSizeError(true);
    }
    return setFileSizeError(false);
  };

  const submitProfileInfo = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      console.log("submitting profile create")
      console.log(profileData)
      let servicedData = await createUpdateProfileForm(profileData);
      console.log("servicedData - profile create")
      console.log(servicedData)
      let res = await api.post("/user/profile-create", servicedData);
      console.log("profile create response")
      console.log(res.data.data)
      dispatch({type: "CREATE_PROFILE", payload: res.data.data.profile});
      setUploading(false);
      setProfileForm(false);
    } catch (err) {
      toast.error(err)
      setProfileForm(false);
    }
  };
  
  const submitProfileUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      console.log("submitting --- profile update")
      console.log(profileData)
      console.log("user id")
      console.log(auth.user._id)
      console.log("77777777777777777777777")
      let servicedData = await createUpdateProfileForm(profileData);
      console.log("servicedData - profile update")
      console.log(servicedData)
      let res = await api.put(`/user/edit/${auth.user._id}`, servicedData);
      console.log("profile update response")
      console.log(res.data.data)
      dispatch({type: "UPDATE_PROFILE", payload: res.data.data.profile});
      setUploading(false);
      setProfileForm(false);
    } catch (err) {
      toast.error(err);
      setProfileForm(false);
    }
  };
  {/* <Button
    // href={'/'}
    onClick={() => setUpdateForm(true)}
    className={"btn--contained editProfileContent"}
    btnText={"Edit"}
  /> */}

  return (
    <section className="">
      <div className="">
        <p>Edit user profile and background image can be added here.</p>
        <form className="profile" onSubmit={Object.keys(profile?.profileData).length === 0 ? submitProfileInfo : submitProfileUpdate}>
          <div className="profile__set 01">
            <ControlGroup
              name={"bio"}
              type={"text"}
              placeholder={"Bio"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={bio}
              required={false}
            />
            <ControlGroup
              name={"location"}
              type={"text"}
              placeholder={"Location"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={location}
              required={false}
            />
            <h4>Background Profile Image: </h4>
            {/* <ControlGroup
              name={"image_url"}
              type={"file"}
              placeholder={"background profile image"}
              id={"login-name"}
              className={"fui-user"}
              onChange={handleImageChange}
              // value={image_url}
            /> */}
            <ControlGroupFileUpload
              action={handleImageChange}
              icon={<FaUpload size={"25"} />}
            />
            {imageData && (
              <div className="admForm__show">
                <div className="btn btn-secondary" onClick={() => isShowImageData(true)}>Show Preview</div>
                <div className="btn btn-secondary" onClick={() => isShowImageData(false)}>Hide Preview</div>
              </div>
            )}
            {imageData && showImageData && (
              <div className="admForm__image create-form">
                <img className="admForm__img create-form" src={imageData} alt="Uploaded Product" />
              </div>
            )}
            {/* <ControlGroupFileUpload
              action={handleImageChange}
              icon={<FaUpload size={"25"} />}
            /> */}
            {/* 
            <div className="profile__group">
              <label htmlFor="" className="profile__label">Themes</label>
              <input type="text" className="profile__input" />
            </div> */}
          </div>
          <div className="profile__set 02">
            <h3>Socials: </h3>
            <ControlGroup
              name={"website"}
              type={"text"}
              placeholder={"mywebsite.com"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={website}
              required={false}
            />
            <ControlGroup
              name={"youtube"}
              type={"text"}
              placeholder={"youtube.com/me"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={youtube}
              required={false}
            />
            <ControlGroup
              name={"facebook"}
              type={"text"}
              placeholder={"facebook.com/me"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={facebook}
              required={false}
            />
            <ControlGroup
              name={"twitter"}
              type={"text"}
              placeholder={"twitter.com/me"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={twitter}
              required={false}
            />
            <ControlGroup
              name={"linkedin"}
              type={"text"}
              placeholder={"linkedin.com/me"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={linkedin}
              required={false}
            />
            <ControlGroup
              name={"instagram"}
              type={"text"}
              placeholder={"instagram.com/me"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={instagram}
              required={false}
            />
            <ControlGroup
              name={"reddit"}
              type={"text"}
              placeholder={"reddit.com/me"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={reddit}
              required={false}
            />
            <ControlGroup
              name={"github"}
              type={"text"}
              placeholder={"github.com/me"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChangeProfile}
              value={github}
              required={false}
            />
          </div>
          <div className="confirmForm__section">
            {fileTypeError || fileSizeError ? (
              <div className="confirmForm__error">
                File type or size limit exceeded: jpg, jpeg, png, gif only and size must be less than 3mb.
              </div>
            ) : uploading ? (
              <div className="confirmForm__submit-update">
                <input className="btn-full-width admForm__submit" value="Submitting Info..." readOnly/>
              </div>
            ) : (
              <div className="confirmForm__submit-update">
                <input type="submit" className="btn btn-primary btn-full-width" value="Submit" />
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
export default ProfileForm;