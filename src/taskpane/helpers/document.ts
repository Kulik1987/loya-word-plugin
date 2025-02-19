/* global Word console */
/// <reference types="office-js" />
// import storeConfig from "../store/config";
import { OptionsSupportedCurrentApiI } from "../store/config";
import { getDifferencesSemantic } from "./diff";

// import
const MAX_LENGTH_SEARCH_STRING = 200;

interface ApplyChangeI {
  sourceText: string;
  changeText: string;
  optionsSupportedCurrentApi: OptionsSupportedCurrentApiI;
  type: string;
}

interface ApplyCommentI {
  sourceText: string;
  changeText: string;
  commentText: string;
}
export class DocumentHelpers {
  static async applyChange(props: ApplyChangeI) {
    try {
      const { sourceText: searchText, changeText: editText, optionsSupportedCurrentApi, type } = props;
      console.log("[applyChange]", { searchText, editText, type });
      // console.log("optionsSupportedCurrentApi", optionsSupportedCurrentApi);

      const { isAccessToRangeInsertText, isAccessToRangeInsertTextSemantic } = optionsSupportedCurrentApi;
      if (type === "new") {
        await this.applyChangeAddNewParagraph(searchText, editText);
      } else {
        if (isAccessToRangeInsertTextSemantic) {
          this.applyChangeSemantic(searchText, editText);
        } else if (isAccessToRangeInsertText) {
          this.applyChangeBasic(searchText, editText);
        }
      }
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }

  static async applyChangeAddNewParagraph(searchText: string, newParagraphText: string) {
    await Word.run(async (context) => {
      const range = await this.findRange(context, searchText);
      // context.load(range, "style");
      // await context.sync();
      // const rStyle = range.style;

      // Вставляем новый параграф после диапазона
      range.insertText(newParagraphText, "After");
      // const paragraph = range.insertText(newParagraphText, "After");
      // const paragraph = range.insertParagraph(newParagraphText, Word.InsertLocation.after);

      // Установка стиля (например, обычный текст)
      // paragraph.style = rStyle;
      // paragraph.styleBuiltIn = "Normal";
      // paragraph.font.bold = false;
      // paragraph.font.italic = false;
      // paragraph.font.size = 12; // Установите нужный размер шрифта
      await context.sync();
    }).catch((error) => {
      console.log("Error [applyChangeAddNewParagraph]: " + error);
    });
  }

  static async applyChangeBasic(searchText: string, changeText: string) {
    await Word.run(async (context) => {
      const range = await this.findRange(context, searchText);
      range.insertText(changeText, "Replace");
    }).catch((error) => {
      console.log("Error [handleShowInDocument]: " + error);
    });
  }

  /**
   * @description функция собирает новую строку из массива различий и вставляет на место искомой строки, оставляя а режиме правок только измененные фрагменты строки
   */
  static async applyChangeSemantic(searchText: string, changeText: string) {
    /** Подготовка массива различий между исходным текстом и правкой  */
    const differencesArray = getDifferencesSemantic(searchText, changeText);
    console.log("differencesArray", differencesArray);

    /** Обработка документа */
    await Word.run(async (context) => {
      /** Найти уже примененные правки */
      const rangeAppliedChanges = await DocumentHelpers.findRange(context, changeText);
      // console.log("rangeAppliedChanges", rangeAppliedChanges);

      /** Если примененной правки не найдено: */
      if (rangeAppliedChanges === null) {
        /** Найти диапазон с исходным текстом в документе  */
        const findRange = await DocumentHelpers.findRange(context, searchText);
        /** Очистка диапазона с исходным текстом */
        findRange.clear();
        const trackedChangeR = findRange.getTrackedChanges();
        context.load(trackedChangeR, "items");
        await context.sync();
        trackedChangeR.items[0].accept();

        /** Сборка новой строки по массиву отличий */
        for (const diffItem of differencesArray) {
          try {
            let isStable = diffItem[0] === 0;
            let isCreate = diffItem[0] === 1;
            let isDelete = diffItem[0] === -1;
            let inputText = diffItem[1];

            /** Применение изменений */
            const insertedItem = findRange.insertText(inputText, Word.InsertLocation.end);
            context.load(insertedItem, "text");
            await context.sync();

            if (isStable) {
              /** если элемент без изменений - принимаем правку */
              const trackedChangeItem = insertedItem.getTrackedChanges();
              context.load(trackedChangeItem, "items");
              await context.sync();
              trackedChangeItem.items[0].accept();
            }

            if (isCreate) {
              /** новый элемент отобразится как правка в режиме рецензирования */
            }

            if (isDelete) {
              /** если элемент удален - сначала подтверждаем вставку
               * (чтобы добавилась запись в истории рецензирования), потом удаляем
               */
              const trackedChangeItem = insertedItem.getTrackedChanges();
              context.load(trackedChangeItem, "items");
              await context.sync();
              trackedChangeItem.items[0].accept();
              insertedItem.clear();
            }
          } catch (error) {
            console.log("error", error);
          }
        }
      }
    }).catch((error) => {
      console.log("Error [handleShowInDocument]: " + error);
    });
  }

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
  ): Promise<Word.Range | null> {
    try {
      /**
       * 1.
       */
      const searchTextLength = searchText.length;
      const isSearchTextLessMaxLength = searchTextLength <= MAX_LENGTH_SEARCH_STRING;

      console.log("SEARCH TEXT:", { isSearchTextLessMaxLength, searchText, length: searchTextLength });

      /** Длина текста МЕНЬШЕ лимита */
      if (isSearchTextLessMaxLength) {
        const range = await this.searchText(context, searchText);
        // context.load(range, "items");
        // console.log("range", range);
        // await context.sync();
        const start = range.getFirst();
        return start;
      }
      // else {
      /** Длина текста БОЛЬШЕ лимита */
      if (!isSearchTextLessMaxLength) {
        const startText = searchText.slice(0, MAX_LENGTH_SEARCH_STRING);
        const endText = searchText.slice(searchTextLength - MAX_LENGTH_SEARCH_STRING, searchTextLength);
        // console.log({ startText, endText, searchText });

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

      /** этот return досягаем? */
      return null;
    } catch (error) {
      console.log("error", error);
      throw error;
      // return null;
    }
  }

  static async applyComment(props: ApplyCommentI) {
    const { sourceText, changeText, commentText } = props;

    await Word.run(async (context) => {
      console.log("[applyComment]", { context, sourceText, changeText, commentText });

      try {
        /**
         * Ищем фрагмент текста с примененными правками
         * если такой не найден ищем по исходному тексту
         */
        let findRange = await DocumentHelpers.findRange(context, changeText);
        if (findRange === null) {
          findRange = await DocumentHelpers.findRange(context, sourceText);
        }

        /** Проверка на существование комментария в диапазоне */
        const comments = findRange.getComments();
        comments.load("items");
        await context.sync();
        const isCommentExist = comments.items.some((el) => el.content === commentText);

        /** */
        if (isCommentExist) {
          console.log("Этот комментарий уже добавлен!"); //TODO: тут должен быть вызов нотификации
        } else {
          findRange.insertComment(commentText);
        }
      } catch (error) {
        console.log("error", error);
        throw error;
      }
    }).catch((error) => {
      console.log("Error [applyComment]: " + error);
    });
  }

  static async searchText(context: Word.RequestContext, searchText: string) {
    try {
      const body = context.document.body;
      const rangeCollection = body.search(searchText, {
        ignoreSpace: true,
        ignorePunct: true,
        // matchPrefix: true,
        // 1. ignorePunct: Если установлено в true, игнорирует знаки препинания при поиске.
        // 2. ignoreSpace: Если установлено в true, игнорирует пробелы при поиске.
        // 3. matchCase: Если установлено в true, учитывает регистр букв при поиске.
        // 4. matchPrefix: Если установлено в true, ищет совпадения только в начале слов.
        // 5. matchSuffix: Если установлено в true, ищет совпадения только в конце слов.
        // 6. matchWholeWord: Если установлено в true, ищет только целые слова, а не части слова.
        // 7. matchWildcards: Если установлено в true, позволяет использовать шаблоны для поиска (например, символы замены).
      });
      console.log("[rangeCollection]", rangeCollection);

      return rangeCollection;
    } catch (error) {
      console.log("[searchText] error", error);
      throw error;
      // return null;
    }
  }
}

