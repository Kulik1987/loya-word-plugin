import { InsertPlaceEnum, LevelOfCriticalEnum } from "../../shared/enums/suggestion";

export type SuggestionT = {
  id: string;
  levelOfCriticality: LevelOfCriticalEnum;
  // targetText: string;
  change?: {
    target?: string;
    text?: string;
    place?: InsertPlaceEnum;
  };
  note?: {
    target?: string;
    text?: string;
  };
};
