/* global document, Office, module, require */
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { ThemeProvider, createTheme } from "@fluentui/react";

const rootElement: HTMLElement = document.getElementById("container");
const root = createRoot(rootElement);
const appTheme = createTheme({
  palette: {
    themePrimary: "#0078D4",
    themeLighterAlt: "#eff6fc",
    themeLighter: "#deecf9",
    themeLight: "#c7e0f4",
    themeTertiary: "#71afe5",
    themeSecondary: "#2b88d8",
    themeDarkAlt: "#106ebe",
    themeDark: "#005a9e",
    themeDarker: "#004578",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#c2c2c2",
    neutralSecondary: "#858585",
    neutralPrimaryAlt: "#4b4b4b",
    neutralPrimary: "#333333",
    neutralDark: "#272727",
    black: "#1d1d1d",
    white: "#ffffff",
  },
});
/* Render application after Office initializes */
Office.onReady(() => {
  root.render(
    <FluentProvider theme={webLightTheme}>
      <ThemeProvider theme={appTheme}>
        <App />
      </ThemeProvider>
    </FluentProvider>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./app/App", () => {
    const NextApp = require("./app/App").default;
    root.render(NextApp);
  });
}
