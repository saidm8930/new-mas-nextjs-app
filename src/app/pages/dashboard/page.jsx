import { Apartment, Groups, InventoryOutlined, ProductionQuantityLimits } from "@mui/icons-material";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="position-relative">
      <div className="top-dashboard ">
        <div className="card-sm flex-gap-10 top-card shadow">
          <Apartment className="icon" fontSize="large" />
          <div className="item">
            <h1>130</h1>
            <h2>Organizations</h2>
          </div>
        </div>
        <div className="card-sm flex-gap-10 top-card shadow">
          <Groups className="icon" fontSize="large" />
          <div className="item">
            <h1>2300</h1>
            <h2>Users</h2>
          </div>
        </div>
        <div className="card-sm flex-gap-10 top-card shadow">
          <ProductionQuantityLimits className="icon" fontSize="large" />
          <div className="item">
            <h1>130</h1>
            <h2>Accounts</h2>
          </div>
        </div>
      </div>
      <div className="bottom-dashboard"></div>
    </div>
  );
};

export default DashboardPage;
