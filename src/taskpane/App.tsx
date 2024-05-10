import * as React from "react";
// import Header from "./components/Header";
// import HeroList, { HeroListItem } from "./HeroList";
// import TextInsertion from "./components/TextInsertion";
import { Suggestion } from "./widgets";
import { Button, makeStyles } from "@fluentui/react-components";
// import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { LevelOfCriticalEnum, InsertPlaceEnum } from "./widgets/suggestion/Suggestion";

interface AppProps {
  title?: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props: AppProps) => {
  const { title } = props;
  console.log(title);

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
  const fakeResponseAPI = [
    {
      levelOfCriticality: LevelOfCriticalEnum.HIGH,
      targetText: "настоящий Договор утрачивает свою силу и считается недействительным",
      change: {
        text: ", за исключением случаев, когда Арендатор выполняет обязательства в течение 30 дней после указанного срока",
        place: InsertPlaceEnum.AFTER,
      },
      note: {
        text: "В договоре должен быть предусмотрен определенный льготный период для выполнения арендатором своих обязательств",
      },
    },
    {
      levelOfCriticality: LevelOfCriticalEnum.HIGH,
      targetText:
        "Арендодатель вправе в любое время отказаться от настоящего Договора, предупредив об этом Арендатора за две недели",
      change: {
        text: "Арендодатель вправе в любое время отказаться от настоящего Договора, предупредив об этом Арендатора за один месяц",
        place: InsertPlaceEnum.REPLACE,
      },
      note: {
        text: "Срок уведомления о расторжении договора должен быть увеличен, чтобы защитить интересы арендатора.",
      },
    },
    // {
    //   levelOfCriticality: "low",
    //   targetText: "VALUE OF",
    //   suggestionText:
    //     "Reprehenderit mollitia cupiditate cumque, alias maxime doloremque unde minima est, tempora, voluptatum tenetur suscipit aliquam? Repellendus illo earum molestiae.",
    // },
  ];

  const handleStartReview = () => {};

  return (
    <div className={styles.root}>
      {/* <Button appearance="primary" disabled={false} size="large" onClick={handleStartReview}>
        Start Review
      </Button> */}
      {/* <Header logo="assets/logo-filled.png" title={title} message="Welcome" /> */}
      {/* <HeroList message="Discover what this add-in can do for you today!" items={listItems} /> */}
      {fakeResponseAPI.map((data, key) => {
        return <Suggestion data={data} key={key} />;
      })}
      {/* <TextInsertion /> */}
    </div>
  );
};

export default App;
