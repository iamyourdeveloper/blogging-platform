import React, { useState } from "react";
import NavItem from "./UI/NavItem";
import SearchBar from "./UI/SearchBar";
import { useAppContext } from '../context/Store';

const Navbar = () => {
  const { state, dispatch } = useAppContext();
  const logoutHandler = () => {
    console.log("logging out user")
    dispatch({type: "LOGOUT"});
  };

  return (<>
    <nav className="nav">
      <h1 className="title navTitle">BinaryBlog</h1>
      <SearchBar />
      {state?.auth?.isAuthenticated ? (
        <>
        <NavItem className={"navMenuItem"} path={"/"} text={"Home"} />
        <NavItem className={"navMenuItem"} path={"/about"} text={"About"} />
        <NavItem
          className={"navMenuItem"}
          path={"/profile"}
          text={"Profile"}
        />
        <NavItem
          className={"navMenuItem"}
          path={"/contact"}
          text={"Contact"}
        />
        <NavItem className={"navMenuItem"} path={"/"} text={"Logout"} onClick={logoutHandler}/>
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