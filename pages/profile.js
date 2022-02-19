import AsideNav from "components/UI/Aside";
import { Button } from "components/UI/Button";
import ProfileField from "components/UI/profile/profileField";
import Navbar from "../components/NavBar";
import Image from "next/image";
import PersonImage from "../img/blog2.jpg";
export default function Profile() {
  return (
    <div className="profile">
      <div className="container">
        <Navbar />
      </div>
      <div className="profileCenter">
        <AsideNav />
        <div className="container">
          <div className="profileCenterContent">
            <div className="userAvatar">
              <Image src={PersonImage} fill="layout" alt="userAvatar" />
            </div>
            <Button
              className={"btn--contained editProfileContent"}
              btnText={"Edit"}
            />
            <ProfileField label={"Username"} value={"duevars1"} />
            <ProfileField
              label={"Bio"}
              value={"Some bio text that discribes the user"}
            />
            <ProfileField
              label={"Hobbies"}
              value={"Some Hobby text that discribes the user's hobbies"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
