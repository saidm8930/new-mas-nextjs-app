import { Close } from "@mui/icons-material";
import React from "react";

const AppModal = ({ show, onClose, title, subTitle, content, children }) => {
  return (
    <div className={`app-modal ${show && "active"}`}>
      <div className={`modal-content-container ${show && "show"}`}>
        <div className="modal-header">
          <div className="header-title-container">
            <label className="primary-text-color">{subTitle}</label>
            <h1>{title}</h1>
          </div>
          <Close onClick={onClose} className="icon" />
        </div>
        <div className="modal-body">{content}</div>
        <div className="modal-footer">{children}</div>
      </div>
    </div>
  );
};

const AppModalFooter = ({ children }) => {
  return <div className="">{children}</div>;
};

AppModal.Footer = AppModalFooter;

export default AppModal;
