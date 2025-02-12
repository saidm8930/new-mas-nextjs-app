"use client";

import AppModal from "@/app/components/common/modals/AppModal";
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useState, useRef } from "react";
import Dropdown from "@/app/components/common/dropdown/Dropdown";
import { categoryList } from "@/app/data/categories/categories";
import service from "@/services";
import { organizationList } from "@/app/data/organizations/organizationList";
import OrganizationList from "./components/list/OrganizationList";
import AccountList from "./components/list/AccountList";
import AppButton from "@/app/components/common/buttons/AppButton";
import SelectedAccountForm from "./components/forms/SelectedAccountForm";
import { savedSelectedAccounts } from "@/app/data/accounts/savedSelectedAccounts";
import PreviewForm from "./components/forms/PreviewForm";

const ProductPage = () => {
  const [category, setCategory] = useState(categoryList[0]);
  const [curOrganizationList, setCurOrganizationList] = useState(null);
  const [openOrganization, setOpenOrganization] = useState(null);
  const [selectedAccountList, setSelectedAccountList] = useState(null);
  const [currentToDisplay, setCurrentToDisplay] = useState("accounts");
  const [saved, setSaved] = useState(null);

  const contentRef = useRef(null);

  useEffect(() => {
    getOrganizationList();
  }, [category]);

  const handleOnClose = () => {
    setOpenOrganization(null);
    setSelectedAccountList(null);
    setCurrentToDisplay("accounts");
    savedSelectedAccounts.length = 0;
  };

  const onCurrentToDisplay = (display) => {
    setCurrentToDisplay(display);
  };

  const getOrganizationList = async () => {
    const request = {
      key: "category_id",
      value: category.id,
      list: organizationList,
    };

    const response = await service.getList(request);

    if (response) {
      setCurOrganizationList(response);
      console.log("response", response);
    }
  };

  const handlePrevious = () => {
    if (currentToDisplay === "selectedAccounts") {
      setCurrentToDisplay("accounts");
    } else if (currentToDisplay === "preview") {
      setCurrentToDisplay("selectedAccounts");
    }
  };

  const print = useReactToPrint({ contentRef });

  return (
    <>
      <div className="main-container">
        <div className="top-main">
          <div className="flex-gap-10">
            <label className="page-title">Organizations</label>
            <label className="">{category.name}</label>
          </div>
          <Dropdown
            type={"button"}
            list={categoryList}
            item={category}
            setItem={setCategory}
          />
        </div>
        <div className="main-body">
          <OrganizationList
            list={curOrganizationList}
            openItem={setOpenOrganization}
          />
        </div>
      </div>
      <AppModal
        show={openOrganization && true}
        onClose={handleOnClose}
        title={openOrganization?.name}
        subTitle={"Organization."}
        content={
          (currentToDisplay === "accounts" && (
            <AccountList
              selectedAccountList={selectedAccountList}
              setSelectedAccountList={setSelectedAccountList}
              list={openOrganization?.accountList}
            />
          )) ||
          (currentToDisplay === "selectedAccounts" && (
            <SelectedAccountForm
              list={selectedAccountList}
              setSaved={setSaved}
            />
          )) ||
          (currentToDisplay === "preview" && <PreviewForm ref={contentRef} />)
        }
      >
        <AppModal.Footer>
          <div className="flex-justify-right button-container">
            <AppButton onClick={handleOnClose} label={"Cancel"} />
            {currentToDisplay !== "accounts" && (
              <AppButton onClick={() => handlePrevious()} label={"Previous"} />
            )}
            {selectedAccountList?.length > 0 &&
              currentToDisplay === "accounts" && (
                <AppButton
                  onClick={() => onCurrentToDisplay("selectedAccounts")}
                  label={"Next"}
                />
              )}
            {selectedAccountList?.length > 0 &&
              selectedAccountList.length === savedSelectedAccounts.length &&
              currentToDisplay === "selectedAccounts" && (
                <AppButton
                  onClick={() => onCurrentToDisplay("preview")}
                  label={"Preview"}
                />
              )}
            {currentToDisplay === "preview" && (
              <AppButton
                onClick={print}
                label={"Save & Print"}
              />
            )}
          </div>
        </AppModal.Footer>
      </AppModal>
    </>
  );
};

export default ProductPage;
