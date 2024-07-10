import React from "react";
import { observer } from "mobx-react";
import { Settings24Regular } from "@fluentui/react-icons";
import { ReviewSettingPanel } from "../../../../entities";
import { Button, Field, Select, Textarea } from "@fluentui/react-components";
import { useStores } from "../../../../shared/store";

const CustomConfig = () => {
  const { suggestionsStore } = useStores();

  const { parties, formCustomInstructions } = suggestionsStore;

  const isPartiesExist = Array.isArray(parties) && parties?.length > 0;

  const handleStartReviewCustom = () => {
    suggestionsStore.startReviewCustom();
  };

  const handleChangeParty = (_event: React.SyntheticEvent, item: any) => {
    suggestionsStore.setFormPartySelected(item.value);
  };

  const handleChangeCustomInstructions = (_event: React.SyntheticEvent, item: any) => {
    suggestionsStore.setFormCustomInstructions(item.value);
  };

  return (
    <ReviewSettingPanel
      title="Индивидуальная"
      icon={<Settings24Regular color="grey" />}
      subtitle="Добавьте любые свои инструкции"
    >
      <div>
        <label htmlFor="selectVerification">Выберите, что отображать</label>
        <Select id="selectVerification" disabled>
          <option>Примечания и правки</option>
          <option>Примечания</option>
          <option>Правки</option>
        </Select>
      </div>
      <div>
        <label htmlFor="selectParty">Выберите сторону договора</label>
        <Select id="selectParty" disabled={!isPartiesExist} onChange={handleChangeParty}>
          {isPartiesExist &&
            parties.map((part, index) => {
              return <option key={index}>{part}</option>;
            })}
        </Select>
      </div>
      <Field label="Пользовательские инструкции">
        <Textarea
          placeholder="Напишите конкретные требования или общие задачи проверки"
          rows={5}
          onChange={handleChangeCustomInstructions}
          defaultValue={formCustomInstructions ?? ""}
        />
      </Field>
      <Button
        appearance="primary"
        size="medium"
        onClick={handleStartReviewCustom}
        style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
        disabled={!isPartiesExist}
      >
        Начать проверку
      </Button>
    </ReviewSettingPanel>
  );
};

export default observer(CustomConfig);
