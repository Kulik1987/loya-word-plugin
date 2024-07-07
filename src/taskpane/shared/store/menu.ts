import { makeAutoObservable } from "mobx";
import type RootStore from ".";

export enum MenuItemsEnums {
  "DRAFT" = "DRAFT",
  "REVIEW" = "REVIEW",
}

export enum LocaleEnums {
  "RU" = "ru",
  "EN" = "en",
}

class MenuStore {
  rootStore: RootStore;

  locale: LocaleEnums = LocaleEnums.EN;

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

  setLocale = (locale: LocaleEnums) => {
    this.locale = locale;
  };
}

export default MenuStore;
