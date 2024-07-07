import React from "react";
import { HeaderMenu } from "../../widgets";
import { Button, Divider } from "@fluentui/react-components";
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
      ru: "Общие настройки",
      en: "Common Settings",
    },
  };
  return (
    <>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Button
          style={{ width: "100%" }}
          appearance="primary"
          size="large"
          onClick={handleNavigateToDraft}
          icon={<DraftsRegular color="#fff" />}
          // disabled
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

        <Divider> {T.divider[locale]}</Divider>
        <Button onClick={() => setLocale(LocaleEnums.RU)}>RU</Button>
        <Button onClick={() => setLocale(LocaleEnums.EN)}>EN</Button>
      </div>
    </>
  );
};

export default observer(Main);
