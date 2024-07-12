import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Divider, Text } from "@fluentui/react-components";
import { useStores } from "../../store";
import { ReviewTypeGeneral } from "./reviewTypeGeneral";
import { ReviewTypeCustom } from "./reviewTypeCustom";
import { PlayBook } from "./playBook";
import { AddCircleRegular } from "@fluentui/react-icons";

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
  const { menuStore, documentStore } = useStores();
  const { locale } = menuStore;

  useEffect(() => {
    console.log("navigate to [page review]");
  }, []);

  const handleAddAnonymizedText = async () => {
    documentStore.buildAnonymizedText();
    const { textContractAnonymized } = documentStore;
    if (typeof textContractAnonymized !== "string") return null;
    await Word.run(async (context) => {
      const body = context.document.body;
      // Создаем новый Range в конце документа для прокрутки к концу
      const range = body.getRange("End");
      range.select();
      // Добавляем текст в конец документа
      body.insertText(textContractAnonymized, Word.InsertLocation.end);

      await context.sync();
    }).catch((error) => {
      console.log("Error [handleAddAnonymizedText]: " + error);
    });
  };

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
        <Text size={300}>Опция добавляет в конец документа текст договора с удаленными персональными данными</Text>
        <div>
          <Button
            appearance="primary"
            size="medium"
            style={{ whiteSpace: "nowrap" }}
            icon={<AddCircleRegular />}
            onClick={handleAddAnonymizedText}
          >
            {T.buttonAnonymizer[locale]}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(Review);
