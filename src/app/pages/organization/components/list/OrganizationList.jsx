import { accountList } from "@/app/data/accounts/accountList";
import React, { useState } from "react";
import service from "@/services";

const OrganizationList = ({ list, openItem }) => {
  const getAccountList = async (id) => {
    const request = {
      key: "organization_id",
      value: id,
      list: accountList,
    };

    const response = await service.getList(request);

    if (response) {
      console.log("response", response);
    }

    return response;
  };

  const openOrganization = async (organization) => {
    const accoutnts = await getAccountList(organization.id);

    organization.accountList = accoutnts;

    openItem(organization);
  };

  return (
    <ul className="ul-border">
      {list?.map((item, index) => (
        <li
          onClick={() => openOrganization(item)}
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

export default OrganizationList;
