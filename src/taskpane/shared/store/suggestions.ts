import { makeAutoObservable } from "mobx";
import type RootStore from ".";
import fakeResponseGeneral from "./mockResponseGeneral";
import fakeResponseCustom from "./mockResponseCustom";
import { ReviewTypesEnums } from "../../shared/enums";
import { SuggestionT } from "../../shared/types";

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
    // });
  }

  resetStore = () => {
    this.suggestions = null;
    this.reviewTypeActive = null;
    // this.
  };

  startReviewGeneral = async () => {
    this.clearSuggestions();
    this.reviewTypeActive = ReviewTypesEnums.GENERAL;
    this.reviewGeneralProcessing = true;
    this.getSuggestions(fakeResponseGeneral);
  };

  startReviewCustom = async () => {
    this.clearSuggestions();
    this.reviewCustomProcessing = true;
    this.reviewTypeActive = ReviewTypesEnums.CUSTOM;
    this.getSuggestions(fakeResponseCustom);
  };

  // setIsReviewProcessing = (name: ReviewTypesEnums | null) => {
  //   this.reviewProcessing = name;
  // };

  getSuggestions = (response: SuggestionT[]) => {
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      this.suggestions = response;
      this.reviewGeneralProcessing = false;
      this.reviewCustomProcessing = false;
    }, 5000);
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
