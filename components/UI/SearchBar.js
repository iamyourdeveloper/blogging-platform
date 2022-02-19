import {useState} from "react"
import {BsSearch} from "react-icons/bs";
import {BsPlusCircle} from "react-icons/bs";

const SearchBar = () => {
  const [textValue, updateTextValue] = useState("");
  const updateText = (event) => {
    updateTextValue(event.target.value); 
  }

  return(
    <div className="searchBar">
      <BsSearch id="searchBarMagnifier" className="searchBarIcon" size={"15"}/>
      <input onChange={event => updateText(event)} className="searchBarTextInput" value={textValue} type="text" placeholder="What Are You Looking For ?" name="searchBar" id="seachBarInput" />
      <BsPlusCircle id="searchBarClose" className="searchBarIcon" size={"15"} />
    </div>
  )
}
export default SearchBar;