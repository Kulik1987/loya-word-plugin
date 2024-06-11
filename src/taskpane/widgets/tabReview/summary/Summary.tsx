// /* global Word console */
import React from "react";
import { observer } from "mobx-react";
import { SuggestionCard } from "../../suggestionCard";
// import { Button } from "@fluentui/react-components";
import { useStores } from "../../../shared/store";
// import { ContractRecommendationResponseT } from "../../../shared/api/v1/contract";

const Summary = () => {
  const { suggestionsStore } = useStores();

  const {
    // isSuggestionExist,
    suggestionsNew,
  } = suggestionsStore;

  // const handleApplyAll = () => {
  // const { suggestionsNew } = suggestionsStore;

  // const handleAddComment = async (suggestionsNew: ContractRecommendationResponseT) => {
  //   const { note } = suggestionsNew;
  //   const { target, text } = note;
  //   await Word.run(async (context) => {
  //     const body = context.document.body;
  //     const searchResults = body.search(target);

  //     context.load(searchResults, "text, font");

  //     await context.sync();

  //     if (searchResults.items.length > 0) {
  //       const foundItem = searchResults.items[0];
  //       foundItem.insertComment(text ?? "");
  //     } else {
  //       console.log("[handleAddComment]: Фрагмент текста не найден.");
  //     }
  //   }).catch((error) => {
  //     console.log("Error: " + error);
  //   });
  // };

  // const handleApplyChange = async (suggestion: SuggestionT) => {
  // const { change } = suggestion;
  // const { target, text, place } = change;
  // await Word.run(async (context) => {
  //   const body = context.document.body;
  //   const searchResults = body.search(target);

  //   context.load(searchResults, "text");

  //   await context.sync();

  //   if (searchResults.items.length > 0) {
  //     searchResults.items[0].insertText(text, place);
  //   } else {
  //     console.log("[handleApplyChange]: Фрагмент текста не найден.");
  //   }
  // });
  // };

  // suggestionsNew.forEach((suggestion) => {
  //   handleApplyChange(suggestion);
  //   handleAddComment(suggestion);
  // });
  // };

  /// test
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
        {suggestionsNew?.map((data, index) => {
          return <SuggestionCard data={data} key={index} index={index} />;
        })}
      </div>
      {/* {isSuggestionExist && (
        <div>
          <Button
            appearance="primary"
            disabled={false}
            size="medium"
            onClick={handleApplyAll}
            style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
          >
            Apply all
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default observer(Summary);
