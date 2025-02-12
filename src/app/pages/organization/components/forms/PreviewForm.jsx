import { checkOptionList } from "@/app/data/options/checkOptions";
import Image from "next/image";
import React, { useState } from "react";
import BalanceReviewTaable from "../table/BalanceReviewTaable";
import { savedSelectedAccounts } from "@/app/data/accounts/savedSelectedAccounts";

const PreviewForm = ({ref}) => {
  const [activeTab, setActiveTab] = useState(0);
  const today = new Date();
  const date = JSON.stringify(today).substring(1, 11);

  return (
    <div>
      <div className="content-title">
        <div className="flex-gap-6">
          {checkOptionList?.map((option, index) => (
            <div
              onClick={() => setActiveTab(index)}
              className={`tab-button ${index === activeTab && "active"}`}
              key={index}
            >
              {option.name}
            </div>
          ))}
        </div>
      </div>
      <div ref={ref}>
        <div className="top-preview">
          <div className="preview-header">
            <div>
              <Image
                src={"/coat-of-arm.png"}
                width={100}
                height={100}
                alt="no image"
              />
            </div>
            <div className="header-title flex-col-gap-6">
              <label className="font-bold font-size-16px">
                UNITED REPUBLIC OF TANZANIA
              </label>
              <label className="font-bold font-size-20px">
                {" "}
                BANK OF TANZANIA
              </label>
            </div>
            <div>
              <Image src={"/bot.png"} width={100} height={120} alt="no image" />
            </div>
          </div>
          <div className="padding-horizontal-20px">
            <i>In reply please quote:</i>
          </div>
          <div className="flex-justify-between-start padding-20px">
            <div className="bot-address">
              <div className="bot-address-code">
                <div className="flex-col-start-gap-6">
                  <label>
                    <span className="font-bold">Ref. No.</span> 1234567
                  </label>
                  <label>Head of the Institution</label>
                  <label>Addressee Institution</label>
                  <label>Postal Address</label>
                  <label>Street Address</label>
                  <label>Postal Code</label>
                  <label className="font-bold">City, Country</label>
                  <label>Primary Email, Alternative Email</label>
                </div>
                <div className="flex-col-start-gap-6">
                  <label>
                    <span className="font-bold">Attn: </span> Adressee_Name1
                  </label>
                  <label>Adressee_Name2</label>
                </div>
              </div>
            </div>
            <div>
              <label className="date font-bold" htmlFor="">
                {date}
              </label>
            </div>
          </div>
        </div>
        {activeTab === 0 && (
          <div>
            <div className="text-center font-size-16px">
              <label className="font-bold ">
                RE: BANK BALANCE CERTIFICATE AS AT<span> {date} </span>
              </label>
            </div>
            <div className="padding-20px">
              <p>
                <span>1. </span>Reference is made to Letter with reference
                number
                <b> Letter_Reference_No </b> dated <b>Request_Letter_Date</b>{" "}
                regarding the request for certificate of balance as of{" "}
                <b>Balance_Date</b>.
              </p>
            </div>
            <div className="padding-20px">
              <p>
                <span>2. </span>The Bank wishes to confirm that the position of
                account balance for <b>Account_Operator_Name</b> maintained with
                the Bank of Tanzania as at close of business on{" "}
                <b>Balance_Date</b> was as follows: -
              </p>
            </div>
            <div className="padding-horizontal-20px">
              <BalanceReviewTaable list={savedSelectedAccounts} />
            </div>
            <div className="padding-20px">
              <div className="padding-20px">
                <label>Kindly be guided.</label>
              </div>
              <div className="sincerely">
                <label className="padding-vertical-10px">
                  Yours Sincerely,
                </label>
                <label className="font-bold font-16px">BANK OF TANZANIA</label>
              </div>
              <div className="signature">
                <div className="flex-justify-between">
                  <label>Digital Signature A</label>
                  <label>Digital Signature B</label>
                </div>
                <div className="margin-top-20px flex-justify-between">
                  <label>Signatory A Names</label>
                  <label>Signatory B Names</label>
                </div>
              </div>
              <div className="department">
                <label>Customer Accounts Service Department</label>
                <label className="font-bold font-16px margin-top-8px">
                  DIRECTORATE OF BANKING
                </label>
              </div>
            </div>
          </div>
        )}
        {activeTab === 1 && <div>Statement</div>}
      </div>
    </div>
  );
};

export default PreviewForm;
