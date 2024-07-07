import React from "react";
import { HeaderMenu } from "../../widgets";
import { Button } from "@fluentui/react-components";
// import { useStores } from "../../shared/store";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { DraftsRegular, TextBulletListSquareSearchRegular } from "@fluentui/react-icons";

const Summary = () => {
  // const { menuStore } = useStores();
  const navigate = useNavigate();

  const handleNavigateToDraft = () => navigate("/draft");
  const handleNavigateToReview = () => navigate("/review");

  return <div style={{ border: "1px solid red", flex: 1 }}>Summary</div>;
};

export default observer(Summary);
