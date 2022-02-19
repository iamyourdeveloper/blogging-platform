import NavItem from "./NavItem";
import { FaHome } from "react-icons/fa";
import { MdArticle, MdFavorite, MdInfo, MdSettings } from "react-icons/md";
const AsideNav = () => {
  return (
    <div className="aside">
      <NavItem
        className={"navMenuItem"}
        path={"/"}
        icon={<FaHome className={"asideIcon"} size={50} />}
        text={"Home"}
      />
      <NavItem
        className={"navMenuItem"}
        path={"/listings"}
        icon={<MdArticle className={"asideIcon"} size={50} />}
        text={"Listings"}
      />
      <NavItem
        className={"navMenuItem"}
        path={"/favorites"}
        icon={<MdFavorite className={"asideIcon"} size={50} />}
        text={"Favorites"}
      />
      <NavItem
        className={"navMenuItem"}
        path={"/about"}
        icon={<MdInfo className={"asideIcon"} size={50} />}
        text={"About"}
      />
      <NavItem
        className={"navMenuItem"}
        path={"/settings"}
        icon={<MdSettings className={"asideIcon"} size={50} />}
        text={"Settings"}
      />
    </div>
  );
};
export default AsideNav;