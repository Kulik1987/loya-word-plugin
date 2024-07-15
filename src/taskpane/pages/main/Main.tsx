import React, { useEffect, useState } from "react";
import { Button, Divider, ToggleButton, Text, Image } from "@fluentui/react-components";
import { useStores } from "../../store";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { DraftsRegular, TextBulletListSquareSearchRegular } from "@fluentui/react-icons";
import { LocaleEnums } from "../../store/menu";
// import dmf from "./test";

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
  const { locale, setLocale } = menuStore;
  const navigate = useNavigate();
  // const [htmlString, setHtmlString] = useState<string | null>(null);

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
      {/* <Image width="90" height="90" src={logo} alt={title} /> */}
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
            gap: "12px",
            // boxShadow: "0 2px 3px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Divider alignContent="center" inset style={{ paddingBottom: "6px" }}>
            <Text size={300} weight="medium">
              {T.dividerLang[locale]}
            </Text>
          </Divider>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <ToggleButton checked={locale === LocaleEnums.RU} onClick={() => setLocale(LocaleEnums.RU)}>
              RU
            </ToggleButton>
            <ToggleButton checked={locale === LocaleEnums.EN} onClick={() => setLocale(LocaleEnums.EN)}>
              EN
            </ToggleButton>
          </div>

          {/* <Button
            style={{ width: "100%" }}
            appearance="primary"
            size="large"
            onClick={handleTest}
            icon={<DraftsRegular color="#fff" />}
          >
            Test
          </Button> */}

          {/* <div dangerouslySetInnerHTML={{ __html: htmlString }}></div> */}
        </div>
      </div>
    </>
  );
};

export default observer(Main);
