import React from "react";
import { Button, Text } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { useStores } from "../../shared/store";
import { MenuItemsEnums } from "../../shared/store/menu";
import { ArrowExitFilled } from "@fluentui/react-icons";

const HeaderMenu = () => {
  const { menuStore } = useStores();

  const handleClick = (name: MenuItemsEnums) => {
    menuStore.setMenuItem(name);
  };

  const isTabReview = menuStore.currentMenuItem === MenuItemsEnums.REVIEW;
  const isTabDraft = menuStore.currentMenuItem === MenuItemsEnums.DRAFT;

  const isButtonBackDisplay = menuStore.currentMenuItem !== null;
  const isButtonsTabDisplay = !isButtonBackDisplay;
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {isButtonBackDisplay && (
        <Button
          appearance="outline"
          size="large"
          onClick={() => handleClick(null)}
          style={{ borderColor: "#0f6cbd", borderWidth: "2px" }}
          icon={<ArrowExitFilled color="#0f6cbd" style={{ transform: "rotate(180deg)" }} />}
        />
      )}
      {isButtonsTabDisplay && (
        <>
          <Button appearance="primary" disabled={false} size="large" onClick={() => handleClick(MenuItemsEnums.DRAFT)}>
            Draft
          </Button>
          <Button appearance="primary" disabled={false} size="large" onClick={() => handleClick(MenuItemsEnums.REVIEW)}>
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
    </div>
  );
};

export default observer(HeaderMenu);
