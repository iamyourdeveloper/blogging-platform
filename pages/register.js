import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "../context/Store";
import api from "@/utils/api";
import Navbar from "../components/NavBar";
import {
  ControlGroup,
  ControlGroupGender,
  ControlGroupFileUpload,
} from "../components/UI/FormControlGroup";
import { Button } from "../components/UI/Button";
// import SearchBar from "../components/UI/SearchBar";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [error, setError] = useState("");
  const [fileTypeError, setFileTypeError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    image_url: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, username, email, password, password2 } = formData;

  useEffect(() => {
    console.log("state.auth.isAuthenticated");
    console.log(state.auth.isAuthenticated);
    if (state.auth.isAuthenticated) router.push('/');
  }, []);

  const onChange = (e) => {
    console.log("onchange - formData")
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    let fileToUpload = e.target.files[0];
    checkFileType(fileToUpload);
    checkFileSize(fileToUpload);

    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
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

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("formData")
    console.log(formData)
    if (password !== password2) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      let res = await api.post('/auth/signup', formData);
      console.log("res.data.data.user - register")
      console.log(res.data.data.user)
      
      console.log("dispatching")
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.data.user});

      router.push('/');
    } catch (err) {
      toast.error(err);
    }
  };

  return (<>
    <div className="container">
      <Navbar />
    </div>
    <div className="login-body">
      <div id="login-id" className="login">
        <div className="login-screen">
          <div className="log-sign">
            <div id="log-sign-top-id" className="log-sign-top">
              <Link
                passHref={true}
                href="/login"
                data-attr="login"
                id="log-head-id"
                className="log-head"
              >
                <h3 id="log-head-h3">Login</h3>
              </Link>
              <Link
                passHref={true}
                href="/register"
                data-attr="signUp"
                id="sign-head-id"
                className="sign-up-head"
              >
                <h3 id="sign-up-h3">Sign Up</h3>
              </Link>
            </div>
            <hr className="log-sign-hr" id="log-sign-hr-id" />
          </div>
          <div className="app-title register-title" id="reg-title-id">
            <h1>Register</h1>
          </div>
          <form
            // method="POST"
            onSubmit={submitHandler}
            className="registration"
            id="registration-id"
          >
            <ControlGroup
              name={"firstName"}
              type={"text"}
              placeholder={"First name"}
              id={"first-name"}
              className={"fui-user"}
              onChange={onChange}
              value={firstName}
              required={true}
            />
            <ControlGroup
              name={"lastName"}
              type={"text"}
              placeholder={"Last name"}
              id={"last-name"}
              className={"fui-user"}
              onChange={onChange}
              value={lastName}
              required={true}
            />
            <ControlGroup
              name={"username"}
              type={"text"}
              placeholder={"Username"}
              id={"user-name"}
              className={"fui-user"}
              onChange={onChange}
              value={username}
              required={true}
            />
            {/* <ControlGroupGender /> */}
            <ControlGroup
              name={"email"}
              type={"email"}
              placeholder={"Email Address"}
              id={"register-email"}
              className={"fui-user"}
              onChange={onChange}
              value={email}
              required={true}
            />
            <ControlGroup
              name={"password"}
              type={"password"}
              placeholder={"password"}
              id={"register-pass"}
              className={"fui-lock"}
              onChange={onChange}
              value={password}
              required={true}
            />
            <ControlGroup
              name={"password2"}
              type={"password"}
              placeholder={"Confirm password"}
              id={"confirm-register-pass"}
              className={"fui-lock"}
              onChange={onChange}
              value={password2}
              required={true}
            />
            <ControlGroupFileUpload
              action={handleImageChange}
              icon={<FaUpload size={"25"} />}
            />
            <button id="btn-reg" className="btn-primary btn-large btn-block" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </>);
}
export default Register;