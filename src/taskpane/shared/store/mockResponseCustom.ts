import { InsertPlaceEnum, LevelOfCriticalEnum } from "../enums/suggestion";
import { SuggestionT } from "../types";

const fakeResponseAPI: SuggestionT[] = [
  // {
  //   id: "1",
  //   levelOfCriticality: LevelOfCriticalEnum.HIGH,
  //   change: {
  //     isApplied: false,
  //     target: "действующего на основании Устава с одной стороны, и ___________________",
  //     text: " (для юридических лиц указываются полное наименование, организационно-правовая форма, ОГРН, место нахождения; для индивидуальных предпринимателей - фамилия, имя, отчество, основной государственный регистрационный номер индивидуального предпринимателя (ОГРНИП); для физических лиц - фамилия, имя, отчество, реквизиты документа, удостоверяющего личность, место жительства)",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  // },
  // {
  //   id: "2",
  //   levelOfCriticality: LevelOfCriticalEnum.MEDIUM,
  //   change: {
  //     isApplied: false,
  //     target: "заключили настоящий Договор о нижеследующем",
  //     text: "на основании протокола заседания Комиссии по закупкам № ___ от ______________ г., ",
  //     place: InsertPlaceEnum.BEFORE,
  //   },
  // },
  // {
  //   id: "3",
  //   levelOfCriticality: LevelOfCriticalEnum.MEDIUM,
  //   change: {
  //     isApplied: false,
  //     target: "отчетных документов определены Сторонами в",
  //     text: " Заданиях,",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  // },
  {
    id: "4",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "3 300 000 (Три миллиона триста тысяч) рублей 00 копеек",
      text: "Сумма.",
    },
  },
  // {
  //   id: "5",
  //   levelOfCriticality: LevelOfCriticalEnum.MEDIUM,
  //   change: {
  //     isApplied: false,
  //     target: "включая все налоги и сборы (далее – Цена Договора).",
  //     text: " НДС не облагается в связи с применением Исполнителем УСН (если применимо).",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  // },
  {
    id: "6",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "100%",
      text: "Процент.",
    },
  },
  {
    id: "7",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "10 (десяти) рабочих дней ",
      text: "Срок.",
    },
  },
  {
    id: "8",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "2 (двух) календарных дней",
      text: "Срок.",
    },
  },
  {
    id: "81",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "2 (двух) рабочих дней",
      text: "Срок.",
    },
  },
  // {
  //   id: "9",
  //   levelOfCriticality: LevelOfCriticalEnum.MEDIUM,
  //   change: {
  //     isApplied: false,
  //     target: "Предоставить Заказчику счет,",
  //     text: " счет-фактуру (если применимо),",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  // },
  {
    id: "10",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "2 (два) дня",
      text: "Срок.",
    },
  },
  {
    id: "11",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "В течение 2 (двух) рабочих дней ",
      text: "Срок.",
    },
  },
  {
    id: "12",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "5 (Пяти) рабочих дней",
      text: "Срок.",
    },
  },
  {
    id: "13",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "3 (Трех) рабочих дней ",
      text: "Срок.",
    },
  },
  // {
  //   id: "15",
  //   levelOfCriticality: LevelOfCriticalEnum.HIGH,
  //   change: {
  //     isApplied: false,
  //     target:
  //       "Объектом интеллектуальной собственности, создаваемым при оказании услуг/выполнении работ по настоящему Договору является __________",
  //     text: " (пункт 1 ст. 1225 ГК РФ содержит исчерпывающий перечень результатов интеллектуальной деятельности и приравненных к ним средств индивидуализации юридических лиц, товаров, работ, услуг и предприятий, которым предоставляется правовая охрана на основании и в порядке, которые предусмотрены частью четвертой ГК РФ)",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  // },
  // {
  //   id: "16",
  //   levelOfCriticality: LevelOfCriticalEnum.HIGH,
  //   change: {
  //     isApplied: false,
  //     target: "Исполнитель обязуется передать Заказчику исключительное право на __________",
  //     text: "(указывается наименование результата интеллектуальной деятельности или средства индивидуализации, а также автор и название (если есть)) ",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  // },
  // {
  //   id: "17",
  //   levelOfCriticality: LevelOfCriticalEnum.HIGH,
  //   change: {
  //     isApplied: false,
  //     target: "(далее - Объект интеллектуальной собственности, ОИС) в следующем порядке",
  //     text: "(указывается наименование результата интеллектуальной деятельности или средства индивидуализации, а также автор и название (если есть)) ",
  //     place: InsertPlaceEnum.BEFORE,
  //   },
  // },
  // {
  //   id: "18",
  //   levelOfCriticality: LevelOfCriticalEnum.HIGH,
  //   change: {
  //     isApplied: false,
  //     target: "(далее - Объект интеллектуальной собственности, ОИС) в следующем порядке",
  //     text: " (выбрать применимый вариант)",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  // },
  // {
  //   id: "19",
  //   levelOfCriticality: LevelOfCriticalEnum.HIGH,
  //   change: {
  //     isApplied: false,
  //     target: "по Акту приемки-передачи ОИС по форме Приложения № 4 к настоящему Договору",
  //     text: " (если передача экземпляра ОИС является возможной, например 'запись музыкального произведения/программы для ЭВМ на материальном носителе в виде CD/DVD', 'географическая карта на материальном носителе в виде бумажного листа формата А3' и т.п.)",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  // },
  // {
  //   id: "20",
  //   levelOfCriticality: LevelOfCriticalEnum.HIGH,
  //   change: {
  //     isApplied: false,
  //     target: "выслать Заказчику по адресу электронной почты: ______ ",
  //     text: " (электронная почта контактного лица со стороны Фонда) ",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  // },
  {
    id: "21",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "3 (трех) лет",
      text: "Срок.",
    },
  },
  {
    id: "22",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "0,1%",
      text: "Процент.",
    },
  },
  {
    id: "23",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "10 %",
      text: "Процент.",
    },
  },
  {
    id: "24",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "50 (пятидесяти)  процентов ",
      text: "Процент.",
    },
  },

  {
    id: "26",
    levelOfCriticality: LevelOfCriticalEnum.HIGH,
    change: {
      isApplied: false,
      target: "г. Санкт-Петербург",
      text: "г. Москвы",
      place: InsertPlaceEnum.REPLACE,
    },
  },
  {
    id: "26",
    levelOfCriticality: LevelOfCriticalEnum.HIGH,
    change: {
      isApplied: false,
      target: "города Санкт-Петербург",
      text: "города Москвы",
      place: InsertPlaceEnum.REPLACE,
    },
  },
  {
    id: "25",
    levelOfCriticality: LevelOfCriticalEnum.LOW,
    note: {
      isApplied: false,
      target: "до  31 декабря 2016г.",
      text: "Срок.",
    },
  },
  // {
  //   id: "",
  //   levelOfCriticality: LevelOfCriticalEnum.HIGH,
  //   change: {
  //     isApplied: false,
  //     target: "",
  //     text: "",
  //     place: InsertPlaceEnum.AFTER,
  //   },
  //   note: {
  //     isApplied: false,
  //     target: "",
  //     text: "",
  //   },
  // },
];

export default fakeResponseAPI;
