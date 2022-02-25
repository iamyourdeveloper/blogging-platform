import React, {useState} from "react";

export const ControlGroup = ({type, placeholder, id, className, name, labelActive, onChange, value, required}) => {
//   const [controlData, configureControlData] = useState("");
  // const sendDataToState = (event) =>{
    // configureControlData(event.target.value);
  // }
  return(
    <div className="control-group">
      {/* <input type={type} name={name} value={controlData} onChange={event => sendDataToState(event)} className={`login-field ${className !== undefined ? className :""}`} placeholder={placeholder} id={id} required/> */}
      <input type={type} name={name} value={value} onChange={event => onChange(event)} className={`login-field ${className !== undefined ? className :""}`} placeholder={placeholder} id={id} required={required}/>
      <label htmlFor={id} className={`login-field-icon ${labelActive === undefined ? {display:"none"}: className}`}></label>
    </div>
  )
}

export const ControlGroupFileUpload = ({action,icon}) =>{
  return(<>
    <label className="control-group-upload signin__label" htmlFor="image_url">Avatar: 
      <input
        type="file"
        accept=".jpeg, .jpg, .png, .gif"
        placeholder=".jpeg, .jpg, .png, .gif formats only"
        name="image_url"
        onChange={action}
        // onChange={e => action(e)}
        // required // optional, default provided for avatar
      />
    </label>
  </>)
}

export const ControlGroupGender = () => {
  const [gender, setGender] = useState("");
  return(
    <div className="control-group-gender">
      <label htmlFor="male">Male</label>
      <input onClick={()=> setGender("male")} checked={gender ==="male"} className="genderInput" value="Male" name="gender" type="radio" id="male"/>
      <label htmlFor="female">Female</label>
      <input onClick={()=> setGender("female")} checked={gender === "female"} className="genderInput" value="Female" name="gender" type="radio" id="female"/>
      <label htmlFor="other">Other</label>
      <input onClick={()=> setGender("other")} checked={gender === "other" } className="genderInput" value="Other" name="gender" type="radio" id="other"/>
    </div>
  )
}

// export const ControlGroupThemes = () => {
//   const [gender, setGender] = useState("");
//   return(
//     <div className="control-group-gender">
//       <label htmlFor="male"></label>
//       <input onClick={()=> setGender("male")} checked={gender ==="male"} className="genderInput" value="Male" name="gender" type="radio" id="male"/>
//       <label htmlFor="female">Female</label>
//       <input onClick={()=> setGender("female")} checked={gender === "female"} className="genderInput" value="Female" name="gender" type="radio" id="female"/>
//       <label htmlFor="other">Other</label>
//       <input onClick={()=> setGender("other")} checked={gender === "other" } className="genderInput" value="Other" name="gender" type="radio" id="other"/>
//     </div>
//   )
// }