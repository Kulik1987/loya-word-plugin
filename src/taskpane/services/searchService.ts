/* global Word console */
/// <reference types="office-js" />

const MAX_LENGTH_SEARCH_STRING = 200;

export class SearchService {
  static async findRange(context: Word.RequestContext, searchText: string): Promise<Word.Range | null> {
    try {
      const searchTextLength = searchText.length;
      const isSearchTextLessMaxLength = searchTextLength <= MAX_LENGTH_SEARCH_STRING;

      console.log("SEARCH TEXT:", { isSearchTextLessMaxLength, searchText, length: searchTextLength });

      /** Длина текста МЕНЬШЕ лимита */
      if (isSearchTextLessMaxLength) {
        const range = await this.searchText(context, searchText);
        const start = range.getFirst();
        return start;
      }

      /** Длина текста БОЛЬШЕ лимита */
      if (!isSearchTextLessMaxLength) {
        const startText = searchText.slice(0, MAX_LENGTH_SEARCH_STRING);
        const endText = searchText.slice(searchTextLength - MAX_LENGTH_SEARCH_STRING, searchTextLength);

        const startRange = await this.searchText(context, startText);
        const endRange = await this.searchText(context, endText);
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
      }

      return null;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  private static async searchText(context: Word.RequestContext, searchText: string) {
    try {
      const body = context.document.body;
      const rangeCollection = body.search(searchText, {
        ignoreSpace: true,
        ignorePunct: true,
      });
      console.log("[rangeCollection]", rangeCollection);

      return rangeCollection;
    } catch (error) {
      console.log("[searchText] error", error);
      throw error;
    }
  }
}
