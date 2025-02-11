import Sidenav from "@/app/components/specific/Sidenav";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <div>
      <div className="top-sidebar">
        <div className="logo-wrapper flex-gap-10-align-center">
          <Image
            src={"/bot.png"}
            alt={"bot img"}
            width={25}
            height={25}
            className="logo"
          />
          <div>
          <label className="display-block mas">MAS</label>
          <label className="display-block bot ">Bank of Tanzania</label>
          </div>
        </div>
      </div>
      <div className="title-divider">
        <label>MANAGE</label>
      </div>
      <div>
        <div className="sidenav">
          <Sidenav />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
