import React from "react";
import NavItem from "./NavItem";

export default function NavMenu() {
  return (
    <ul className="navMenu">
      <NavItem className={"navMenuItem"} path={"/"} text={"Home"} />
      <NavItem className={"navMenuItem"} path={"/login"} text={"Login"} />
      <NavItem className={"navMenuItem"} path={"/about"} text={"About"} />
      <NavItem className={"navMenuItem"} path={"/profile"} text={"Profile"} />
      <NavItem className={"navMenuItem"} path={"/contact"} text={"Contact"} />
    </ul>
  );
}
