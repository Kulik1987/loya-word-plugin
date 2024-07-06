import React from "react";
import { HeaderMenu } from "../../widgets";
import { Button } from "@fluentui/react-components";
// import { useStores } from "../../shared/store";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { DraftsRegular, TextBulletListSquareSearchRegular } from "@fluentui/react-icons";

const Main = () => {
  // const { menuStore } = useStores();
  const navigate = useNavigate();

  const handleNavigateToDraft = () => navigate("./draft");
  const handleNavigateToReview = () => navigate("./review");

  return (
    <div style={{ border: "1px solid red", flex: 1 }}>
      <HeaderMenu title="Speransky AI" />
      <Button
        appearance="primary"
        // disabled
        size="large"
        onClick={handleNavigateToDraft}
        icon={<DraftsRegular color="#fff" />}
      >
        Draft
      </Button>
      <Button
        appearance="primary"
        // disabled={false}
        size="large"
        onClick={handleNavigateToReview}
        icon={<TextBulletListSquareSearchRegular color="#fff" />}
      >
        Review
      </Button>
    </div>
  );
};

export default observer(Main);
