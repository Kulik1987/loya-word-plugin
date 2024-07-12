/* global Word console */

import { makeAutoObservable, reaction, runInAction } from "mobx";
import type RootStore from ".";

class DocumentStore {
  rootStore: RootStore;

  documentText: string | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    reaction(
      () => this.documentText,
      () => {
        // eslint-disable-next-line no-undef
        const APP_SET_MOCK = process.env.APP_SET_MOCK === "true";
        const APP_SET_ANONYMIZER = process.env.APP_SET_ANONYMIZER === "true";
        // // const FLAG2 = process.env?.FLAG2;
        console.log("FLAGS", { APP_SET_MOCK, APP_SET_ANONYMIZER });
        // console.log("isAn", isAn);

        if (APP_SET_MOCK) {
          console.log("Started MOCK_MODE", APP_SET_MOCK);
        } else {
          this.rootStore.suggestionsStore.requestParties();
        }
      }
    );
  }

  copyToStoreDocumentText = async () => {
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
        });
      });
    }).catch((error) => {
      console.error("Произошла ошибка: " + error);
    });
  };
}

export default DocumentStore;
