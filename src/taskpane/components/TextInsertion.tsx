/* global Word console */

import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";
// import insertText from "../office-document";

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    marginLeft: "20px",
    marginTop: "30px",
    marginBottom: "20px",
    marginRight: "20px",
    maxWidth: "50%",
  },
});

const TextInsertion: React.FC = () => {
  const [text, setText] = useState<string>("Some text.");

  // const handleTextInsertion = async () => {
  //   await insertText(text);
  // };

  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const styles = useStyles();

  const getSelection = () => {
    return Word.run(function (context) {
      var range = context.document.getSelection();
      range.font.color = "red";
      range.load("text");

      return context.sync().then(function () {
        console.log('The selected text was "' + range.text + '".');
      });
    });
  };

  const handleSearch = async () => {
    // Does a basic text search and highlights matches in the document.
    await Word.run(async (context) => {
      console.log("context", context);

      const results = context.document.body.search("VALUE OF");
      console.log("results.items", results.items);

      results.load("length");
      console.log("results 2", results);

      await context.sync();

      // Let's traverse the search results and highlight matches.
      for (let i = 0; i < results.items.length; i++) {
        results.items[i].font.highlightColor = "yellow";
      }

      await context.sync();
    });
  };

  return (
    <div className={styles.textPromptAndInsertion}>
      <Field className={styles.textAreaField} size="large" label="Enter text to be inserted into the document.">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>Click the button to insert text.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleSearch}>
        SEARCH
      </Button>
      <Button appearance="primary" disabled={false} size="large" onClick={getSelection}>
        Get Selection
      </Button>
      {/* <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert text 232323
      </Button> */}
    </div>
  );
};

export default TextInsertion;
