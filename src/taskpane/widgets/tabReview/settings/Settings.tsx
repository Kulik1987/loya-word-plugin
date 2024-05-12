import React from "react";
import { observer } from "mobx-react";
import { AddCircleRegular, Fire24Regular, Settings24Regular } from "@fluentui/react-icons";
import { ReviewVariantItem } from "../../../entities";
import { Text, Button, Field, Select, Textarea } from "@fluentui/react-components";
import { useStores } from "../../../shared/store";
import { ReviewVariantsEnums } from "../../../shared/store/menu";

const Settings = () => {
  const { menuStore } = useStores();

  const handleStartReview = (name: ReviewVariantsEnums) => {
    menuStore.setReviewStarted(name);
  };

  const { reviewStarted } = menuStore;

  const isGeneralStarted = reviewStarted === ReviewVariantsEnums.GENERAL;
  const isCustomStarted = reviewStarted === ReviewVariantsEnums.CUSTOM;

  const isDisplayGeneral = isGeneralStarted || reviewStarted === null;
  const isDisplayCustom = isCustomStarted || reviewStarted === null;

  const isDisplayCommonInfo = isDisplayGeneral && isDisplayCustom;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {isDisplayCommonInfo && (
        <Text size={400} weight="bold">
          Select a review
        </Text>
      )}
      {isDisplayGeneral && (
        <ReviewVariantItem title="General" icon={<Fire24Regular />} subtitle="Scan for obvious risks snd issues">
          <div>
            <label htmlFor="selectVerification">Select the type verification</label>
            <Select id="selectVerification">
              <option>Comments and Readlines</option>
              <option>Comments Only</option>
              <option>Redlines Only</option>
            </Select>
          </div>
          <div>
            <label htmlFor="selectParty">Select a party</label>
            <Select id="selectParty">
              <option>Арендодатель</option>
              <option>Арендатор</option>
            </Select>
          </div>
          <Button
            appearance="primary"
            size="medium"
            onClick={() => handleStartReview(ReviewVariantsEnums.GENERAL)}
            style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
          >
            Start review
          </Button>
        </ReviewVariantItem>
      )}

      {isDisplayCustom && (
        <ReviewVariantItem
          title="Custom"
          icon={<Settings24Regular color="grey" />}
          subtitle="Focus the review on any topic"
        >
          <Field label="Custom instructions">
            <Textarea placeholder="Enter a description of the condition..." rows={5} />
          </Field>
          <Button
            appearance="primary"
            size="medium"
            onClick={() => handleStartReview(ReviewVariantsEnums.CUSTOM)}
            style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
          >
            Start review
          </Button>
        </ReviewVariantItem>
      )}

      {isDisplayCommonInfo && (
        <>
          <Text size={400} weight="bold">
            Playbooks
          </Text>
          <div>
            <Button
              appearance="primary"
              size="medium"
              // onClick={handleStartReview}
              style={{ whiteSpace: "nowrap" }}
              icon={<AddCircleRegular />}
              disabled
            >
              New playbook
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default observer(Settings);
