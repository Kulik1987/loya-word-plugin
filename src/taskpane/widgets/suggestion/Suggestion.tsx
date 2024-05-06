/* global Word console */

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

type SuggestionPropT = {
  data: {
    targetText: string;
    suggestionText: string;
  };
};

const Suggestion = (props: SuggestionPropT) => {
  // const [text, setText] = useState<string>("Some text.");
  const { targetText, suggestionText } = props.data;
  const styles = useStyles();
  console.log({ targetText, suggestionText });

  // const getSelection = () => {
  //   return Word.run(function (context) {
  //     var range = context.document.getSelection();
  //     range.font.color = "red";
  //     range.load("text");

  //     return context.sync().then(function () {
  //       console.log('The selected text was "' + range.text + '".');
  //     });
  //   });
  // };

  const handleSearch = async (targetText: string) => {
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
  // const handleAddNote = async () => {
  //   // Создаем "примечание" в документе.
  //   await Word.run(async (context) => {
  //     const range = context.document.getSelection();
  //     const contentControl = range.insertContentControl();
  //     contentControl.tag = "note";
  //     contentControl.title = "Note Title";
  //     contentControl.insertText("Your note text goes here.", "End");
  //     contentControl.cannotEdit = true;
  //     contentControl.color = "green"; // Например, зеленый цвет для примечания
  //     await context.sync();
  //   });
  // };
  const handleAddNotes = async () => {
    // Sets a comment on the selected content.
    Word.run(async (context) => {
      // Получаем активный документ
      // var body = context.document.body;
      const range = context.document.getSelection();
      // Выбираем текст, куда вы хотите вставить комментарий
      // var range = body.getRange("End");

      // Вставляем комментарий
      var comment = range.insertComment("Ваш пользовательский комментарий здесь.");
      console.log("comment", comment);

      // Сохраняем изменения
      return context.sync().then(function () {
        console.log("Комментарий успешно добавлен.");
      });
    }).catch((error) => {
      console.log("Error: " + error);
    });
  };
  const handleAddComment = async () => {
    // Sets a comment on the selected content.
    await Word.run(async (context) => {
      const range = context.document.getSelection();
      const contentControl = range.insertContentControl();
      contentControl.tag = "note";
      contentControl.title = "Comment Title";
      // contentControl.appearance = "comment";
      contentControl.insertText("Your comment text goes here.", "End");
      contentControl.cannotEdit = true;
      // contentControl.color = "green";
      contentControl.insertHtml(
        '<div style="border-top: 1px solid red; background-color: yellow;">Your comment text goes here.</div>',
        "End"
      );
      await context.sync();
    });
  };

  const handleEdit = async (targetText: string, suggestionText: string) => {
    await Word.run(async (context) => {
      const body = context.document.body;
      const searchResults = body.search(targetText, { matchWholeWord: true });

      context.load(searchResults, "text");

      await context.sync();

      if (searchResults.items.length > 0) {
        searchResults.items[0].insertText(suggestionText, "Replace");
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <hr />
      <div>
        <Text weight="bold">Target: </Text>
        <Text>{targetText}</Text>
      </div>
      <div>
        <Text weight="bold">Suggestion: </Text>
        <Text>{suggestionText}</Text>
      </div>
      <div
        // className={styles.buttons}
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        <Button
          appearance="primary"
          disabled={false}
          size="large"
          onClick={() => handleEdit(targetText, suggestionText)}
        >
          Edit
        </Button>
        <Button appearance="primary" disabled={false} size="large" onClick={handleAddComment}>
          Add Comment
        </Button>
        <Button appearance="primary" disabled={false} size="large" onClick={handleAddNotes}>
          Add Notes
        </Button>
        <Button appearance="primary" disabled={false} size="large" onClick={() => handleSearch(targetText)}>
          Search text
        </Button>
        {/* <Button appearance="primary" disabled={false} size="large" onClick={handleAddNote}>
          handleAddNote
        </Button> */}
      </div>
      {/* <Button appearance="primary" disabled={false} size="large" onClick={getSelection}>
        Apply
      </Button> */}
    </div>
  );
};

export default Suggestion;
