import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { useAppContext } from 'context/Store';
import { FaUpload } from 'react-icons/fa';
import { toast } from "react-toastify";
import Image from "next/image";
import api from "@/utils/api";
import axios from 'axios';
import { updateUserForm, createUpdateProfileForm } from '@/utils/formDataServices';
import { ControlGroup, ControlGroupFileUpload } from '../UI/FormControlGroup';
import ProfileField from './profileField';

const ProfileUserForm = ({setUserForm}) => {
  const { state, dispatch } = useAppContext();
  const { auth, profile } = state;
  const [fileTypeError, setFileTypeError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [userData, setUserData] = useState({
    firstName: auth.user.firstName || "",
    lastName: auth.user.lastName || "",
    username: auth.user.username || "",
    email: auth.user.email || "",
    image_url: ""
  });
  const [uploading, setUploading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [showImageData, isShowImageData] = useState(false);

  const { firstName, lastName, username, email } = userData;

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    let fileToUpload = e.target.files[0];
    checkFileType(fileToUpload);
    checkFileSize(fileToUpload);

    setUserData({
      ...userData,
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

  const submitUserUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      console.log("submitting - userData")
      console.log(userData)
      // userData = JSON.stringify(userData);s
      let servicedData = await updateUserForm(userData);
      console.log("servicedData -user update")
      console.log(servicedData)
      let res = await api.put("/user/edit", servicedData);
      console.log("user submit response")
      console.log(res.data.data)
      dispatch({ type: "UPDATE_USER_INFO", payload: res.data.data.updateUserInfo });
      setUploading(false);
      setUserForm(false);
    } catch (err) {
      toast.error(err);
      setUserForm(false);
    }
  };


  return (
    <section>
      <div className="">Edit user information. Avatar image can be added / changed here.
        <form className="profile" onSubmit={submitUserUpdate}>
          <div className="profile__set 01">
            <ControlGroup
              name={"firstName"}
              type={"text"}
              placeholder={"First Name"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChange}
              value={firstName}
              required={false}
            />
            <ControlGroup
              name={"lastName"}
              type={"text"}
              placeholder={"Last Name"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChange}
              value={lastName}
              required={false}
            />
            <ControlGroup
              name={"email"}
              type={"text"}
              placeholder={"myemail@email.com"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChange}
              value={email}
              required={false}
            />
            <ControlGroup
              name={"username"}
              type={"text"}
              placeholder={"username"}
              id={"login-name"}
              className={"fui-user"}
              onChange={onChange}
              value={username}
              required={false}
            />
          </div>
          <div className="profile__set 02">
            <h4>Avatar: </h4>
            {/* <ControlGroup
              name={"image_url"}
              type={"file"}
              placeholder={"avatar image"}
              id={"login-name"}
              className={"fui-user"}
              onChange={handleAvatarChange}
              // value={image_url}
            /> */}
            <ControlGroupFileUpload
              action={handleAvatarChange}
              icon={<FaUpload size={"25"} />}
            />
          </div>
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
export default ProfileUserForm;
              