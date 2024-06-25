import { makeAutoObservable } from "mobx";
import type RootStore from ".";

export enum AuthStepperEnum {
  LOGOUT = "user.logout",
  LOGGED = "user.logged",
  FORBIDDEN = "access.forbidden",
  ERROR = "request.error",
}

class AuthStore {
  rootStore: RootStore;

  // currentMenuItem: MenuItemsEnums | null = MenuItemsEnums.REVIEW;
  authStatus: AuthStepperEnum = AuthStepperEnum.LOGOUT;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    // autorun(() => {
    //   this.loadSessionAuth();
    // });
  }

  setAuthStatus = (status: AuthStepperEnum) => {
    this.authStatus = status;
  };

  logout = () => {
    this.authStatus = AuthStepperEnum.LOGOUT;
    // this.rootStore.menuStore.setMenuItem(null);
    localStorage.setItem("authStatus", "");
  };
  // get
  // setMenuItem = (menuItem: MenuItemsEnums | null) => {
  //   this.currentMenuItem = menuItem;
  // };

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

export default AuthStore;
