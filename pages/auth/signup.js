import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import Router from 'next/router';
// import { setAlert } from '../../../redux/actions/alertActions';
// import { register } from '../../../redux/actions/authActions';
// import { useSelector, useDispatch } from "react-redux";

const SignUp = () => {
  // const dispatch = useDispatch();
  // const userAuth = useSelector(state => state.auth);
  // const { isAuthenticated, loading } = userAuth;
  const [error, setError] = useState('');
  const [formData, setFormData] = useState ({
    firstName: '', lastName: '', username: '', email: '', image_url: '', password: '', password2: ''
  });

  const [fileTypeError, setFileTypeError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [showImageData, isShowImageData] = useState(false);

  const { firstName, lastName, username, email, password, password2 } = formData; // image_url,

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    let fileToUpload = e.target.files[0];
    checkFileType(fileToUpload);
    checkFileSize(fileToUpload);

    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  const checkFileType = (img) => {
    const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    if (types.every(type => img.type !== type)) {
      return setFileTypeError(true);
    }
    return setFileTypeError(false);
  }

  const checkFileSize=(img)=>{
    let size = 3 * 1024 * 1024; // size limit 3mb
    if (img.size > size) {
      return setFileSizeError(true);
    }
    return setFileSizeError(false);
  }
  
  if (typeof window !== undefined && isAuthenticated) {
    Router.push("/")
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      dispatch(register(formData));
    }
  };

  return (
    <section>
      <div className="signin__card">
        <h2>Welcome</h2>
        <h3>This is the register page.</h3>
        <div className="">
          <form method="POST" action="/api/auth/signup">
            <div className="signin__group">
              <label className="signin__label" htmlFor="image_url">Avatar: </label>
              <input
                type="file"
                accept=".jpeg, .jpg, .png, .gif"
                placeholder=".jpeg, .jpg, .png, .gif formats only"
                name="image_url"
                onChange={handleImageChange}
                required
              />
              <div className="signin__group">
                <label className="signin__label" htmlFor="firstName">Firstname: </label>
                <div className="signin__input">
                  <input placeholder="Jose" type="text" value={firstName} name="firstName" onChange={e => onChange(e)} required/>
                </div>
              </div>
              <div className="signin__group">
                <label className="signin__label" htmlFor="lastName">Lastname: </label>
                <div className="signin__input">
                  <input placeholder="Codes" type="text" value={lastName} name="lastName" onChange={e => onChange(e)} required/>
                </div>
              </div>
              <div className="signin__group">
                <label className="signin__label" htmlFor="username">Username: </label>
                <div className="signin__input">
                  <input placeholder="Username" type="text" value={username} name="username" onChange={e => onChange(e)} required/>
                </div>
              </div>
              <div className="signin__group">
                <label className="signin__label" htmlFor="email">E-Mail: </label>
                <div className="signin__input">
                  <input placeholder="john@doe.com" type="email" value={email} name="email" onChange={e => onChange(e)} required/>
                </div>
              </div>
              <div className="signin__group">
                <label className="signin__label" htmlFor="password">Password: </label>
                <div className="signin__input">
                  <input type="password" value={password} name="password" onChange={e => onChange(e)} required/>
                </div>
              </div>
              <div className="signin__group">
                <label className="signin__label" htmlFor="password2">Password2: </label>
                <div className="signin__input">
                  <input type="password" value={password2} name="password2" onChange={e => onChange(e)} required/>
                </div>
              </div>
              <div className="form__footer">
                {fileTypeError || fileSizeError ? (
                  <div className="form__error">
                    File type or size limit exceeded: jpg, jpeg, png, gif only and size must be less than 3mb.
                  </div>
                ) : (
                  <>
                    {/* <button type="submit" onClick={e => registerHandler(e)}>Create new Account</button> */}
                  <input type="submit" className="btn btn-primary btn-full-width form__submit" value="Register" />
                  </>
                )}
                <p>
                  Already have an account?{" "}<Link to="/login"><span className="form form__link">Login.</span></Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div>
          <div>
            Already have an account? 
            <span><Link href="/auth/signin"><a>Sign In</a></Link></span>.
          </div>
        </div>
      </div>
    </section>
  )
}
export default SignUp;