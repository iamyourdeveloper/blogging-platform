import React from "react";
import Navbar from "./NavBar";

export default function Footer(){


    return(
        <>
        <div className="footer">
            <div className="container">
                <div className="footerMain">
                    <Navbar />
                    <h2 className="copyRight">Copyright &copy; 2022. All Rights Reserved</h2>
                </div>
            </div>
        </div>
        </>
    )
}