/* global Word console */
/// <reference types="office-js" />

const MAX_LENGTH_SEARCH_STRING = 200;

export class DocumentHelpers {
  /**
   * @description функция отдает диапазон с искомым текстом
   */
  static async findRange(
    context: Word.RequestContext,
    searchText: string
    // range?: Word.Range,
    // { ignorePunct, ignoreSpace, trimQuery } = {
    //   ignorePunct: true,
    //   ignoreSpace: true,
    //   trimQuery: true,
    // }
  ) {
    try {
      // console.log("searchText", searchText);
      const isSearchTextLessMaxLength = searchText.length <= MAX_LENGTH_SEARCH_STRING;

      const startText = searchText.slice(0, MAX_LENGTH_SEARCH_STRING);
      const endText = searchText.slice(searchText.length - MAX_LENGTH_SEARCH_STRING, searchText.length);

      const startRange = await this.searchText(context, startText);
      const endRange = await this.searchText(context, endText);
      // Загружаем результаты
      // await context.sync();
      context.load(startRange, "items");
      context.load(endRange, "items");
      await context.sync();

      const isStartRangeExist = startRange.items.length > 0;
      const isEndRangeExist = endRange.items.length > 0;

      console.log("isRangesExist", { isStartRangeExist, isEndRangeExist });

      if (isStartRangeExist && isEndRangeExist) {
        const start = startRange.getFirst();
        const end = endRange.getFirst();
        return start.expandTo(end);
      }
      if (isStartRangeExist && isSearchTextLessMaxLength) {
        return startRange.getFirst();
      }
      return null;
    } catch (error) {
      console.log("error", error);
      throw error;
      // return null;
    }
  }

  static async applyChange(context: Word.RequestContext, searchText: string, editText: string) {
    try {
      const range = await this.findRange(context, searchText);
      range.insertText(editText, "Replace");
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }

  static async applyComment(context: Word.RequestContext, searchText: string, commentText: string) {
    try {
      const range = await this.findRange(context, searchText);
      range.insertComment(commentText);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  // static async applyChangeAndComment(
  //   context: Word.RequestContext,
  //   searchText: string,
  //   editText: string,
  //   commentText: string
  // ) {
  //   try {
  //     const range = await this.findRange(context, searchText);
  //     range.insertText(editText, "Replace");
  //     range.insertComment(commentText);
  //   } catch (error) {
  //     console.log("error", error);
  //     return null;
  //   }
  // }

  static async searchText(context: Word.RequestContext, searchText: string) {
    try {
      const body = context.document.body;
      const rangeCollection = body.search(searchText, {
        ignoreSpace: true,
        // 1. ignorePunct: Если установлено в true, игнорирует знаки препинания при поиске.
        // 2. ignoreSpace: Если установлено в true, игнорирует пробелы при поиске.
        // 3. matchCase: Если установлено в true, учитывает регистр букв при поиске.
        // 4. matchPrefix: Если установлено в true, ищет совпадения только в начале слов.
        // 5. matchSuffix: Если установлено в true, ищет совпадения только в конце слов.
        // 6. matchWholeWord: Если установлено в true, ищет только целые слова, а не части слова.
        // 7. matchWildcards: Если установлено в true, позволяет использовать шаблоны для поиска (например, символы замены).
      });

      return rangeCollection;
    } catch (error) {
      console.log("error", error);
      throw error;
      // return null;
    }
  }
}

// export const convert = {
//   splitStringIntoChunks,
// };
