import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Divider, Text } from "@fluentui/react-components";
import { useStores } from "../../store";
import { ReviewTypeGeneral } from "./reviewTypeGeneral";
import { ReviewTypeCustom } from "./reviewTypeCustom";
import { Anonymizer } from "./anonymizer";
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
  dividerAnonymizer: {
    ru: "Анонимайзер",
    en: "Anonymizer",
  },
  buttonAnonymizer: {
    ru: "Добавить",
    en: "Add",
  },
};

const Review = () => {
  const { menuStore } = useStores();
  const { locale } = menuStore;

  useEffect(() => {
    console.log("navigate to [page review]");
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

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Divider alignContent="center" inset>
          <Text size={300} weight="medium">
            {T.dividerAnonymizer[locale]}
          </Text>
        </Divider>
        <Anonymizer />
      </div>
    </div>
  );
};

export default observer(Review);
