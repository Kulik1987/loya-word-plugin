import React from "react";
import { Outlet } from "react-router";
// import { Box, Container } from "@mui/material";
// import { HeaderMenu } from "../molecule";

const TemplateMain = () => (
  <div>
    <Outlet />
  </div>
);

export default TemplateMain;
