import React, { ReactNode, useState } from "react";
import { Text } from "@fluentui/react-components";
import { observer } from "mobx-react";
// import { useStores } from "../../shared/store";

type ReviewVarianPropsType = {
  children: ReactNode;
  icon: ReactNode;
  title: string;
  subtitle: string;
  // buttonTitle: string;
  // onClickButton: () => void;
};

const ReviewSettingPanel = (props: ReviewVarianPropsType) => {
  const { children, title, subtitle, icon } = props;
  const [isOpenItem, setIsOpenItem] = useState(false);

  const handleOpenGeneral = async () => {
    setIsOpenItem((bool) => !bool);
  };

  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 3px 5px rgba(0, 0, 0, 0.25)",
      }}
    >
      <header
        style={{ display: "flex", gap: "16px", cursor: "pointer", userSelect: "none" }}
        onClick={handleOpenGeneral}
      >
        <div className="icon">{icon}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text size={400} weight="bold">
            {title}
          </Text>
          <Text size={300}>{subtitle}</Text>
        </div>
      </header>
      <section style={{ transition: "1s", display: "flex", flexDirection: "column", gap: "12px" }}>
        {isOpenItem && children}
      </section>
    </div>
  );
};

export default observer(ReviewSettingPanel);
