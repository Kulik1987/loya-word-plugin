import React from "react";
import { observer } from "mobx-react";
import { Fire24Regular } from "@fluentui/react-icons";
import { ReviewSettingPanel } from "../../../../entities";
import { Button, Select } from "@fluentui/react-components";
import { useStores } from "../../../../shared/store";

const GeneralConfig = () => {
  const { suggestionsStore } = useStores();

  const { parties } = suggestionsStore;

  const isPartiesExist = Array.isArray(parties) && parties?.length > 0;

  const handleStartReviewGeneral = () => {
    suggestionsStore.startReviewGeneral();
  };

  const handleChangeParty = (_event: React.SyntheticEvent, item: any) => {
    suggestionsStore.setFormPartySelected(item.value);
  };

  return (
    <ReviewSettingPanel
      // title="General"
      title="Общая"
      // subtitle="Scan for obvious risks and issues"
      subtitle="Анализ на базовые риски и спорные пункты"
      icon={<Fire24Regular />}
    >
      <div>
        {/* <label htmlFor="selectVerification">Select the type verification</label> */}
        <label htmlFor="selectVerification">Выберите, что отображать</label>
        <Select id="selectVerification" disabled>
          {/* <option>Comments and Readlines</option> */}
          <option>Примечания и правки</option>
          {/* <option>Comments Only</option> */}
          <option>Примечания</option>
          {/* <option>Redlines Only</option> */}
          <option>Правки</option>
        </Select>
      </div>
      <div>
        {/* <label htmlFor="selectParty">Select a party</label> */}
        <label htmlFor="selectParty">Выберите сторону договора</label>
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
        {/* Start review */}
        Начать проверку
      </Button>
    </ReviewSettingPanel>
  );
};

export default observer(GeneralConfig);
