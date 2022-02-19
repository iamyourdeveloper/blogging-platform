import React from "react";



export default function GridItem({icon, height, children}){

    return(<>
        <div style={{height:height}} className={"gridItem"}>
            {icon}
            {children}
        </div>
    </>)
}