import React from "react";

import Menu from "./menu";

class RootStore {
  menuStore: Menu;

  constructor() {
    this.menuStore = new Menu(this);
  }
}

const StoresContext = React.createContext<RootStore>(new RootStore());

export const useStores = (): RootStore => React.useContext(StoresContext);

export default RootStore;
