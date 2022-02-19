import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "context/Store";
import { toast } from "react-toastify";
import Navbar from "../components/NavBar";
import { ControlGroup, ControlGroupGender } from "../components/UI/FormControlGroup";
import {Button} from "../components/UI/Button";
import api from "@/utils/api";
// import SearchBar from "../components/UI/SearchBar";

const Login = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  // const dispatch = useDispatch();
  // const userAuth = useSelector(state => state.auth);
  // const { isAuthenticated } = userAuth;
  const [error, setError] = useState('');
  const [formData, setFormData] = useState ({
    email: '', password: ''
  });
  
  useEffect(() => {
    console.log("state.auth.isAuthenticated");
    console.log(state.auth.isAuthenticated);
    if (state.auth.isAuthenticated) router.push('/');
  }, []);
  // if (typeof window !== undefined && isAuthenticated) {
  //   Router.push("/")
  // };

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const signinHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await api.post('/auth/signin', formData);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data.user });
      router.push('/');
    } catch (err) {
      toast.error(err);
    }
  };

  return(<>  
    <div className="container">
      <Navbar />
    </div>
    <div className="login-body">
      <div id="login-id" className="login">
        <div className="login-screen">
          <div className="log-sign">
            <div id="log-sign-top-id" className="log-sign-top">
              <Link passHref={true} href="/login" data-attr="login" id="log-head-id" className="log-head">
              <h3 id="log-head-h3">Login</h3>
            </Link>
            <Link passHref={true} href="/register" data-attr="signUp" id="sign-head-id" className="sign-up-head">
              <h3 id="sign-up-h3">Sign Up</h3>
            </Link>
            </div>
          <hr className="log-sign-hr" id="log-sign-hr-id" />
        </div>
        <div  className="app-title login-title" id="login-title-id">
          <h1>Login</h1>
        </div>
        <form onSubmit={signinHandler} className="login-form" id="login-form-id">
          <ControlGroup
            name={"email"}
            type={"email"}
            placeholder={"email"}
            id={"login-name"}
            className={"fui-user"}
            onChange={onChange}
            value={email}
          />
          <ControlGroup
            name={"password"}
            type={"password"}
            placeholder={"password"}
            id={"login-pass"}
            className={"fui-lock"}
            onChange={onChange}
            value={password}
          />
          <button id="btn-reg" className="btn-primary btn-large btn-block" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  </div>
  </>)
}
export default Login;