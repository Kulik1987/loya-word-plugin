import { makeAutoObservable, runInAction } from "mobx";
import type RootStore from ".";
import fakeResponse from "./mockResponseGeneralAPI";
import { ReviewTypesEnums } from "../enums";
import api from "../api/v1";
import { ContractRecommendationResponseT } from "../api/v1/contract";

// eslint-disable-next-line no-undef
const isMockMode = process.env.isMockMode === "true";

type SuggestionPropertyT = {
  isDismiss?: boolean;
  isApplyChange?: boolean;
  isApplyComment?: boolean;
};

export type SuggestionT = ContractRecommendationResponseT & SuggestionPropertyT;

class SuggestionsStore {
  rootStore: RootStore;

  suggestionsNew: SuggestionT[] | null = null;

  parties: string[] | null = isMockMode ? ["1", "2"] : null;

  formPartySelected: string | null = null;

  formCustomInstructions: string | null = null;

  reviewTypeActive: ReviewTypesEnums | null = null;

  reviewGeneralProcessing: boolean = false;

  reviewCustomProcessing: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setFormPartySelected = (value: string | null) => {
    this.formPartySelected = value;
  };

  setFormCustomInstructions = (value: string | null) => {
    this.formCustomInstructions = value;
  };

  setSuggestionProperty = (indexSuggestion: number, values: SuggestionPropertyT) => {
    const expand = this.suggestionsNew.map((item, index) => {
      if (index === indexSuggestion) return { ...item, ...values };
      return item;
    });
    this.suggestionsNew = expand;
  };

  resetStore = () => {
    this.suggestionsNew = null;
    this.reviewTypeActive = null;
  };

  startReviewGeneral = async () => {
    this.clearSuggestions();
    this.reviewTypeActive = ReviewTypesEnums.GENERAL;
    this.reviewGeneralProcessing = true;
    this.getSuggestionGeneral();
  };

  startReviewCustom = async () => {
    this.clearSuggestions();
    this.reviewCustomProcessing = true;
    this.reviewTypeActive = ReviewTypesEnums.CUSTOM;
    this.getSuggestionsCustom();
  };

  getSuggestionGeneral = async (idQuery: string = undefined, repeatCount = 0) => {
    const REPEAT_LIMIT = 10;
    try {
      // const response = { data: fakeResponse, idQuery }; // mock
      const textContract = this.rootStore.documentStore.documentText;
      const party = this.formPartySelected;
      const response = isMockMode
        ? { data: fakeResponse, idQuery }
        : await api.contract.recommendationGeneral({
            id: idQuery,
            textContract,
            party,
          });
      const { partContract, partModified, id } = response.data[0];
      const isNeedRepeatQuery = partContract === null || partModified === null;
      if (isNeedRepeatQuery && REPEAT_LIMIT > repeatCount) {
        // eslint-disable-next-line no-undef
        setTimeout(() => {
          this.getSuggestionGeneral(id, repeatCount + 1);
        }, 20000);
      } else {
        runInAction(() => {
          this.suggestionsNew = response.data;
          this.reviewGeneralProcessing = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.suggestionsNew = null;
        this.reviewGeneralProcessing = false;
      });
    }
  };

  getSuggestionsCustom = async (idQuery: string = undefined, repeatCount = 0) => {
    const REPEAT_LIMIT = 10;
    try {
      const manualRequrement = this.formCustomInstructions;
      const party = this.formPartySelected;
      const textContract = this.rootStore.documentStore.documentText;
      const response = isMockMode
        ? { data: fakeResponse, idQuery }
        : await api.contract.recommendationCustom({
            id: idQuery,
            manualRequrement,
            textContract,
            party,
          });
      const { partContract, partModified, id } = response.data[0];
      const isNeedRepeatQuery = partContract === null || partModified === null;

      if (isNeedRepeatQuery && REPEAT_LIMIT > repeatCount) {
        // eslint-disable-next-line no-undef
        setTimeout(() => {
          this.getSuggestionsCustom(id, repeatCount + 1);
        }, 20000);
      } else {
        runInAction(() => {
          // this.suggestionsNew = fakeResponseCustom;
          this.suggestionsNew = response.data;
          this.reviewCustomProcessing = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.suggestionsNew = null;
        this.reviewCustomProcessing = false;
      });
    }
  };

  // dismissSuggestion = (index: number) => {
  //   if (Array.isArray(this.suggestionsNew)) {
  //     this.suggestionsNew = this.suggestionsNew.filter((_element, indexElement) => index !== indexElement);
  //   }
  // };

  requestParties = async () => {
    try {
      const documentText = this.rootStore.documentStore.documentText;
      if (documentText) {
        const response = await api.contract.parties({ textContract: documentText });
        const { parties } = response.data;
        runInAction(() => {
          this.parties = parties || null;
          this.formPartySelected = parties?.[0] ?? null;
        });
      }
      return "";
    } catch (error) {
      return "error";
    }
  };

  get isSuggestionExist() {
    const suggestions = this.suggestionsNew;
    return Array.isArray(suggestions) && suggestions.length > 0 ? true : false;
  }

  get computedIsExistUntouchedSuggestions() {
    return this.suggestionsNew?.some(
      (item) => (item.isApplyChange !== true || item.isApplyComment !== true) && item.isDismiss !== true
    );
  }

  clearSuggestions = () => {
    this.suggestionsNew = null;
  };
}

export default SuggestionsStore;
