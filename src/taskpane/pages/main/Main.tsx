import React from "react";
import { HeaderMenu } from "../../widgets";
import { Button, Divider, ToggleButton, Text } from "@fluentui/react-components";
import { useStores } from "../../shared/store";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { DraftsRegular, TextBulletListSquareSearchRegular } from "@fluentui/react-icons";
import { LocaleEnums } from "../../shared/store/menu";

const Main = () => {
  const { menuStore } = useStores();
  const { locale, setLocale } = menuStore;
  const navigate = useNavigate();

  const handleNavigateToDraft = () => navigate("./draft");
  const handleNavigateToReview = () => navigate("./review");

  const T = {
    btnDraft: {
      ru: "Написание",
      en: "Draft",
    },
    btnReview: {
      ru: "Проверка",
      en: "Review",
    },
    divider: {
      ru: "Настройки Плагина",
      en: "Plugin Settings",
    },
  };
  return (
    <>
      <div style={{ display: "flex", gap: "32px", flexDirection: "column", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
          <Button
            style={{ width: "100%" }}
            appearance="primary"
            size="large"
            onClick={handleNavigateToReview}
            icon={<TextBulletListSquareSearchRegular color="#fff" />}
          >
            {T.btnReview[locale]}
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Divider>
            <Text size={300}>{T.divider[locale]}</Text>
          </Divider>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <ToggleButton checked={locale === LocaleEnums.RU} onClick={() => setLocale(LocaleEnums.RU)}>
              RU
            </ToggleButton>
            <ToggleButton checked={locale === LocaleEnums.EN} onClick={() => setLocale(LocaleEnums.EN)}>
              EN
            </ToggleButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Main);
