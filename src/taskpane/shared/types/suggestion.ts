import { InsertPlaceEnum, LevelOfCriticalEnum } from "../../shared/enums/suggestion";

export type SuggestionT = {
  id: string;
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
