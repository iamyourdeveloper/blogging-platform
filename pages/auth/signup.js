import React, { useState } from 'react';
// import { useSession, getSession, getProviders, providers, signIn, getCsrfToken } from "next-auth/client";
import { useSession, getSession, getProviders, providers, signIn, getCsrfToken } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Router from 'next/router';

// const SignUp = ({providers}) => {
const SignUp = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState('');
  // const [session, loading] = useSession();
  const [formData, setFormData] = useState ({
    firstName: '', lastName: '', username: '', email: '', image_url: '', password: '', password2: ''
  });

  const [fileTypeError, setFileTypeError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [showImageData, isShowImageData] = useState(false);

  const { firstName, lastName, username, email, image_url, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    // check file type
    let fileToUpload = e.target.files[0];
    checkFileType(fileToUpload);
    // check file size
    checkFileSize(fileToUpload);
    // setImage(e.target.files[0]);

    setFormProductData({
      ...formProductData,
      [e.target.name]: e.target.files[0]
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

  // check file type
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


  // if (status === "authenticated") {
  //   return <p>Signed in as {session.username}</p>
  // redirect to "/"
  // }
  // Error: Error serializing `.csrfToken` returned from `getServerSideProps` in "/auth/signin".
  // Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
  if (typeof window !== undefined && session) {
    Router.push("/")
  };

  const registerHandler = (e) => {
    e.preventDefault(e);
    // signIn(formData, {formData: 'sample string'});
    // signIn('custom', {formData}).then(res => {
    //   if (res.error) {
    //     setError(true);
    //   } else {
    //     Router.push('/');
    //     setError(false);
    //   }
    // });
    // signIn();
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
              {imageData && (
                <div className="admForm__show">
                  <div className="btn btn-secondary" onClick={() => isShowImageData(true)}>Show Preview</div>
                  <div className="btn btn-secondary" onClick={() => isShowImageData(false)}>Hide Preview</div>
                </div>
                )}
                {imageData && showImageData && (
                  <div className="admForm__image create-form">
                    <Image className="admForm__img create-form" src={imageData} alt="Uploaded Product" />
                  </div>
                )}
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
              <button type="submit" onClick={e => registerHandler(e)}>Create new Account</button>
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
// export async function getInitialProps(context) {
//   return {
//     providers: await providers(context)
//   }
// }