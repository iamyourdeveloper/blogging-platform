import React from "react";
import Link from "next/link";

const NavItem = ({ className, path, icon, text, logout }) => {

  return (<>
    <h3 className={`${className}`} onClick={logout}>
      <Link passHref href={path}>
        <div className="navItemText">
          {icon !== undefined ? icon : ""} {text}
        </div>
      </Link>
    </h3>
  </>);
}
export default NavItem;