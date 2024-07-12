import React from "react";
import { observer } from "mobx-react";
import { Button, Text } from "@fluentui/react-components";
import { useStores } from "../../../store";
import { AddCircleRegular } from "@fluentui/react-icons";

const T = {
  buttonAnonymizer: {
    ru: "Добавить",
    en: "Add",
  },
};

const Anonymizer = () => {
  const { menuStore, documentStore } = useStores();
  const { locale } = menuStore;

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
    <>
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
    </>
  );
};

export default observer(Anonymizer);
