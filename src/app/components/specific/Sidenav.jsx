"use client";

import { sidenavList } from "@/app/data/nav/sidenavList";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Sidenav = () => {
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname)

  const navigate = (to) => {
    router.push(to);
  };

  return (
    <ul>
      {sidenavList?.map((listItem, index) => (
        <li
          className={`${pathname === listItem.path && "active"}`}
          onClick={() => navigate(listItem.path)}
          key={index}
        >
          <div className="flex-gap-10">
            {listItem.icon}
            <label>{listItem.title}</label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Sidenav;
