"use client";

import { ChevronLeft } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="header-wrapper">
      <ChevronLeft className="icon" />
      <div className="user flex-justify-right">
        <div className="flex-gap-10">
          <Image className="user-image" src={"/img.png"} alt="" width={20} height={20} />
          <label>User Admin</label>
        </div>
      </div>
    </div>
  );
};

export default Header;
