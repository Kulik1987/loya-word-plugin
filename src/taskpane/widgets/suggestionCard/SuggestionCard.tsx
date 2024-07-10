/* global Word console */
/// <reference types="office-js" />
import React from "react";
import { useStores } from "../../shared/store";

import { Button, Text, Tooltip } from "@fluentui/react-components";
import { DismissFilled, LocationRippleRegular } from "@fluentui/react-icons";
import { PriorityFlag } from "../../entities";

import { DocumentHelpers } from "../../shared/helpers";
import { SuggestionT } from "../../shared/store/suggestions";
import { observer } from "mobx-react";

type SuggestionPropT = {
  index: number;
  data: SuggestionT;
};

const T = {
  buttonDismiss: {
    ru: "Удалить",
    en: "Dismiss",
  },
  buttonLocation: {
    ru: "Найти в тексте",
    en: "Search a location",
  },
  labelChange: {
    ru: "Правка",
    en: "Change",
  },
  labelComment: {
    ru: "Комментарий",
    en: "Comment",
  },
  buttonChange: {
    ru: "Применить правку",
    en: "Apply change",
  },
  buttonComment: {
    ru: "Добавить комментарий",
    en: "Add comment",
  },
};

const SuggestionCard = (props: SuggestionPropT) => {
  const { suggestionsStore, menuStore } = useStores();
  const { locale } = menuStore;

  const { data, index: indexSuggestion } = props;

  const { levelRisk, comment, partModified, partContract, isApplyChange, isApplyComment, isDismiss } = data;

  const changeText = partModified;
  const commentText = comment;

  const isChangeExist = !!changeText;
  const isNoteExist = !!commentText;

  const handleShowInDocument = async () => {
    await Word.run(async (context) => {
      const searchText = !isApplyChange ? partContract : partModified;
      const findRange = await DocumentHelpers.findRange(context, searchText);
      findRange.select();
    }).catch((error) => {
      console.log("Error [handleShowInDocument]: " + error);
    });
  };

  const handleApplyChange = async () => {
    await Word.run(async (context) => {
      DocumentHelpers.applyChange(context, partContract, partModified);
      context.sync();
    })
      .then(() => {
        suggestionsStore.setSuggestionProperty(indexSuggestion, { isApplyChange: true });
      })
      .catch((error) => {
        console.log("Error [handleApplyChange]: " + error);
      });
  };

  const handleAddComment = async () => {
    await Word.run(async (context) => {
      const searchText = !isApplyChange ? partContract : partModified;
      DocumentHelpers.applyComment(context, searchText, commentText);
      context.sync();
    })
      .then(() => {
        suggestionsStore.setSuggestionProperty(indexSuggestion, { isApplyComment: true });
      })
      .catch((error) => {
        console.log("Error [handleAddComment]: " + error);
      });
  };

  const handleDismiss = () => {
    suggestionsStore.setSuggestionProperty(indexSuggestion, { isDismiss: true });
    // suggestionsStore.dismissSuggestion(indexSuggestion);
  };

  if (isDismiss) return null;
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PriorityFlag flag={levelRisk} />
        <Button
          appearance="subtle"
          size="small"
          iconPosition="after"
          onClick={handleDismiss}
          icon={<DismissFilled fontSize={"1em"} color="grey" />}
        >
          {T.buttonDismiss[locale]}
        </Button>
      </div>
      {partModified && (
        <div>
          <Text weight="bold">{T.labelChange[locale]} </Text>
          <Text>{partModified}</Text>
        </div>
      )}
      {comment && (
        <div>
          <Text weight="bold">{T.labelComment[locale]} </Text>
          <Text>{comment}</Text>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "12px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Tooltip content={T.buttonLocation[locale]} relationship="label">
            <Button
              appearance="outline"
              size="medium"
              onClick={handleShowInDocument}
              icon={<LocationRippleRegular color="#0f6cbd" />}
              style={{ borderColor: "#0f6cbd", borderWidth: "2px" }}
            />
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          {!isApplyChange && isChangeExist && (
            <Button
              appearance="primary"
              size="medium"
              onClick={handleApplyChange}
              style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
            >
              {T.buttonChange[locale]}
            </Button>
          )}
          {!isApplyComment && isNoteExist && (
            <Button
              appearance="primary"
              size="medium"
              onClick={handleAddComment}
              style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
            >
              {T.buttonComment[locale]}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(SuggestionCard);
