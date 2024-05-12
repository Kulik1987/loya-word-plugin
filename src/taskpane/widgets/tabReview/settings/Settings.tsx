import React, { useState } from "react";
import { observer } from "mobx-react";
import { Fire24Regular, Settings24Regular } from "@fluentui/react-icons";
import { Text, Button } from "@fluentui/react-components";

const Settings = () => {
  const [isOpenGeneral, setIsOpenGeneral] = useState(false);

  const handleOpenGeneral = () => {
    setIsOpenGeneral((bool) => !bool);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="selectReview">
        <div
          className="selectReviewItem"
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
            <div className="icon">
              <Fire24Regular color="grey" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text size={400} weight="bold">
                General
              </Text>
              <Text size={300}>Scan for obvious risks and issues</Text>
            </div>
          </header>
          <section style={{ transition: "1s" }}>
            {isOpenGeneral && (
              <Button
                appearance="primary"
                disabled={false}
                size="medium"
                // onClick={() => handleAddComment(targetText, commentText)}
                style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
              >
                Start review
              </Button>
            )}
          </section>
        </div>

        <div
          className="selectReviewItem"
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
            <div className="icon">
              <Settings24Regular color="grey" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text size={400} weight="bold">
                Custom
              </Text>
              <Text size={300}>Scan for obvious risks and issues</Text>
            </div>
          </header>
          <section style={{ transition: "1s" }}>
            {isOpenGeneral && (
              <Button
                appearance="primary"
                disabled={false}
                size="medium"
                // onClick={() => handleAddComment(targetText, commentText)}
                style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
              >
                Start review
              </Button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default observer(Settings);
