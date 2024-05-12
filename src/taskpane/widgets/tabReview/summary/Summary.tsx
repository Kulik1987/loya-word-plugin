import React from "react";
import { observer } from "mobx-react";
import { Suggestion } from "../../suggestion";
import { Button } from "@fluentui/react-components";
// import fakeResponseAPI from "./mockResponseAPI";
import { useStores } from "../../../shared/store";

const Summary = () => {
  const { suggestionsStore } = useStores();

  const { suggestions } = suggestionsStore;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
        {suggestions?.map((data, key) => {
          return <Suggestion data={data} key={key} index={key} />;
        })}
      </div>
      <div>
        <Button
          appearance="primary"
          disabled={false}
          size="medium"
          // onClick={() => handleAddComment(targetText, commentText)}
          style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
        >
          Apply all
        </Button>
      </div>
    </div>
  );
};

export default observer(Summary);