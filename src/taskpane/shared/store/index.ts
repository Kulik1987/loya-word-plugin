import React from "react";

import Menu from "./menu";
import Suggestions from "./suggestions";

class RootStore {
  menuStore: Menu;
  suggestionsStore: Suggestions;

  constructor() {
    this.menuStore = new Menu(this);
    this.suggestionsStore = new Suggestions(this);
  }
}

const StoresContext = React.createContext<RootStore>(new RootStore());

export const useStores = (): RootStore => React.useContext(StoresContext);

export default RootStore;
