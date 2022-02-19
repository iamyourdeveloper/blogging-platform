import React from "react";


export default function GridMain({children}){

    return(<>
        <div className={"grid"}>
            {children}
        </div>
    </>)
}