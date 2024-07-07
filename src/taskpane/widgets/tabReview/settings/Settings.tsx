import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Text } from "@fluentui/react-components";
import { useStores } from "../../../shared/store";
import { ReviewTypesEnums } from "../../../shared/enums/suggestion";
import { GeneralConfig } from "./generalConfig";
import { CustomConfig } from "./customConfig";
import { PlayBook } from "./playBook";
import { Anonymizer } from "./anonymizer";

const Settings = () => {
  const { documentStore, suggestionsStore } = useStores();

  const { reviewTypeActive } = suggestionsStore;

  const isGeneralStarted = reviewTypeActive === ReviewTypesEnums.GENERAL;
  const isCustomStarted = reviewTypeActive === ReviewTypesEnums.CUSTOM;

  const isDisplayGeneral = isGeneralStarted || reviewTypeActive === null;
  const isDisplayCustom = isCustomStarted || reviewTypeActive === null;

  const isDisplayCommonInfo = isDisplayGeneral && isDisplayCustom;

  useEffect(() => {
    documentStore.copyToStoreDocumentText();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {isDisplayCommonInfo && (
        <Text size={400} weight="bold">
          Выберите тип проверки
        </Text>
      )}
      {isDisplayGeneral && <GeneralConfig />}

      {isDisplayCustom && <CustomConfig />}

      {isDisplayCommonInfo && (
        <>
          <PlayBook />
          <Anonymizer />
        </>
      )}
    </div>
  );
};

export default observer(Settings);
