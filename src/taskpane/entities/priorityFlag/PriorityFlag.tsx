import * as React from "react";
import { LevelOfCriticalEnum } from "../../shared/enums/suggestion";

const PriorityFlag = ({ flag }: { flag: LevelOfCriticalEnum }) => {
  const state = {
    [LevelOfCriticalEnum.CRITICAL]: {
      color: "rgba(233, 20, 116, 1)",
      backgroundColor: "rgba(233, 20, 116, 0.25)",
    },
    [LevelOfCriticalEnum.HIGH]: {
      color: "rgba(234, 151, 21, 1)",
      backgroundColor: "rgba(234, 151, 21, 0.25)",
    },
    [LevelOfCriticalEnum.MEDIUM]: {
      color: "rgba(172, 192, 53, 0.8)",
      backgroundColor: "rgba(234, 237, 91, .251)",
    },
    [LevelOfCriticalEnum.LOW]: {
      color: "rgba(53, 191, 85, 1)",
      backgroundColor: "rgba(53, 191, 85, .251)",
    },
  };

  const stateStyle = state[flag];
  const { color, backgroundColor } = stateStyle ?? {};
  return (
    <div
      style={{
        borderWidth: "2px",
        borderRadius: "12px",
        borderStyle: "solid",
        padding: "0 8px",
        color: color,
        backgroundColor: backgroundColor,
        userSelect: "none",
        // backgroundColor: "#fff",
        // background: `rgba(${color}, 0.5)`,
      }}
    >
      {flag}
    </div>
  );
};

export default PriorityFlag;
