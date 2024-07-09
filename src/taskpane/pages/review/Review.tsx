import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Divider, Text } from "@fluentui/react-components";
import { useStores } from "../../shared/store";
import { ReviewTypesEnums } from "../../shared/enums/suggestion";
import { ReviewTypeGeneral } from "./reviewTypeGeneral";
import { ReviewTypeCustom } from "./reviewTypeCustom";
import { PlayBook } from "./playBook";

const Review = () => {
  const { documentStore, suggestionsStore, menuStore } = useStores();
  const { locale } = menuStore;

  const { reviewTypeActive } = suggestionsStore;

  const isGeneralStarted = reviewTypeActive === ReviewTypesEnums.GENERAL;
  const isCustomStarted = reviewTypeActive === ReviewTypesEnums.CUSTOM;

  const isDisplayGeneral = isGeneralStarted || reviewTypeActive === null;
  const isDisplayCustom = isCustomStarted || reviewTypeActive === null;

  const isDisplayCommonInfo = isDisplayGeneral && isDisplayCustom;

  useEffect(() => {
    documentStore.copyToStoreDocumentText();
  }, []);

  const T = {
    dividerSelectReviewType: {
      ru: "Выберите тип проверки",
      en: "Select a review",
    },
    dividerPlaybooks: {
      ru: "Плейбуки",
      en: "Playbooks",
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {isDisplayCommonInfo && (
          <Divider>
            <Text size={300}>{T.dividerSelectReviewType[locale]}</Text>
          </Divider>
        )}
        {isDisplayGeneral && <ReviewTypeGeneral />}
        {isDisplayCustom && <ReviewTypeCustom />}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {isDisplayCommonInfo && (
          <Divider>
            <Text size={300}>{T.dividerPlaybooks[locale]}</Text>
          </Divider>
        )}
        {isDisplayCommonInfo && <PlayBook />}
      </div>
    </div>
  );
};

export default observer(Review);
