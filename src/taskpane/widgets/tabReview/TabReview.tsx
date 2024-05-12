import React from "react";
// import { Button } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { Summary } from "./summary";
import { Settings } from "./settings";
// import { Button } from "@fluentui/react-components";
import { useStores } from "../../shared/store";
// import { ReviewVariantsEnums } from "../../shared/store/menu";

const TabReview = () => {
  const { suggestionsStore } = useStores();

  // const handleClick = (name: MenuItemsEnums) => {
  //   menuStore.setMenuItem(name);
  // };
  const { reviewStarted } = suggestionsStore;

  const isDisplaySummary = reviewStarted !== null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Settings />
      {isDisplaySummary && <Summary />}
    </div>
  );
};

export default observer(TabReview);
