import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../../../../shared/store";

import { AddCircleRegular } from "@fluentui/react-icons";
import { Button, Text } from "@fluentui/react-components";

const Anonymizer = () => {
  const { documentStore } = useStores();
  const { documentTextCleaned } = documentStore;

  const documentTextCleanedFormat = JSON.parse(documentTextCleaned);
  const handleClick = async () => {
    await Word.run(async (context) => {
      // Получаем активное тело документа
      const body = context.document.body;

      // Создаем новый Range в конце документа
      // Прокручиваем документ к концу
      const range = body.getRange("End");
      range.select();

      // Добавляем текст в конец документа
      body.insertText(documentTextCleanedFormat, Word.InsertLocation.end);

      await context.sync();
    }).catch((error) => {
      console.log("Error [handleShowInDocument]: " + error);
    });
  };
  return (
    <>
      <Text size={400} weight="bold">
        Anonymizer
      </Text>
      <div>
        <Button
          appearance="primary"
          size="medium"
          style={{ whiteSpace: "nowrap" }}
          icon={<AddCircleRegular />}
          onClick={handleClick}
        >
          Create anonymized text
        </Button>
      </div>
    </>
  );
};

export default observer(Anonymizer);