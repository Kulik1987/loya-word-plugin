import { LevelOfCriticalEnum } from "../../enums";
import axios from "../instanceAxios";
import {
  PLUGIN_CONTRACT_PARTIES,
  PLUGIN_CONTRACT_RECOMMENDATION_GENERAL,
  PLUGIN_CONTRACT_RECOMMENDATION_CUSTOM,
} from "../routes";

export enum ProviderLLMEnums {
  "OPEN_AI" = "openai",
  "GIGA_CHAT" = "gigachat",
  "MISTRAL" = "mistral",
}

export type ContractPartiesPayloadT = {
  llm_provider: ProviderLLMEnums;
  text_contract: string;
};

export type ContractRecommendationGeneralPayloadT = {
  llm_provider: ProviderLLMEnums;
  id?: string | undefined;
  partie: string;
  text_contract: string;
};

export type ContractRecommendationCustomPayloadT = {
  llm_provider: ProviderLLMEnums;
  id?: string | undefined;
  partie: string;
  text_contract: string;
  manual_requrement: string;
};

export type ContractPartiesResponseT = {
  parties: string[];
};

export type ContractRecommendationResponseT = {
  id?: string;
  level_risk: LevelOfCriticalEnum;
  part_contract: string;
  part_modified: string;
  comment: string;
  type: string;
};

const contract = {
  parties: (data: ContractPartiesPayloadT) => {
    return axios.post<ContractPartiesResponseT>(PLUGIN_CONTRACT_PARTIES, data);
  },

  recommendationGeneral: (data: ContractRecommendationGeneralPayloadT) => {
    return axios.post<ContractRecommendationResponseT[]>(PLUGIN_CONTRACT_RECOMMENDATION_GENERAL, data);
  },

  recommendationCustom: (data: ContractRecommendationCustomPayloadT) => {
    return axios.post<ContractRecommendationResponseT[]>(PLUGIN_CONTRACT_RECOMMENDATION_CUSTOM, data);
  },
};

export default contract;
