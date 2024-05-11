import React from "react";
// import { Button } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { Suggestion } from "../suggestion";
import { InsertPlaceEnum, LevelOfCriticalEnum } from "../suggestion/Suggestion";
// import { useStores } from "../../shared/store";
// import { MenuItemsEnums } from "../../shared/store/menu";

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
];

const TabReview = () => {
  // const { menuStore } = useStores();

  // const handleClick = (name: MenuItemsEnums) => {
  //   menuStore.setMenuItem(name);
  // };

  return (
    <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
      {fakeResponseAPI.map((data, key) => {
        return <Suggestion data={data} key={key} />;
      })}
    </div>
  );
};

export default observer(TabReview);
