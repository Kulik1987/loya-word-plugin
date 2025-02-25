import React from "react";
import { Navigation } from "./navigation";

const APP_SET_MOCK = process.env.APP_SET_MOCK === "true";
const APP_SET_ANONYMIZER = process.env.APP_SET_ANONYMIZER === "true";

const APP_LLM_MODEL = process.env.APP_LLM_MODEL;

console.log("Started config:", { APP_SET_MOCK, APP_SET_ANONYMIZER, APP_LLM_MODEL });

const App = () => <Navigation />;

export default App;
