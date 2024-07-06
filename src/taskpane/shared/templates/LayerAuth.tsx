/* eslint-disable no-undef */
import React from "react";
import { Outlet } from "react-router-dom";

const appVersion = process.env.appVersion;
const appBuildDate = process.env.appBuildDate;

const LayerBase = () => (
  <>
    <div style={{ display: "flex", flexDirection: "column", padding: "24px" }}>
      <Outlet />
    </div>
    <div style={{ display: "flex", padding: "12px", color: "#B7B7B7" }}>
      v.{appVersion} {appBuildDate}
    </div>
  </>
);

export default LayerBase;
