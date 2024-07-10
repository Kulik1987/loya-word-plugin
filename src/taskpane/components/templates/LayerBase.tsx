import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderMenu } from "../widgets";

const appVersion = process.env.appVersion;
const appBuildDate = process.env.appBuildDate;

const LayerBase = () => {
  return (
    <>
      <div
        style={{
          // border: "2px solid green",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          gap: "32px",
          backgroundColor: "#fff",
        }}
      >
        <HeaderMenu />

        <div
          style={{
            // border: "1px solid rgba(0,0,0, 0.05)",
            flex: 1,
          }}
        >
          <Outlet />
        </div>

        <div style={{ display: "flex", paddingTop: "12px", color: "#B7B7B7" }}>
          v.{appVersion} {appBuildDate}
        </div>
      </div>
    </>
  );
};

export default LayerBase;
