import { replacer } from "./common";

const removeContract = (inputString: string): string => {
  let text = inputString;

  // Contract
  const patternContract =
    /(?<=\b(?:Договор|Контракт|Акт|Счет|Заказ|Заявка|Приказ|Протокол|Банковская\sгарантия|Уведомление|Распоряжение|Свидетельство|Паспорт|Платежное\sпоручение|Справка|Накладная|Реестр|Соглашение|Постановление|Решение|Претензия|Апелляция|Заявление|Устав|Патент|Сертификат|Доверенность)\s№\s?)\d+|(?<=Регистрационный\sномер\s)\d+|(?<=Регистрационный\s№\s?)\d+|(?<=Рег\s№\s?)\d+|(?<=№\d{2}-\d{2})\d+|(?<=№\d{4}-)\d{2}|(?<=№)\d{2}\/\d+/;
  const replacementText = "Договор №**********";
  text = replacer(text, patternContract, replacementText);

  return text;
};

export { removeContract };
