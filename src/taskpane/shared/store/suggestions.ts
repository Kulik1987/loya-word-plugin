import { makeAutoObservable } from "mobx";
import type RootStore from ".";
import fakeResponseAPI from "./mockResponseAPI";
import { InsertPlaceEnum, LevelOfCriticalEnum, ReviewVariantsEnums } from "../../shared/enums/suggestion";

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

  reviewStarted: ReviewVariantsEnums | null = null;

  reviewProcessing: ReviewVariantsEnums | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    // autorun(() => {
    //   this.getSuggestions();
    //   // this.suggestions = fakeResponseAPI;
    // });
  }

  setReviewStarted = (name: ReviewVariantsEnums | null) => {
    this.reviewStarted = name;
    this.rootStore.suggestionsStore.getSuggestions();
  };

  setIsReviewProcessing = (name: ReviewVariantsEnums | null) => {
    this.reviewProcessing = name;
  };

  getSuggestions = () => {
    this.suggestions = fakeResponseAPI;
  };

  dismissSuggestion = (index: number) => {
    if (Array.isArray(this.suggestions)) {
      this.suggestions = this.suggestions.filter((_element, indexElement) => index !== indexElement);
    }
  };
}

export default SuggestionsStore;
