import React from "react";
// import { Outlet } from "react-router";
// import { Box, Container } from "@mui/material";
// import { HeaderMenu } from "../molecule";

const TemplateMain: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <div style={{ display: "flex", flexDirection: "column", padding: "24px" }}>{children}</div>
    <div>v.0.2.0</div>
  </>
);

export default TemplateMain;
