import AppButton from "@/app/components/common/buttons/AppButton";
import { checkOptionList } from "@/app/data/options/checkOptions";
import { Check, Close } from "@mui/icons-material";
import React, { useState } from "react";

const AccountList = ({ list, selectedAccountList, setSelectedAccountList }) => {
  const [activeButton, setActiveButton] = useState(null);
  const selectAccount = (status, account) => {
    let newAccount = { ...account };
    let newSelectedAccountList =
      selectedAccountList !== null ? [...selectedAccountList] : [];

    if (
      newSelectedAccountList.length > 0 &&
      newSelectedAccountList.find(
        (selectedAccount) => selectedAccount.id === newAccount.id
      )
    ) {
      let index = newSelectedAccountList.findIndex(
        (selectedAccount) => selectedAccount.id === newAccount.id
      );

      if (status === "Balance") {
        newSelectedAccountList[index].check_balance = true;
      } else if (status === "Statement") {
        newSelectedAccountList[index].check_statement = true;
      }
    } else {
      if (status === "Balance") {
        newAccount.check_balance = true;
      } else if (status === "Statement") {
        newAccount.check_statement = true;
      }

      newSelectedAccountList.push(newAccount);
      setSelectedAccountList(newSelectedAccountList);
    }
    activeButton === status ? setActiveButton(null) : setActiveButton(status);
  };

  const isChecked = (id, status) => {
    if (
      selectedAccountList &&
      selectedAccountList.length > 0 &&
      status === "Balance" &&
      selectedAccountList.find(
        (acc) => acc.id === id && acc.check_balance === true
      )
    ) {
      return true;
    }

    if (
      selectedAccountList &&
      selectedAccountList.length > 0 &&
      status === "Statement" &&
      selectedAccountList.find(
        (acc) => acc.id === id && acc.check_statement === true
      )
    ) {
      return true;
    }

    return false;
  };

  console.log("new selected", selectedAccountList);

  const deselect = (id) => {
    if (selectedAccountList?.length > 0) {
      let index = selectedAccountList.findIndex(
        (selected_account) => selected_account.id === id
      );

      if (index > -1) {
        selectedAccountList.splice(index, 1);
        activeButton !== null ? setActiveButton(null) : setActiveButton(id);
      }
    }
  };

  return (
    <div>
      <div className="content-title">
        <label>Accounts</label>
      </div>
      <ul className="ul-border">
        {list?.map((account, index) => (
          <li
            className={`app-list flex-justify-between ${
              index % 2 !== 1 && "light-gold"
            }`}
            key={index}
          >
            <div className="flex-gap-10 flex-1">
              <div className="flex-1">
                <label>
                  <span className="font-bold">{index + 1}. </span>
                  {account.name}
                </label>
              </div>
              <div className="flex-2">
                <label>{account.number}</label>
              </div>
            </div>
            <div className="flex-gap-6">
              {checkOptionList?.map((option, index) => (
                <AppButton
                  key={index}
                  onClick={() => selectAccount(option.name, account)}
                  color={"white"}
                  label={option.name}
                  icon={
                    isChecked(account.id, option.name) && (
                      <Check fontSize="small" className="btn-icon" />
                    )
                  }
                />
              ))}
            </div>
            {selectedAccountList?.find(
              (selected_acc) => selected_acc.id === account.id
            ) && (
              <Close
                onClick={() => deselect(account.id)}
                fontSize="small"
                className="close-icon margin-left-6px"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
