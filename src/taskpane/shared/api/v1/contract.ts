import axios from "../instanceAxios";
import { PLUGIN_CONTRACT_PARTIES, PLUGIN_CONTRACT_RECOMMENDATION } from "../routes";

export type ContractPartiesPayloadT = {
  textContract: string;
};

export type ContractPartiesResponseT = {
  parties: string[];
};

export type ContractRecommendationPayloadT = {
  textContract: string;
};

export type ContractRecommendationResponseT = {
  levelRisk: string;
  partContract: string;
  partModified: string;
  comment: string;
};

const contract = {
  parties: (data: ContractPartiesPayloadT) => {
    return axios.post<ContractPartiesResponseT>(PLUGIN_CONTRACT_PARTIES, data);
  },

  recommendation: (data: ContractRecommendationPayloadT) => {
    return axios.post<ContractRecommendationResponseT[]>(PLUGIN_CONTRACT_RECOMMENDATION, data);
  },
};

export default contract;
