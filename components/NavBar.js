import React, { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import NavItem from "./UI/NavItem";
import SearchBar from "./UI/SearchBar";
import { useAppContext } from '../context/Store';

const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const logoutHandler = async () => {
    console.log("logging out user")
    try {
      let res = await api.post("/auth/signout");
      
      console.log("logout res")
      console.log(res.data)
      dispatch({type: "LOGOUT"});
      // Cookies.remove("token");
      Cookies.remove("blog__userInfo");
      router.push("/");
    } catch (err) {
      toast.error(err);
    }
  };

  return (<>
    <nav className="nav">
      <Link passHref href="/">
        <h1 className="title navTitle">BinaryBlog</h1>
      </Link>
      <SearchBar />
      {state?.auth?.isAuthenticated ? (
        <>
        {/* <NavItem className={"navMenuItem"} path={"/"} text={"Home"} /> */}
        <NavItem className={"navMenuItem"} path={"/about"} text={"About"} />
        <NavItem
          className={"navMenuItem"}
          path={"/profile"}
          text={"Profile"}
        />
        {/* <NavItem
          className={"navMenuItem"}
          path={"/contact"}
          text={"Contact"}
        /> */}
        <NavItem className={"navMenuItem"} path={"/"} text={"Logout"} logout={logoutHandler}/>
        </>
      ) : (
        <>
        <NavItem className={"navMenuItem"} path={"/login"} text={"Login"} />
        </>
      )}
    </nav>
  </>);
}
export default Navbar;