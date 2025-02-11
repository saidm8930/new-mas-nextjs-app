import { ChevronLeft } from "@mui/icons-material";
import React, { useState } from "react";

const Dropdown = ({ type, list, item, setItem }) => {
  const [open, setOpen] = useState(false);

  const handleOnselect = (passedItem) => {
      setItem(passedItem)
      setOpen(false)
  }
  return (
    <div className="position-relative">
      <div onClick={() => setOpen(!open)} className={`${type === "button" && "app-button"}`}>
        <div className="flex-gap-2 padding-left-8px">
        <label>Categories</label>
        <ChevronLeft className="icon down-angle" />
        </div>
      </div>
      <div className={`list-container shadow ${open && "show"}`}>
        <ul>
          {list?.map((listItem, index) => (
            <li onClick={() => handleOnselect(listItem)} className={`dropdow-list-item ${item === listItem.name && "active"}`} key={index}>{listItem.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
