import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Divider, Text } from "@fluentui/react-components";
import { useStores } from "../../store";
import { ReviewTypesEnums } from "../../enums/suggestion";
import { ReviewTypeGeneral } from "./reviewTypeGeneral";
import { ReviewTypeCustom } from "./reviewTypeCustom";
import { PlayBook } from "./playBook";

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

const Review = () => {
  const { documentStore, suggestionsStore, menuStore } = useStores();
  const { locale } = menuStore;

  const { reviewTypeActive } = suggestionsStore;

  const isGeneralStarted = reviewTypeActive === ReviewTypesEnums.GENERAL;
  const isCustomStarted = reviewTypeActive === ReviewTypesEnums.CUSTOM;

  useEffect(() => {
    documentStore.copyToStoreDocumentText();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Divider alignContent="center" inset>
          <Text size={300} weight="medium">
            {T.dividerSelectReviewType[locale]}
          </Text>
        </Divider>
        <ReviewTypeGeneral />
        <ReviewTypeCustom />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Divider alignContent="center" inset>
          <Text size={300} weight="medium">
            {T.dividerPlaybooks[locale]}
          </Text>
        </Divider>
        <PlayBook />
      </div>
    </div>
  );
};

export default observer(Review);
