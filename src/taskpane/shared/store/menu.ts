import { makeAutoObservable } from "mobx";
import type RootStore from ".";

export enum MenuItemsEnums {
  "DRAFT" = "DRAFT",
  "REVIEW" = "REVIEW",
}

class MenuStore {
  rootStore: RootStore;

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

  // loadSessionAuth = () => {
  //   const sessionAuth = sessionStorage.getItem("loya_auth");
  //   if (sessionAuth) {
  //     const { login, authStep } = JSON.parse(sessionAuth);
  //     runInAction(() => {
  //       this.login = login;
  //       this.authStep = authStep;
  //     });
  //   }
  // };
}

export default MenuStore;
