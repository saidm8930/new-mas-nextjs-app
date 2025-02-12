import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import AppButton from "@/app/components/common/buttons/AppButton";
import { savedSelectedAccounts } from "@/app/data/accounts/savedSelectedAccounts";

const SelectedAccountForm = ({ list, setSaved}) => {
  const [balanceDate, setBalanceDate] = useState(dayjs(new Date()));
  const [statementStartDate, setStatementStartDate] = useState(
    dayjs(new Date())
  );
  const [statementEndDate, setStatementEndDate] = useState(dayjs(new Date()));
  const [activeButton, setActiveButton] = useState(null);

  const onSave = (account) => {
    let newAccount = { ...account };

    if (newAccount.check_balance && true) {
      newAccount.balance_date = balanceDate;
    }

    if (newAccount.check_statement && true) {
      newAccount.statement_start_date = statementStartDate;
      newAccount.statement_end_date = statementEndDate;
    }

    savedSelectedAccounts.push(newAccount);
    if(activeButton !== null){
        setActiveButton(null)
        setSaved(null)
    }else{
        setActiveButton(account.id);
        setSaved(account.id)
    }

  };

  const deselect = (id) => {
    if(list?.length > 0){
        let index = list.findIndex((selected_account) => selected_account.id === id);

        if(index > -1){
            list.splice(index, 1)
            if(activeButton !== null){
                setActiveButton(null)
                setSaved(null)
            }else{
                setActiveButton(id);
                setSaved(id)
            }
        }

    }
  }

  console.log("saved accounts ", savedSelectedAccounts);

  const isSaved = (id) => {
    if (
      savedSelectedAccounts.length > 0 &&
      savedSelectedAccounts.find((saved_account) => saved_account.id === id)
    ) {
      return true;
    }

    return false;
  };

  const onEdit = (id) => {
    if (
      savedSelectedAccounts.length > 0 &&
      savedSelectedAccounts.find((saved_account) => saved_account.id === id)
    ) {
      let index = savedSelectedAccounts.findIndex(
        (saved_account) => saved_account.id === id
      );
      console.log("index", index);

      if (index > -1) {
        savedSelectedAccounts.splice(index, 1);
      }
      activeButton !== null ? setActiveButton(null) : setActiveButton(id);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div className="content-title">
          <label>Selected Account(s)</label>
        </div>
        <div className="ul-border">
          {list?.map((account, index) => (
            <div className="gray-card" key={index}>
              <div className="flex-gap-2">
                <div className="padding-20px flex-1">
                  <label className="display-block ">
                    <span className="font-bold">Account Name: </span>
                    {account.name}
                  </label>
                  <label className="display-block margin-top-8px ">
                    <span className="font-bold">Account Number: </span>{" "}
                    {account.number}
                  </label>
                </div>
                <div className="flex-gap-2 flex-3">
                  {account.check_balance === true && (
                    <div className="padding-20px flex-1">
                      <label className="display-block margin-bottom-12px">
                        Balance
                      </label>
                      <DatePicker
                        disabled={isSaved(account.id)}
                        label="Enter Date"
                        value={balanceDate}
                        onChange={(newValue) => setBalanceDate(newValue)}
                        slotProps={{ textField: { size: "small" } }}
                      />
                    </div>
                  )}

                  {account.check_statement === true && (
                    <div className="padding-20px flex-2">
                      <label className="display-block margin-bottom-12px">
                        Statement
                      </label>
                      <div className="flex-gap-6">
                        <DatePicker
                          disabled={isSaved(account.id)}
                          label="Start"
                          value={statementStartDate}
                          onChange={(newValue) =>
                            setStatementStartDate(newValue)
                          }
                          slotProps={{ textField: { size: "small" } }}
                        />
                        <div className="to">
                          <label>To</label>
                        </div>
                        <DatePicker
                          disabled={isSaved(account.id)}
                          label="End"
                          value={statementEndDate}
                          onChange={(newValue) => setStatementEndDate(newValue)}
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-justify-right padding-10px border-top ">
                {!isSaved(account.id) && (
                  <AppButton onClick={() => deselect(account.id)} color="white" label={"Remove"} />
                )}
                <AppButton
                  color="white"
                  label={isSaved(account.id) ? "Edit" : "Save"}
                  onClick={() =>
                    !isSaved(account.id) ? onSave(account) : onEdit(account.id)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default SelectedAccountForm;
