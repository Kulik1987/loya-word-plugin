/* global Word console */

import { makeAutoObservable, reaction, runInAction } from "mobx";
import type RootStore from ".";
// import { ReviewTypesEnums } from "../enums";
// import { SuggestionT } from "../types";
// import api from "../api/v1";

class DocumentStore {
  rootStore: RootStore;

  documentText: string | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    // autorun(() => {
    //   this.getSuggestions();
    // });
    reaction(
      () => this.documentText,
      () => {
        this.rootStore.suggestionsStore.requestParties();
      }
    );
  }

  copyToStoreDocumentText = async () => {
    console.log("copyToStoreDocumentText...");
    await Word.run((context) => {
      // Получаем активное тело документа
      var body = context.document.body;

      // Загружаем содержимое тела документа
      context.load(body, "text");

      // Выполняем запрос
      return context.sync().then(() => {
        const bodyText = body.text;
        runInAction(() => {
          this.documentText = JSON.stringify(bodyText);
          console.log("Содержимое тела документа: " + JSON.stringify(bodyText));
        });
      });
    }).catch((error) => {
      console.error("Произошла ошибка: " + error);
    });
  };

  // get isSuggestionExist() {
  //   const suggestions = this.suggestions;
  //   return Array.isArray(suggestions) && suggestions.length > 0 ? true : false;
  // }
}

export default DocumentStore;
