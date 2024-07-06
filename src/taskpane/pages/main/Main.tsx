import React from "react";
// import Header from "./components/Header";
// import HeroList, { HeroListItem } from "./HeroList";
import { HeaderMenu, TabDraft, TabReview } from "../../widgets";
import { makeStyles } from "@fluentui/react-components";
// import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";

// interface AppProps {
//   title?: string;
// }
import { useStores } from "../../shared/store";
import { MenuItemsEnums } from "../../shared/store/menu";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const Main = () => {
  const { menuStore } = useStores();
  const navigate = useNavigate();
  const styles = useStyles();

  const isTabReview = menuStore.currentMenuItem === MenuItemsEnums.REVIEW;
  const isTabDraft = menuStore.currentMenuItem === MenuItemsEnums.DRAFT;

  // const onClick = () => {
  //   navigate("./draft");
  // };
  return (
    <div className={styles.root}>
      <HeaderMenu />
      {/* <button onClick={onClick}>GOTO</button>
      <div style={{ padding: "24px 0" }}>
        {isTabReview && <TabReview />}
        {isTabDraft && <TabDraft />}
      </div> */}

      {/* <Header logo="assets/logo-filled.png" title={title} message="Welcome" /> */}
      {/* <HeroList message="Discover what this add-in can do for you today!" items={listItems} /> */}
    </div>
  );
};

export default observer(Main);
