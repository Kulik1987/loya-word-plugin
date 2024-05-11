/* global Word console */
/// <reference types="office-js" />
import * as React from "react";
// import { useState } from "react";
import {
  Button,
  Text,
  // makeStyles
} from "@fluentui/react-components";
import { DismissFilled, LocationRippleRegular } from "@fluentui/react-icons";
import { PriorityFlag } from "../../entities";

// const useStyles = makeStyles({
// wrapper: {
//   paddingTop: "25px",
//   paddingBottom: "25px",
//   paddingLeft: "25px",
//   paddingRight: "25px",
// },
// buttons: {
//   display: "flex",
//   gap: "16px",
// },
// });

export enum LevelOfCriticalEnum {
  "CRITICAL" = "Critical",
  "HIGH" = "High",
  "MEDIUM" = "Medium",
  "LOW" = "Low",
}

export enum InsertPlaceEnum {
  "AFTER" = "After",
  "BEFORE" = "Before",
  "REPLACE" = "Replace",
}

type SuggestionPropT = {
  data: {
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
};

const Suggestion = (props: SuggestionPropT) => {
  // const [text, setText] = useState<string>("Some text.");
  const { targetText, note, change } = props.data;
  const { data } = props;

  const changeText = change?.text;
  const commentText = note?.text;

  const isChangeExist = !!changeText;
  const isNoteExist = !!commentText;

  // const styles = useStyles();

  const handleShowInDocument = async (targetText: string) => {
    // Does a basic text search and highlights matches in the document.
    await Word.run(async (context) => {
      const body = context.document.body;
      const searchResults = body.search(targetText, { matchCase: false, matchWholeWord: true });

      context.load(searchResults, "text, font");

      await context.sync();

      if (searchResults.items.length > 0) {
        const firstResult = searchResults.items[0];
        // firstResult.font.highlightColor = "yellow";
        firstResult.select();
      }
    });
  };

  const handleAddComment = async (targetText: string, commentText: string) => {
    await Word.run(async (context) => {
      const body = context.document.body;
      const searchResults = body.search(targetText, { matchCase: false, matchWholeWord: true });

      context.load(searchResults, "text, font");

      await context.sync();

      if (searchResults.items.length > 0) {
        const foundItem = searchResults.items[0];
        foundItem.insertComment(commentText ?? "");
      } else {
        console.log("Фрагмент текста не найден.");
      }
    }).catch((error) => {
      console.log("Error: " + error);
    });
  };

  // const handleAddComment = async () => {
  //   // Sets a comment on the selected content.
  //   await Word.run(async (context) => {
  //     const range = context.document.getSelection();
  //     const contentControl = range.insertContentControl();
  //     contentControl.tag = "note";
  //     contentControl.title = "Comment Title";
  //     // contentControl.appearance = "comment";
  //     contentControl.insertText("Your comment text goes here.", "End");
  //     contentControl.cannotEdit = true;
  //     // contentControl.color = "green";
  //     contentControl.insertHtml(
  //       '<div style="border-top: 1px solid red; background-color: yellow;">Your comment text goes here.</div>',
  //       "End"
  //     );
  //     await context.sync();
  //   });
  // };

  const handleApplyChange = async () => {
    const { targetText, change } = data;
    const { text: changeText, place } = change;
    // const
    await Word.run(async (context) => {
      const body = context.document.body;
      const searchResults = body.search(targetText, { matchWholeWord: true });

      context.load(searchResults, "text");

      await context.sync();

      if (searchResults.items.length > 0) {
        searchResults.items[0].insertText(changeText, place);
      }
    });
  };

  const handleDismiss = () => {
    console.log("dismiss");
  };

  return (
    <div style={{ border: "1px solid grey", borderRadius: "8px", padding: "8px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PriorityFlag flag={data.levelOfCriticality} />
        <Button
          appearance="subtle"
          size="small"
          iconPosition="after"
          onClick={handleDismiss}
          icon={<DismissFilled fontSize={"1em"} color="grey" />}
          // style={{ borderColor: "grey", borderWidth: "2px" }}
        >
          Dismiss
        </Button>
      </div>
      <div>
        <Text weight="bold">Target: </Text>
        <Text>{targetText}</Text>
      </div>
      <div>
        <Text weight="bold">ChangeText: </Text>
        <Text>{changeText}</Text>
      </div>
      <div>
        <Text weight="bold">NoteText: </Text>
        <Text>{commentText}</Text>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "16px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Button
            appearance="outline"
            size="medium"
            onClick={() => handleShowInDocument(targetText)}
            icon={<LocationRippleRegular color="#0f6cbd" />}
            style={{ borderColor: "#0f6cbd", borderWidth: "2px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          {isChangeExist && (
            <Button
              appearance="primary"
              disabled={false}
              size="medium"
              onClick={handleApplyChange}
              style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
            >
              Apply change
            </Button>
          )}
          {isNoteExist && (
            <Button
              appearance="primary"
              disabled={false}
              size="medium"
              onClick={() => handleAddComment(targetText, commentText)}
              style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
            >
              Add comment
            </Button>
          )}
        </div>
        {/* <div>
          <Button
            appearance="subtle"
            size="small"
            iconPosition="after"
            onClick={handleDismiss}
            icon={<DismissFilled fontSize={"1em"} color="grey" />}
            // style={{ borderColor: "grey", borderWidth: "2px" }}
          >
            Dismiss
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Suggestion;
