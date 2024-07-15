import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderMenu } from "../widgets";

const LayerBase = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "auto",
          gap: "32px",
          backgroundColor: "#fff",
          overflowY: "scroll",
        }}
      >
        <HeaderMenu />

        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayerBase;
