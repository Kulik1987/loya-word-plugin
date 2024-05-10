import * as React from "react";
// import { useState } from "react";
// import { Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";
// import insertText from "../office-document";
// import styles from "./styles";
import { Button, makeStyles } from "@fluentui/react-components";

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

const MyButton = () => {
  const styles = useStyles();
  return <Button className={styles.wrapper}>Кнопка</Button>;
};

export default MyButton;
