import React from "react";
import { observer } from "mobx-react";
import { Fire24Regular } from "@fluentui/react-icons";
import { ReviewSettingPanel } from "../../../entities";
import { Button, Select } from "@fluentui/react-components";
import { useStores } from "../../../shared/store";
import { useNavigate } from "react-router-dom";

const GeneralConfig = () => {
  const { suggestionsStore } = useStores();
  const navigate = useNavigate();
  const { parties } = suggestionsStore;

  const isPartiesExist = Array.isArray(parties) && parties?.length > 0;

  const handleStartReviewGeneral = () => {
    navigate("/summary");
    // suggestionsStore.startReviewGeneral();
  };

  const handleChangeParty = (_event: React.SyntheticEvent, item: any) => {
    suggestionsStore.setFormPartySelected(item.value);
  };

  return (
    <ReviewSettingPanel title="General" icon={<Fire24Regular />} subtitle="Scan for obvious risks snd issues">
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
        <Select id="selectParty" disabled={!isPartiesExist} onChange={handleChangeParty}>
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
        disabled={!isPartiesExist}
      >
        Start review
      </Button>
    </ReviewSettingPanel>
  );
};

export default observer(GeneralConfig);
