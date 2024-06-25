import React from "react";
// import Header from "./components/Header";
// import HeroList, { HeroListItem } from "./HeroList";
// import TextInsertion from "./components/TextInsertion";
// import { Suggestion } from "./widgets";
// import { Button, makeStyles } from "@fluentui/react-components";
// import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
// import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./navigation";
import { AuthProvider } from "./AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
