import { autorun, makeAutoObservable, runInAction } from "mobx";
import type RootStore from ".";
class ConfigStore {
  rootStore: RootStore;

  /** Функции плагина поддерживаемые текущей версией офис  */
  optionsSupportedCurrentApi = {
    searchInBody: false,
    isAccessToRangeInsertComment: false,
    isAccessToRangeInsertText: false,
    isAccessToRangeInsertTextSemantic: false,
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    autorun(() => {
      Office.onReady(async (info) => {
        /** Включение записи исправлений при запуске плагина */
        await Word.run(async (context) => {
          context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll;
          await context
            .sync()
            .then(() => console.log(`Статус запись исправлений: включена`))
            .catch((error) => console.log(`Статус запись исправлений: n/a`, error));
        });

        /** Определение поддерживаемых api word'a функций плагина */
        const { platform } = info;
        const isPlatformOnline = platform === Office.PlatformType.OfficeOnline;

        const isApiExist_1_1 = Office.context.requirements.isSetSupported("WordApi", "1.1");
        const isApiExist_1_3 = Office.context.requirements.isSetSupported("WordApi", "1.3");
        const isApiExist_1_4 = Office.context.requirements.isSetSupported("WordApi", "1.4");
        const isApiExist_1_6 = Office.context.requirements.isSetSupported("WordApi", "1.6");

        const optionsSupportedCurrentApi = {
          searchInBody: isApiExist_1_3,
          isAccessToRangeInsertComment: isApiExist_1_4,
          isAccessToRangeInsertText: isApiExist_1_1,
          isAccessToRangeInsertTextSemantic: isPlatformOnline ? false : isApiExist_1_6, //TODO: нужен фикс для онлайн версии
        };
        runInAction(() => {
          this.optionsSupportedCurrentApi = optionsSupportedCurrentApi;
        });
        console.log("System config:", { info, Office, optionsSupportedCurrentApi });
      });
    });
  }

  // logout = () => {};
}

export default ConfigStore;
