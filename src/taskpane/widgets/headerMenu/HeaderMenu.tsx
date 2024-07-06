import React from "react";
import { Button, Text, Tooltip } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { useStores } from "../../shared/store";
import { MenuItemsEnums } from "../../shared/store/menu";
import { ArrowExitFilled, ArrowExportLtrFilled } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

type HeaderMenuT = { title?: string };

const HeaderMenu = (props: HeaderMenuT) => {
  const { title } = props;
  const navigate = useNavigate();
  const { menuStore, suggestionsStore, authStore } = useStores();

  // const handleClick = (name: MenuItemsEnums) => {
  //   menuStore.setMenuItem(name);
  //   suggestionsStore.resetStore();
  // };

  const handleLogout = () => authStore.logout();
  const handleClickBack = () => navigate("/");

  const isTabReview = menuStore.currentMenuItem === MenuItemsEnums.REVIEW;
  const isTabDraft = menuStore.currentMenuItem === MenuItemsEnums.DRAFT;

  const isButtonBackDisplay = menuStore.currentMenuItem !== null;
  const isButtonsTabDisplay = !isButtonBackDisplay;

  return (
    <div style={{ display: "flex", gap: "8px", border: "1px solid red" }}>
      {/* {isButtonBackDisplay && ( */}
      <Tooltip content="Back" relationship="label">
        <Button
          appearance="transparent"
          size="large"
          onClick={handleClickBack}
          icon={<ArrowExitFilled style={{ transform: "rotate(180deg)", borderColor: "#0f6cbd", borderWidth: "2px" }} />}
        />
      </Tooltip>

      <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Text as="h1" weight="bold" size={400}>
          {title}
        </Text>
      </div>

      <Tooltip content="Logout" relationship="label">
        <Button
          appearance="transparent"
          size="large"
          onClick={handleLogout}
          // style={{ borderColor: "#0f6cbd", borderWidth: "2px" }}
          icon={<ArrowExportLtrFilled style={{ transform: "rotate(360deg)" }} />}
        />
      </Tooltip>
    </div>
  );
};

export default observer(HeaderMenu);
