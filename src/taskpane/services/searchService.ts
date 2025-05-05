/* global Word console */
/// <reference types="office-js" />

const MAX_LENGTH_SEARCH_STRING = 20;

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
        const textStart = searchText.slice(0, MAX_LENGTH_SEARCH_STRING);
        const textEnd = searchText.slice(searchTextLength - MAX_LENGTH_SEARCH_STRING, searchTextLength);

        const rangeStart = await this.searchText(context, textStart);
        const rangeEnd = await this.searchText(context, textEnd);
        context.load(rangeStart, "items");
        context.load(rangeEnd, "items");
        await context.sync();

        const isRangeStartExist = rangeStart.items.length > 0;
        const isRangeEndExist = rangeEnd.items.length > 0;

        console.log("RANGE", { textStart, textEnd, isRangeStartExist, isRangeEndExist });

        if (isRangeStartExist && isRangeEndExist) {
          const start = rangeStart.getFirst();
          const end = rangeEnd.getFirst();
          return start.expandTo(end);
        }
      }

      return null;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  private static async searchText(context: Word.RequestContext, value: string) {
    try {
      const body = context.document.body;
      const rangeCollection = body.search(value, {
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
