/* global Word console */

import { makeAutoObservable, reaction, runInAction } from "mobx";
import type RootStore from ".";
import {
  replaceCompanyNames,
  removeAddressesByPart,
  removeAmountByPart,
  removeContract,
  removePayment,
  removePersonData,
} from "../helpers/anonymizer";

class DocumentStore {
  rootStore: RootStore;

  textContractSource: string | null = null;

  textContractAnonymized: string | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    reaction(
      () => this.textContractSource,
      () => {
        if (this.textContractSource?.length > 0) {
          this.rootStore.suggestionsStore.requestParties();
        }
      }
    );
  }

  buildAnonymizedText = () => {
    const docText = this.textContractSource;
    if (typeof docText !== "string") return null;
    this.textContractAnonymized = (() => {
      let modText = "";
      modText = removeAddressesByPart(docText);
      modText = removeAmountByPart(modText);
      modText = removePersonData(modText);
      modText = removeContract(modText);
      modText = removePayment(modText);
      modText = replaceCompanyNames(modText);
      return modText;
    })();
  };

  copyTextContractToStore = async () => {
    console.log("copyTextContractToStore [start]");
    if (this.textContractSource === null) {
      await Word.run((context) => {
        // Получаем активное тело документа
        var body = context.document.body;
        // Загружаем содержимое тела документа
        context.load(body, "text");
        // Выполняем запрос
        return context.sync().then(() => {
          const bodyText = body.text;
          runInAction(() => {
            // this.textContractSource = JSON.stringify(bodyText);
            this.textContractSource = bodyText;
            console.log("copyTextContractToStore [success]");
          });
        });
      }).catch((error) => {
        console.error("copyTextContractToStore [error]" + error);
      });
    }
  };
}

export default DocumentStore;
