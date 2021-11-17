import React, { useState } from 'react';
import Link from "next/link";
import Router from 'next/router';
// import { login } from '../../../redux/actions/authActions';
// import { useSelector, useDispatch } from "react-redux";

const SignIn = () => {
  // const dispatch = useDispatch();
  // const userAuth = useSelector(state => state.auth);
  // const { isAuthenticated } = userAuth;
  const [error, setError] = useState('');
  const [formData, setFormData] = useState ({
    email: '', password: ''
  });
  
  if (typeof window !== undefined && isAuthenticated) {
    Router.push("/")
  };

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const signinHandler = async (e) => {
    e.preventDefault();
    // dispatch(login(formData));
    // dispatch(login({ email, password }));
  };

  return (
    <section>
      <div className="signin__card">
        <h2>Welcome, please sign in.</h2>
        <form onSubmit={signinHandler}>
          <div className="signin__group">
            <label htmlFor="email">E-Mail</label>
            <input className="signin__input" type="email" placeholder="john@doe.com" name="email" value={email} onChange={onChange} aria-required="true" required/>
            <label htmlFor="password">Password</label>
            <input className="signin__input" type="email" name="password" value={password} onChange={onChange} aria-required="true" required/>
            <button type="submit">
              Sign In
            </button>
          </div>
        </form>
        <div>
          <p>Do not have an account?</p> 
          <span><Link href="/auth/signup"><a>Sign Up</a></Link></span>.
        </div>
      </div>
    </section>
  )
}
export default SignIn;