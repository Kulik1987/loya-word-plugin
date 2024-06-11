/* eslint-disable no-undef */
import React from "react";

const appVersion = process.env.appVersion;
const appBuildDate = process.env.appBuildDate;

const TemplateMain: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <div style={{ display: "flex", flexDirection: "column", padding: "24px" }}>{children}</div>
    <div style={{ display: "flex", padding: "12px", color: "#B7B7B7" }}>
      v.{appVersion} {appBuildDate}
    </div>
  </>
);

export default TemplateMain;
