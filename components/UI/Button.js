import React from "react";


export function Button({href,className, btnText, id, icon}){


    return(
        <a className={`btn ${className !== undefined ? className:" "}`} href={href} id={id}>{btnText}{icon !== undefined?icon:""}</a>
    )
}