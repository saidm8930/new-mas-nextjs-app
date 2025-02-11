import React from "react";

const MainList = ({ list, openItem }) => {
  return (
    <ul className="ul-border">
      {list?.map((item, index) => (
        <li
          onClick={() => openItem(item)}
          className={`app-list ${index % 2 !== 1 && "light-gold"}`}
          key={index}
        >
          <div className="flex-gap-10">
            <div className="flex-1">
              <label>
                <span className="font-bold">{index + 1}. </span>
                {item.name}
              </label>
            </div>
            <div className="flex-3">
              <label>
                <span className="font-bold">5 </span>accounts
              </label>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MainList;
