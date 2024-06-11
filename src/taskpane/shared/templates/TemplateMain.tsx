/* eslint-disable no-undef */
import React from "react";

const appVersion = process.env.appVersion;
const appBuildDate = process.env.appBuildDate;

const TemplateMain: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <div style={{ display: "flex", flexDirection: "column", padding: "24px" }}>{children}</div>
    <div>
      v.{appVersion} {appBuildDate}
    </div>
  </>
);

export default TemplateMain;
