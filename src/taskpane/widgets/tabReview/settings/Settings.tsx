import React from "react";
import { observer } from "mobx-react";
import { Fire24Regular, Settings24Regular } from "@fluentui/react-icons";
import { ReviewVariantItem } from "../../../entities";

const Settings = () => {
  const handleStartReview = () => {
    console.log("start revie");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <ReviewVariantItem
        title="General"
        icon={<Fire24Regular />}
        subtitle="Scan for obvious risks snd issues"
        onClickButton={handleStartReview}
        buttonTitle="Start review"
      />

      <ReviewVariantItem
        title="Custom"
        icon={<Settings24Regular color="grey" />}
        subtitle="Scan for obvious risks and issues"
        onClickButton={handleStartReview}
        buttonTitle="Start review"
      />
    </div>
  );
};

export default observer(Settings);
