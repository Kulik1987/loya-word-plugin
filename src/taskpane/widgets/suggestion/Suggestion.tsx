/* global Word console */
/// <reference types="office-js" />
import * as React from "react";
// import { useState } from "react";
import { Button, Text, makeStyles } from "@fluentui/react-components";
// import css from "./styles";

const useStyles = makeStyles({
  wrapper: {
    paddingTop: "25px",
    paddingBottom: "25px",
    paddingLeft: "25px",
    paddingRight: "25px",
  },
  // buttons: {
  //   display: "flex",
  //   gap: "16px",
  // },
});

export enum LevelOfCriticalEnum {
  "CRITICAL" = "CRITICAL",
  "HIGH" = "HIGH",
  "LOW" = "LOW",
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

  const styles = useStyles();

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
    <div className={styles.wrapper}>
      <hr />
      <div>High</div>
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
        // className={styles.buttons}
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        <Button appearance="outline" disabled={false} size="small" onClick={() => handleShowInDocument(targetText)}>
          Show
        </Button>
        {isChangeExist && (
          <Button appearance="primary" disabled={false} size="large" onClick={handleApplyChange}>
            Apply change
          </Button>
        )}
        {isNoteExist && (
          <Button
            appearance="primary"
            disabled={false}
            size="large"
            onClick={() => handleAddComment(targetText, commentText)}
          >
            Add comment
          </Button>
        )}
        <Button appearance="primary" disabled={false} size="large" onClick={handleDismiss}>
          Dismiss
        </Button>
      </div>
    </div>
  );
};

export default Suggestion;
