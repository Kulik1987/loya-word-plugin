import React from "react";
import { HeaderMenu } from "../../widgets";
import { Button, Skeleton, SkeletonItem, Text } from "@fluentui/react-components";
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
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {isProcessing && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Text as="h1" weight="bold" size={400}>
            Идет подготовка отчета...
          </Text>
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 3px 5px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Skeleton style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <div style={{ width: "50px" }}>
                <SkeletonItem size={40} shape="rectangle" />
              </div>
            </Skeleton>
          </div>
        </div>
      )}
      {/* {isDisplaySummary && <Summary />} */}
    </div>
  );
};

export default observer(Summary);
