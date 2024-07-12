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
const APP_SET_ANONYMIZER = process.env.APP_SET_ANONYMIZER === "true";

class DocumentStore {
  rootStore: RootStore;

  textContractSource: string | null = null;

  textContractAnonymized: string | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    /**
     * @description Реакция срабатывает на изменение в сторе основного текста контракта и запускает запрос на получение Сторон
     */
    reaction(
      () => this.textContractSource,
      () => {
        if (this.textContractSource?.length > 0) {
          if (APP_SET_ANONYMIZER) this.buildAnonymizedText();
          this.rootStore.suggestionsStore.requestParties();
        }
      }
    );
    reaction(
      () => this.textContractAnonymized,
      () => {
        console.log("textContractAnonymized [updated]");
      }
    );
  }

  /**
   * @description Создает анонимизированный текст контракта и обновляет им textContractAnonymized в сторе
   * */
  buildAnonymizedText = () => {
    const docText = this.textContractSource;
    if (typeof docText !== "string") return null;
    runInAction(() => {
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
    });
  };

  /**
   * @description Копирует текст контракта в стор
   */
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
