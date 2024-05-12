import React from "react";
// import { Button } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { Summary } from "./summary";
import { Settings } from "./settings";
// import { Button } from "@fluentui/react-components";
import { useStores } from "../../shared/store";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
// import { ReviewTypesEnums } from "../../shared/store/menu";

const TabReview = () => {
  const { suggestionsStore } = useStores();

  // const handleClick = (name: MenuItemsEnums) => {
  //   menuStore.setMenuItem(name);
  // };
  const { reviewTypeActive, reviewCustomProcessing, reviewGeneralProcessing } = suggestionsStore;

  const isProcessing = reviewCustomProcessing || reviewGeneralProcessing;

  const isDisplaySummary = reviewTypeActive !== null && !isProcessing;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Settings />
      {isProcessing && (
        <Skeleton style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </Skeleton>
      )}
      {isDisplaySummary && <Summary />}
    </div>
  );
};

export default observer(TabReview);
