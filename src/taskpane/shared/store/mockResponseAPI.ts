import { InsertPlaceEnum, LevelOfCriticalEnum } from "../../shared/enums/suggestion";

const fakeResponseAPI = [
  {
    levelOfCriticality: LevelOfCriticalEnum.LOW,
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

export default fakeResponseAPI;
