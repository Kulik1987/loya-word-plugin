/* global Word console */
/// <reference types="office-js" />

import { diff_match_patch } from "diff-match-patch";
import { DocumentHelpers } from "./document";

export function getDifferencesSemantic(text1: string, text2: string) {
  let dmp = new diff_match_patch();
  var diff = dmp.diff_main(text1, text2);
  dmp.diff_cleanupSemantic(diff);
  return diff;
}

export async function compare(searchText: string, changeText: string) {
  const differencesArray = getDifferencesSemantic(searchText, changeText);
  console.log("differencesArray", differencesArray);

  await Word.run(async (context) => {
    const findRange = await DocumentHelpers.findRange(context, searchText);

    let previousStableFragment;
    /**
     * - цикл по массиву различий
     * -
     */
    for (const diffItem of differencesArray) {
      try {
        let isStable = diffItem[0] === 0;
        let isCreate = diffItem[0] === 1;
        let isDelete = diffItem[0] === -1;
        let searchFragment = diffItem[1];
        // console.log("part", { diffItem, searchFragment });
        /**
         * - если isCreate то ищем
         */
        if (isStable) {
        }
        if (isCreate) {
        }

        const foundInRange = findRange.search(searchFragment);
        // Загружаем свойство items
        context.load(foundInRange, "items");
        await context.sync();

        // Перебираем все найденные диапазоны
        foundInRange.items.forEach(async (range) => {
          const text = range.text; // Получаем текст из диапазона
          console.log("Found text:", text);

          // Если нужно, можете сделать что-то с текстом здесь
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }).catch((error) => {
    console.log("Error [handleShowInDocument]: " + error);
  });
}

export function htmlChangesMatching(source: string, target: string): string | null {
  // TODO: добавить вывод ошибок
  try {
    let dmp = new diff_match_patch();
    let diff = dmp.diff_main(source, target);

    dmp.diff_cleanupSemantic(diff);

    const array = diff.map((el) => {
      if (Array.isArray(el) && el.length === 2) {
        const actionFlag = el[0];
        const textItem = el[1];

        const isDeleteItem = actionFlag === -1;
        const isCreateItem = actionFlag === 1;
        const isStetItem = actionFlag === 0;

        switch (true) {
          case isDeleteItem:
            return `<del  style="color: #db690d;">${textItem}</del>`;
          case isCreateItem:
            return `<inc style="color: #099e1a; font-weight: bold;
           ">${textItem}</inc>`;
          case isStetItem:
            return `${textItem}`;
          default:
            console.log("empty element", el);
            return ``;
        }
      } else {
        console.log("not Array", el);
        return "";
      }
    });

    const response = array.join("");
    return response;
  } catch (error) {
    console.log("error [htmlChangesMatching]", error);

    return null;
  }
}
