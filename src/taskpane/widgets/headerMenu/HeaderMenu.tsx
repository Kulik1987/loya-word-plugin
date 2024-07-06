import React from "react";
import { Button, Text, Tooltip } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { useStores } from "../../shared/store";
import { MenuItemsEnums } from "../../shared/store/menu";
import {
  ArrowExitFilled,
  ArrowExportLtrFilled,
  ArrowResetFilled,
  DraftsRegular,
  SignOutRegular,
  TextBulletListSquareSearchRegular,
} from "@fluentui/react-icons";

const HeaderMenu = () => {
  const { menuStore, suggestionsStore, authStore } = useStores();

  const handleClick = (name: MenuItemsEnums) => {
    menuStore.setMenuItem(name);
    suggestionsStore.resetStore();
  };

  const handleLogout = () => authStore.logout();
  const isTabReview = menuStore.currentMenuItem === MenuItemsEnums.REVIEW;
  const isTabDraft = menuStore.currentMenuItem === MenuItemsEnums.DRAFT;

  const isButtonBackDisplay = menuStore.currentMenuItem !== null;
  const isButtonsTabDisplay = !isButtonBackDisplay;
  return (
    <div style={{ display: "flex", gap: "8px", border: "1px solid red" }}>
      {isButtonBackDisplay && (
        <Tooltip content="Back" relationship="label">
          <Button
            appearance="transparent"
            size="large"
            onClick={() => handleClick(null)}
            icon={
              <ArrowExitFilled style={{ transform: "rotate(180deg)", borderColor: "#0f6cbd", borderWidth: "2px" }} />
            }
          />
        </Tooltip>
      )}
      {isButtonsTabDisplay && (
        <>
          <Button
            appearance="primary"
            disabled
            size="large"
            onClick={() => handleClick(MenuItemsEnums.DRAFT)}
            icon={<DraftsRegular color="#fff" />}
          >
            Draft
          </Button>
          <Button
            appearance="primary"
            disabled={false}
            size="large"
            onClick={() => handleClick(MenuItemsEnums.REVIEW)}
            icon={<TextBulletListSquareSearchRegular color="#fff" />}
          >
            Review
          </Button>
        </>
      )}

      <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
        {isTabReview && (
          <Text as="h1" weight="bold" size={400}>
            Review
          </Text>
        )}
        {isTabDraft && (
          <Text as="h1" weight="bold" size={400}>
            Draft
          </Text>
        )}
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
