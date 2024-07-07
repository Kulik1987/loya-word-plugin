import React from "react";
import { HeaderMenu } from "../../widgets";
import { Button } from "@fluentui/react-components";
import { useStores } from "../../shared/store";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { DraftsRegular, TextBulletListSquareSearchRegular } from "@fluentui/react-icons";

const Main = () => {
  const { menuStore } = useStores();
  const { local } = menuStore;
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
          {T.btnDraft[local]}
        </Button>
        <Button
          style={{ width: "100%" }}
          appearance="primary"
          size="large"
          onClick={handleNavigateToReview}
          icon={<TextBulletListSquareSearchRegular color="#fff" />}
        >
          {T.btnReview[local]}
        </Button>
      </div>
    </>
  );
};

export default observer(Main);
