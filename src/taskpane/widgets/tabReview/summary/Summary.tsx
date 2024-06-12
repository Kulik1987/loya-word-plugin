/* global Word console */
/// <reference types="office-js" />
import React from "react";
import { observer } from "mobx-react";
import { SuggestionCard } from "../../suggestionCard";
import { Button } from "@fluentui/react-components";
import { useStores } from "../../../shared/store";
import { DocumentHelpers } from "../../../shared/helpers";
// import { ContractRecommendationResponseT } from "../../../shared/api/v1/contract";

const Summary = () => {
  const { suggestionsStore } = useStores();

  const { isSuggestionExist, suggestionsNew } = suggestionsStore;

  const handleApplyAll = async () => {
    suggestionsNew.forEach(async (itemSuggestion, indexSuggestion) => {
      console.log("itemSuggestion", itemSuggestion);
      const { partContract, partModified, comment, isApplyChange, isApplyComment } = itemSuggestion;
      await Word.run(async (context) => {
        const range = await DocumentHelpers.findRange(context, partContract);
        if (!isApplyChange) range.insertText(partModified, "Replace");
        if (!isApplyComment) range.insertComment(comment);
      })
        .then(() => {
          suggestionsStore.setSuggestionProperty(indexSuggestion, {
            isApplyChange: true,
            isApplyComment: true,
          });
        })
        .catch((error) => {
          console.log("Error [handleApplyAll]: " + error);
        });
    });
    // const { levelRisk, comment, partModified, partContract } = suggestionsNew;
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
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
        {suggestionsNew?.map((data, index) => {
          return <SuggestionCard data={data} key={index} index={index} />;
        })}
      </div>
      {isSuggestionExist && (
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
      )}
    </div>
  );
};

export default observer(Summary);
