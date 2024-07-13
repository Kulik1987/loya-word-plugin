import { autorun, makeAutoObservable } from "mobx";
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

  locale: LocaleEnums = LocaleEnums.RU;

  currentMenuItem: MenuItemsEnums | null = MenuItemsEnums.REVIEW;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    autorun(() => {
      const locale = localStorage.getItem("speransky_locale");
      if (locale && Object.values(LocaleEnums).includes(locale as LocaleEnums)) {
        this.locale = locale as LocaleEnums;
      }
    });
  }

  setMenuItem = (menuItem: MenuItemsEnums | null) => {
    this.currentMenuItem = menuItem;
  };

  setLocale = (locale: LocaleEnums) => {
    localStorage.setItem("speransky_locale", locale);
    this.locale = locale;
  };
}

export default MenuStore;
