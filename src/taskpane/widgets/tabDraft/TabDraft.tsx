import React from "react";
// import { Button } from "@fluentui/react-components";
import { observer } from "mobx-react";
// import { useStores } from "../../shared/store";

const Draft = () => {
  // const { menuStore } = useStores();

  // const handleClick = (name: MenuItemsEnums) => {
  //   menuStore.setMenuItem(name);
  // };

  return <div style={{ display: "flex", gap: "8px" }}>Draft Page</div>;
};

export default observer(Draft);
