/* global Word console */
/// <reference types="office-js" />

const MAX_LENGTH_SEARCH_STRING = 230;

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
      console.log("searchText", searchText);

      const startText = searchText.slice(0, MAX_LENGTH_SEARCH_STRING);
      const endText = searchText.slice(searchText.length - MAX_LENGTH_SEARCH_STRING, searchText.length);

      console.log({ startText, endText });

      const startRange = await this.searchText(context, startText);
      const endRange = await this.searchText(context, endText);

      const start = startRange.getFirst();
      const end = endRange.getFirst();

      return start.expandTo(end);
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }

  static async findRangeAndSelect(context: Word.RequestContext, searchText: string) {
    try {
      const range = await this.findRange(context, searchText);
      range.select();
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
      return null;
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

  static async applyChangeAndComment(
    context: Word.RequestContext,
    searchText: string,
    editText: string,
    commentText: string
  ) {
    try {
      const range = await this.findRange(context, searchText);
      range.insertText(editText, "Replace");
      range.insertComment(commentText);
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }

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
      return null;
    }
  }
}

// export const convert = {
//   splitStringIntoChunks,
// };
