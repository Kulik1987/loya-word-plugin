import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HeaderMenu } from "../../widgets";
import { useStores } from "../../shared/store";
import { RoutePathEnum } from "../../app/navigation/Navigation";

const appVersion = process.env.appVersion;
const appBuildDate = process.env.appBuildDate;

const LayerBase = () => {
  const { menuStore } = useStores();
  const { local } = menuStore;
  const location = useLocation();
  const { pathname } = location;

  const T = {
    draft: {
      ru: "Написание",
      en: "Draft",
    },
    review: {
      ru: "Проверка",
      en: "Review",
    },
    common: {
      ru: "Сперанский",
      en: "Speransky",
    },
  };

  const title = ((path) => {
    switch (path) {
      case RoutePathEnum.DRAFT:
        return T.draft[local];
      case RoutePathEnum.REVIEW:
        return T.review[local];
      default:
        return T.common[local];
    }
  })(pathname);

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
          gap: "12px",
        }}
      >
        <HeaderMenu title={title} />

        <div style={{ border: "1px solid rgba(0,0,0, 0.05)", flex: 1 }}>
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
