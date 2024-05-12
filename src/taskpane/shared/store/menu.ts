import { makeAutoObservable } from "mobx";
import type RootStore from ".";

export enum MenuItemsEnums {
  "DRAFT" = "DRAFT",
  "REVIEW" = "REVIEW",
}

export enum ReviewVariantsEnums {
  "GENERAL" = "GENERAL",
  "CUSTOM" = "CUSTOM",
}

class MenuStore {
  rootStore: RootStore;

  currentMenuItem: MenuItemsEnums | null = MenuItemsEnums.REVIEW;

  reviewStarted: ReviewVariantsEnums | null = null;
  reviewProcessing: ReviewVariantsEnums | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    // autorun(() => {
    //   this.loadSessionAuth();
    // });
  }

  setReviewStarted = (name: ReviewVariantsEnums | null) => {
    this.reviewStarted = name;
  };

  setIsReviewProcessing = (name: ReviewVariantsEnums | null) => {
    this.reviewProcessing = name;
  };

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
