import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { DraftsRegular, TextBulletListSquareSearchRegular } from "@fluentui/react-icons";
import { Button, Divider, Text } from "@fluentui/react-components";
import { SelectionLang, SelectionModelAi } from "../../components/widgets";
import { useStores } from "../../store";

const T = {
  actionsLabel: {
    ru: "Выберите действие",
    en: "Select an action",
  },
  btnDraft: {
    ru: "Написание",
    en: "Draft",
  },
  btnReview: {
    ru: "Проверка",
    en: "Review",
  },
  dividerLang: {
    ru: "Язык интерфейса",
    en: "Interface language",
  },
};

const Main = () => {
  const { menuStore, documentStore } = useStores();
  const { locale } = menuStore;
  const navigate = useNavigate();

  const handleNavigateToDraft = () => navigate("./draft");
  const handleNavigateToReview = async () => navigate("./review");

  useEffect(() => {
    if (documentStore.textContractSource === null) {
      //TODO Тут надо решить в какой момент:
      //TODO - обновлять контракт в сторе
      //TODO - повторно запрашивать Стороны
      // а пока контракт обновляется единожды при старте приложения
      documentStore.copyTextContractToStore();
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex", gap: "32px", flexDirection: "column", flexWrap: "wrap" }}>
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.02)",
            borderRadius: "8px",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 0px 7px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Divider alignContent="center" inset style={{ paddingBottom: "6px" }}>
            <Text size={300} weight="medium">
              {T.actionsLabel[locale]}
            </Text>
          </Divider>
          <Button
            style={{ width: "100%" }}
            appearance="primary"
            size="large"
            onClick={handleNavigateToReview}
            icon={<TextBulletListSquareSearchRegular color="#fff" />}
          >
            {T.btnReview[locale]}
          </Button>
          <Button
            style={{ width: "100%" }}
            appearance="primary"
            size="large"
            onClick={handleNavigateToDraft}
            icon={<DraftsRegular color="#fff" />}
            disabled
          >
            {T.btnDraft[locale]}
          </Button>
        </div>

        <div
          style={{
            // border: "1px solid rgba(0, 0, 0, 0.05)",
            borderRadius: "8px",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "36px",
            // boxShadow: "0 2px 3px rgba(0, 0, 0, 0.25)",
          }}
        >
          <SelectionLang />
          {/* <SelectionModelAi /> */}
        </div>
      </div>
    </>
  );
};

export default observer(Main);
