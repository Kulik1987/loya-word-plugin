import { makeAutoObservable, runInAction } from "mobx";
import type RootStore from ".";
import fakeResponse from "./mockResponseAPI";
import { ReviewTypesEnums } from "../enums";
import api from "../api/v1";
import { ContractRecommendationResponseT } from "../api/v1/contract";
import fakeResponsePartiesAPI from "./mockResponsePartiesAPI";

const APP_SET_MOCK = process.env.APP_SET_MOCK === "true";

type SuggestionPropertyT = {
  isDismiss?: boolean;
  isApplyChange?: boolean;
  isApplyComment?: boolean;
};

export type SuggestionT = ContractRecommendationResponseT & SuggestionPropertyT;

class SuggestionsStore {
  rootStore: RootStore;

  suggestionsNew: SuggestionT[] | null = null;

  parties: string[] | null = null;

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
    // await this.rootStore.documentStore.copyTextContractToStore();
    runInAction(() => {
      this.reviewTypeActive = ReviewTypesEnums.GENERAL;
      this.reviewGeneralProcessing = true;
    });
    this.getSuggestionGeneral();
  };

  startReviewCustom = async () => {
    this.clearSuggestions();
    // await this.rootStore.documentStore.copyTextContractToStore();
    runInAction(() => {
      this.reviewCustomProcessing = true;
      this.reviewTypeActive = ReviewTypesEnums.CUSTOM;
    });
    this.getSuggestionsCustom();
  };

  getSuggestionGeneral = async (idQuery: string = undefined, repeatCount = 0) => {
    const REPEAT_LIMIT = 10;
    try {
      // const response = { data: fakeResponse, idQuery }; // mock
      const textContract = this.rootStore.documentStore.textContractSource;
      const party = this.formPartySelected;
      const response = APP_SET_MOCK
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
      const textContract = this.rootStore.documentStore.textContractSource;
      const response = APP_SET_MOCK
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
      console.log("requestParties [start]");

      const textContractSource = this.rootStore.documentStore.textContractSource;

      if (textContractSource) {
        const response = APP_SET_MOCK
          ? { data: fakeResponsePartiesAPI }
          : await api.contract.parties({ textContract: textContractSource });
        const { parties } = response.data;
        runInAction(() => {
          this.parties = parties || null;
          this.formPartySelected = parties?.[0] ?? null;
        });
      }
      return "";
    } catch (error) {
      return "error";
    } finally {
      console.log("requestParties [final]");
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
