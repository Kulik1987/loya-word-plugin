import { makeAutoObservable, runInAction } from "mobx";
import type RootStore from ".";
// import fakeResponseGeneral from "./mockResponseGeneral";
import fakeResponseCustom from "./mockResponseGeneralAPI";
import { ReviewTypesEnums } from "../../shared/enums";
import { SuggestionT } from "../../shared/types";
import api from "../api/v1";
import { ContractRecommendationResponseT } from "../api/v1/contract";

class SuggestionsStore {
  rootStore: RootStore;

  suggestions: SuggestionT[] | null = null; //deprecated

  suggestionsNew: ContractRecommendationResponseT[] | null = null;

  // parties: string[] | null = ["1", "2"];
  parties: string[] | null = null;

  formPartySelected: string | null = null;

  formCustomInstructions: string | null = null;

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

  setFormPartySelected = (value: string | null) => {
    this.formPartySelected = value;
  };

  setFormCustomInstructions = (value: string | null) => {
    this.formCustomInstructions = value;
  };

  resetStore = () => {
    this.suggestions = null;
    this.reviewTypeActive = null;
    // this.
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
      const textDocument = this.rootStore.documentStore.documentText;
      const party = this.formPartySelected;
      console.log("====== General", { textDocument, party });
      const response = await api.contract.recommendationGeneral({
        id: idQuery,
        textContract: textDocument,
        party: this.formPartySelected,
      });
      const { levelRisk, partContract, comment, id } = response.data[0];
      const isNeedRepeatQuery = levelRisk === null || partContract === null || comment === null;
      if (isNeedRepeatQuery && REPEAT_LIMIT > repeatCount) {
        // eslint-disable-next-line no-undef
        setTimeout(() => {
          this.getSuggestionGeneral(id, repeatCount + 1);
        }, 20000);
      } else {
        runInAction(() => {
          // this.suggestionsNew = fakeResponseCustom;
          this.suggestionsNew = response.data;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.suggestions = null;
        console.log("error");
      });
    } finally {
      runInAction(() => {
        this.reviewGeneralProcessing = false;
      });
    }
  };

  getSuggestionsCustom = async () => {
    try {
      const party = this.formPartySelected;
      const manualRequrement = this.formCustomInstructions;
      const textContract = this.rootStore.documentStore.documentText;
      console.log("====== Custom", { textContract, party, manualRequrement });
      const response = await api.contract.recommendationCustom({
        manualRequrement,
        textContract,
        party: this.formPartySelected,
      });
      runInAction(() => {
        this.suggestionsNew = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.suggestions = null;
        console.log("error");
      });
    } finally {
      runInAction(() => {
        this.reviewCustomProcessing = false;
      });
    }
  };
  // setIsReviewProcessing = (name: ReviewTypesEnums | null) => {
  //   this.reviewProcessing = name;
  // };

  // getSuggestions = (response: SuggestionT[]) => {
  //   // eslint-disable-next-line no-undef
  //   setTimeout(() => {
  //     this.suggestions = response;
  //     this.reviewGeneralProcessing = false;
  //     this.reviewCustomProcessing = false;
  //   }, 5000);
  // };

  dismissSuggestion = (index: number) => {
    if (Array.isArray(this.suggestionsNew)) {
      this.suggestionsNew = this.suggestionsNew.filter((_element, indexElement) => index !== indexElement);
    }
  };

  requestParties = async () => {
    try {
      console.log("requestParties...");
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
    const suggestions = this.suggestions;
    return Array.isArray(suggestions) && suggestions.length > 0 ? true : false;
  }

  clearSuggestions = () => {
    this.suggestions = null;
  };
}

export default SuggestionsStore;
