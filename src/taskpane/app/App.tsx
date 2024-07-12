import React from "react";
import { Navigation } from "./navigation";

const APP_SET_MOCK = process.env.APP_SET_MOCK === "true";
const APP_SET_ANONYMIZER = process.env.APP_SET_ANONYMIZER === "true";

console.log("Started config:", { APP_SET_MOCK, APP_SET_ANONYMIZER });

const App = () => <Navigation />;

export default App;
