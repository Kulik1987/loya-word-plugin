import { makeAutoObservable } from "mobx";
import type RootStore from ".";
import fakeResponseAPI from "./mockResponseAPI";
// import { InsertPlaceEnum, LevelOfCriticalEnum } from "../../widgets/suggestion/Suggestion";
import { InsertPlaceEnum, LevelOfCriticalEnum } from "../../shared/enums/suggestion";

// export enum MenuItemsEnums {
//   "DRAFT" = "DRAFT",
//   "REVIEW" = "REVIEW",
// }

// export enum ReviewVariantsEnums {
//   "GENERAL" = "GENERAL",
//   "CUSTOM" = "CUSTOM",
// }

type SuggestionT = {
  levelOfCriticality: LevelOfCriticalEnum;
  targetText: string;
  change?: {
    text: string;
    place?: InsertPlaceEnum;
  };
  note?: {
    text: string;
  };
};

class SuggestionsStore {
  rootStore: RootStore;

  suggestions: SuggestionT[] | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    // autorun(() => {
    //   this.getSuggestion();
    //   // this.suggestions = fakeResponseAPI;
    // });
  }

  getSuggestion = () => {
    this.suggestions = fakeResponseAPI;
  };

  dismissSuggestion = (index: number) => {
    if (Array.isArray(this.suggestions)) {
      this.suggestions = this.suggestions.filter((_element, indexElement) => index !== indexElement);
    }
  };
}

export default SuggestionsStore;
