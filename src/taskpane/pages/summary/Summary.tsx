import React from "react";
import { HeaderMenu } from "../../widgets";
import { Button, Skeleton, SkeletonItem } from "@fluentui/react-components";
// import { useStores } from "../../shared/store";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { DraftsRegular, TextBulletListSquareSearchRegular } from "@fluentui/react-icons";

const Summary = () => {
  // const { menuStore } = useStores();
  const navigate = useNavigate();

  const handleNavigateToDraft = () => navigate("/draft");
  const handleNavigateToReview = () => navigate("/review");

  const isProcessing = true;
  const isDisplaySummary = true;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {isProcessing && (
        <Skeleton style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </Skeleton>
      )}
      {/* {isDisplaySummary && <Summary />} */}
    </div>
  );
};

export default observer(Summary);
