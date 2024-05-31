import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { AddCircleRegular, Fire24Regular, Settings24Regular } from "@fluentui/react-icons";
import { ReviewVariantItem } from "../../../entities";
import { Text, Button, Field, Select, Textarea } from "@fluentui/react-components";
import { useStores } from "../../../shared/store";
import { ReviewTypesEnums } from "../../../shared/enums/suggestion";

const Settings = () => {
  const { documentStore, suggestionsStore } = useStores();

  const { parties } = suggestionsStore;
  console.log("parties", parties);

  const isPartiesExist = Array.isArray(parties) && parties?.length > 0;

  const handleStartReviewGeneral = () => {
    suggestionsStore.startReviewGeneral();
  };

  const handleStartReviewCustom = () => {
    suggestionsStore.startReviewCustom();
  };

  const { reviewTypeActive } = suggestionsStore;

  const isGeneralStarted = reviewTypeActive === ReviewTypesEnums.GENERAL;
  const isCustomStarted = reviewTypeActive === ReviewTypesEnums.CUSTOM;

  const isDisplayGeneral = isGeneralStarted || reviewTypeActive === null;
  const isDisplayCustom = isCustomStarted || reviewTypeActive === null;

  const isDisplayCommonInfo = isDisplayGeneral && isDisplayCustom;

  useEffect(() => {
    documentStore.copyToStoreDocumentText();
  }, []);

  const onChange = (event: React.SyntheticEvent, item: any) => {
    console.log(event, item);
    suggestionsStore.setPartySelected(item.value);
  };

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
            <Select id="selectParty" disabled={!isPartiesExist} onChange={onChange}>
              {isPartiesExist &&
                parties.map((part, index) => {
                  return <option key={index}>{part}</option>;
                })}
            </Select>
          </div>
          <Button
            appearance="primary"
            size="medium"
            onClick={handleStartReviewGeneral}
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
            <Select id="selectParty" disabled={!isPartiesExist}>
              {isPartiesExist &&
                parties.map((part, index) => {
                  return <option key={index}>{part}</option>;
                })}
            </Select>
          </div>
          <Field label="Custom instructions">
            <Textarea placeholder="Enter a description of the condition..." rows={5} />
          </Field>
          <Button
            appearance="primary"
            size="medium"
            onClick={handleStartReviewCustom}
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
