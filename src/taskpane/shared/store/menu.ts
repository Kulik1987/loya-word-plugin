import { makeAutoObservable } from "mobx";
import type RootStore from ".";

export enum MenuItemsEnums {
  "DRAFT" = "DRAFT",
  "REVIEW" = "REVIEW",
}

export enum LocalEnums {
  "RU" = "ru",
  "EN" = "en",
}

class MenuStore {
  rootStore: RootStore;

  local: LocalEnums = LocalEnums.EN;

  currentMenuItem: MenuItemsEnums | null = MenuItemsEnums.REVIEW;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    // autorun(() => {
    //   this.loadSessionAuth();
    // });
  }

  setMenuItem = (menuItem: MenuItemsEnums | null) => {
    this.currentMenuItem = menuItem;
  };
}

export default MenuStore;
