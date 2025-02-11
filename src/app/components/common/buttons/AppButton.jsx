import React from "react";

const AppButton = ({ icon, onClick, label, color }) => {
  return (
    <div color={color}  onClick={onClick} className="flex-gap-1 app-button position-relative">
      {icon && icon}
      <button>{label}</button>
    </div>
  );
};

export default AppButton;
