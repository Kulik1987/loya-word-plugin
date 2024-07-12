/* global Word console */

import React from "react";
import { autorun } from "mobx";

import Auth from "./auth";
import Menu from "./menu";
import Document from "./document";
import Suggestions from "./suggestions";

class RootStore {
  authStore: Auth;
  documentStore: Document;
  menuStore: Menu;
  suggestionsStore: Suggestions;

  constructor() {
    this.authStore = new Auth(this);
    this.documentStore = new Document(this);
    this.menuStore = new Menu(this);
    this.suggestionsStore = new Suggestions(this);
    autorun(() => {
      Word.run(async (context) => {
        context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll;
        await context.sync().then(function () {
          console.log("Режим записывания исправлений включен");
        });
      });
    });
  }
}

const StoresContext = React.createContext<RootStore>(new RootStore());

export const useStores = (): RootStore => React.useContext(StoresContext);

export default RootStore;
