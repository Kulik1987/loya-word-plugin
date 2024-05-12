import React, { useState } from "react";
import { Text, Button } from "@fluentui/react-components";

type ReviewVarianPropsType = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonTitle: string;
  onClickButton: () => void;
};

const ReviewVariantItem = (props: ReviewVarianPropsType) => {
  const { title, subtitle, icon, onClickButton, buttonTitle } = props;
  const [isOpenItem, setIsOpenItem] = useState(false);

  const handleOpenGeneral = () => {
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
      <section style={{ transition: "1s" }}>
        {isOpenItem && (
          <Button
            appearance="primary"
            disabled={false}
            size="medium"
            onClick={onClickButton}
            style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
          >
            {buttonTitle}
          </Button>
        )}
      </section>
    </div>
  );
};

export default ReviewVariantItem;
