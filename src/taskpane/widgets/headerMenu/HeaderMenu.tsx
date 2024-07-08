import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Text, Tooltip } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { useStores } from "../../shared/store";
import { ArrowExitFilled, ArrowExportLtrFilled } from "@fluentui/react-icons";
import { RoutePathEnum } from "../../app/navigation/Navigation";

const HeaderMenu = () => {
  const { menuStore } = useStores();
  const { locale } = menuStore;
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();
  const { authStore } = useStores();

  const isDisableGoBack = location.key === "default";

  const handleLogout = () => authStore.logout();

  const handleClickBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const T = {
    draft: {
      ru: "Написание",
      en: "Draft",
    },
    review: {
      ru: "Проверка",
      en: "Review",
    },
    default: {
      ru: "Сперанский",
      en: "Speransky",
    },
  };

  const title = ((path) => {
    switch (path) {
      case RoutePathEnum.DRAFT:
        return T.draft[locale];
      case RoutePathEnum.REVIEW:
        return T.review[locale];
      default:
        return T.default[locale];
    }
  })(pathname);

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Tooltip content="Back" relationship="label">
        <Button
          appearance="transparent"
          size="large"
          onClick={handleClickBack}
          disabled={isDisableGoBack}
          icon={<ArrowExitFilled style={{ transform: "rotate(180deg)", borderColor: "#0f6cbd", borderWidth: "2px" }} />}
        />
      </Tooltip>

      <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Text as="h1" weight="bold" size={400}>
          {title?.toLocaleUpperCase() ?? title}
        </Text>
      </div>

      <Tooltip content="Logout" relationship="label">
        <Button
          appearance="transparent"
          size="large"
          onClick={handleLogout}
          icon={<ArrowExportLtrFilled style={{ transform: "rotate(360deg)" }} />}
        />
      </Tooltip>
    </div>
  );
};

export default observer(HeaderMenu);
