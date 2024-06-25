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

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const Main = () => {
  const { menuStore } = useStores();
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  // const listItems: HeroListItem[] = [
  //   {
  //     icon: <Ribbon24Regular />,
  //     primaryText: "Achieve more with Office integration",
  //   },
  //   {
  //     icon: <LockOpen24Regular />,
  //     primaryText: "Unlock features and functionality",
  //   },
  //   {
  //     icon: <DesignIdeas24Regular />,
  //     primaryText: "Create and visualize like a pro",
  //   },
  // ];

  const isTabReview = menuStore.currentMenuItem === MenuItemsEnums.REVIEW;
  const isTabDraft = menuStore.currentMenuItem === MenuItemsEnums.DRAFT;

  return (
    <div className={styles.root}>
      <HeaderMenu />

      <div style={{ padding: "24px 0" }}>
        {isTabReview && <TabReview />}
        {isTabDraft && <TabDraft />}
      </div>

      {/* <Header logo="assets/logo-filled.png" title={title} message="Welcome" /> */}
      {/* <HeroList message="Discover what this add-in can do for you today!" items={listItems} /> */}
    </div>
  );
};

export default observer(Main);
