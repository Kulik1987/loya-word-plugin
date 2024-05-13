import { makeAutoObservable } from "mobx";
import type RootStore from ".";
import fakeResponseAPI from "./mockResponseAPI";
import { InsertPlaceEnum, LevelOfCriticalEnum, ReviewTypesEnums } from "../../shared/enums/suggestion";

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

  reviewTypeActive: ReviewTypesEnums | null = null;

  reviewGeneralProcessing: boolean = false;

  reviewCustomProcessing: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    // autorun(() => {
    //   this.getSuggestions();
    //   // this.suggestions = fakeResponseAPI;
    // });
  }

  startReviewGeneral = async () => {
    this.clearSuggestions();
    this.reviewTypeActive = ReviewTypesEnums.GENERAL;
    this.reviewGeneralProcessing = true;
    this.getSuggestions();
  };

  startReviewCustom = async () => {
    this.clearSuggestions();
    this.reviewCustomProcessing = true;
    this.reviewTypeActive = ReviewTypesEnums.CUSTOM;
    this.getSuggestions();
  };

  // setIsReviewProcessing = (name: ReviewTypesEnums | null) => {
  //   this.reviewProcessing = name;
  // };

  getSuggestions = () => {
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      this.suggestions = fakeResponseAPI;
      this.reviewGeneralProcessing = false;
      this.reviewCustomProcessing = false;
    }, 1000);
  };

  dismissSuggestion = (index: number) => {
    if (Array.isArray(this.suggestions)) {
      this.suggestions = this.suggestions.filter((_element, indexElement) => index !== indexElement);
    }
  };

  clearSuggestions = () => {
    this.suggestions = null;
  };

  get isSuggestionExist() {
    const suggestions = this.suggestions;
    return Array.isArray(suggestions) && suggestions.length > 0 ? true : false;
  }
}

export default SuggestionsStore;
