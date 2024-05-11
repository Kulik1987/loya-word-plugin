import React from "react";
// import { Button } from "@fluentui/react-components";
import { observer } from "mobx-react";
// import { useStores } from "../../shared/store";
// import { MenuItemsEnums } from "../../shared/store/menu";

const TabDraft = () => {
  // const { menuStore } = useStores();

  // const handleClick = (name: MenuItemsEnums) => {
  //   menuStore.setMenuItem(name);
  // };

  return <div style={{ border: "1px solid red", display: "flex", gap: "8px" }}>Draft</div>;
};

export default observer(TabDraft);
