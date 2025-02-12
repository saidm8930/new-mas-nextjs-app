import React from "react";

const BalanceReviewTaable = ({ list }) => {
  return (
    <table className="balance-preview-table">
      <thead className="">
        <tr>
          <th className="font-bold">S/N</th>
          <th className="font-bold">ACCOUNT NUMBER</th>
          <th className="font-bold">ACCOUNT NAME</th>
          <th className="font-bold">BALANCE</th>
        </tr>
      </thead>
      <tbody>
        {list?.map(
          (account, index) =>
            account.check_balance === true && (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{account.number}</td>
                <td>{account.name}</td>
                <td>300000</td>
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export default BalanceReviewTaable;
