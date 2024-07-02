/* global Word console */

import { makeAutoObservable, reaction, runInAction } from "mobx";
import type RootStore from ".";
import { removeContract, removePersonData } from "../services/anonymizer";

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
        const isMockMode = process.env.isMockMode === "true";
        if (isMockMode) {
          console.log("Started MOCK_MODE", isMockMode);
        } else {
          this.rootStore.suggestionsStore.requestParties();
        }

        const text = this.documentText;
        if (text) {
          console.log("text", text);
          const resp = removePersonData(text);
          // const resp = removeContract(text);
          console.log("resp", resp);
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
