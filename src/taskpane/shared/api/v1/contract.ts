import { LevelOfCriticalEnum } from "../../enums";
import axios from "../instanceAxios";
import {
  PLUGIN_CONTRACT_PARTIES,
  PLUGIN_CONTRACT_RECOMMENDATION_GENERAL,
  PLUGIN_CONTRACT_RECOMMENDATION_CUSTOM,
} from "../routes";

export type ContractPartiesPayloadT = {
  textContract: string;
};

export type ContractRecommendationGeneralPayloadT = {
  id?: string | undefined;
  party: string;
  textContract: string;
};

export type ContractRecommendationCustomPayloadT = {
  party: string;
  textContract: string;
  manualRequrement: string;
};

export type ContractPartiesResponseT = {
  parties: string[];
};

export type ContractRecommendationResponseT = {
  id?: string;
  levelRisk: LevelOfCriticalEnum;
  partContract: string;
  partModified: string;
  comment: string;
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
