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
    dividerSelectTypeReview: {
      ru: "Выберите тип проверки",
      en: "Select a review",
    },
    dividerPlaybooks: {
      ru: "Плейбуки",
      en: "Playbooks",
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {isDisplayCommonInfo && <Divider>{T.dividerSelectTypeReview[locale]}</Divider>}

      {isDisplayGeneral && <ReviewTypeGeneral />}
      {isDisplayCustom && <ReviewTypeCustom />}

      {isDisplayCommonInfo && <Divider>{T.dividerPlaybooks[locale]}</Divider>}
      {isDisplayCommonInfo && <PlayBook />}
    </div>
  );
};

export default observer(Review);
