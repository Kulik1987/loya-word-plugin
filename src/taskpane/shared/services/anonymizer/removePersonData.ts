import { replacer } from "./common";

const removePersonData = (inputString: string): string => {
  let text = inputString;
  // Name
  const patternName =
    /(?:[А-Я][а-я]+(?:-[А-Я][а-я]+)?\s+[А-Я][а-я]+(?:-[А-Я][а-я]+)?\s+[А-Я][а-я]+(?:-[А-Я][а-я]+)?|[А-Я][а-я]+(?:-[А-Я][а-я]+)?\s+[А-Я]\.\s+[А-Я]\.|[А-Я]\.[А-Я]\.\s+[А-Я][а-я]+(?:-[А-Я][а-я]+)?|[А-Я][а-я]+(?:-[А-Я][а-я]+)?\s+[А-Я]\.\s+[А-Я]\.|[А-Я]\.\s+[А-Я]\.\s+[А-Я][а-я]+(?:-[А-Я][а-я]+)?|[А-Я]\.\s+[А-Я]\.\s+[А-Я][а-я]+(?:-[А-Я][а-я]+)?\s+[А-Я]\.\s+[А-Я]\.|[А-Я]\.[А-Я]\.\s+[А-Я][а-я]+(?:-[А-Я][а-я]+)?|[А-Я][а-я]+(?:-[А-Я][а-я]+)?[А-Я]\.\s+[А-Я]\.|[А-Я][а-я]+(?:-[А-Я][а-я]+)?\s+[А-Я]\.[А-Я]\.)/;
  const replacementName = "**** ****";
  text = replacer(text, patternName, replacementName);

  //Passport
  const patternPassport = /\b\d{4}\s\d{6}\b/;
  const replacementPassport = "**** ****";
  text = replacer(text, patternPassport, replacementPassport);

  // Email
  /** @error - не работает регулярка*/
  const patternEmail = /[a-zA-Z0-9._%+-]+(?=@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?=\s|\p{Punct}))/;
  const replacementEmail = "email@example.com";
  text = replacer(text, patternEmail, replacementEmail);

  // Phone
  const patternPhone =
    /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}|\+7 \d{3} \d{3}-\d{2}-\d{2}|\+7 \d{3} \d{3} \d{2} \d{2}|\+7-\d{3}-\d{3}-\d{2}-\d{2}|\+7 \(\d{3}\) \d{3} \d{2} \d{2}|8 \(\d{3}\) \d{3}-\d{2}-\d{2}|8 \d{3} \d{3}-\d{2}-\d{2}|8 \d{3} \d{3} \d{2} \d{2}|8-\d{3}-\d{3}-\d{2}-\d{2}|8 \(\d{3}\) \d{3} \d{2} \d{2}|\(\d{3}\) \d{3}-\d{2}-\d{2}|\d{3} \d{3}-\d{2}-\d{2}|\d{3} \d{3} \d{2} \d{2}|\(\d{3}\) \d{3} \d{2} \d{2}|\d{11}|\+7\d{10}|\+7\s\d{3}-\d{3}-\d{2}-\d{2}|8\d{10}|\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}|8\s\d{3}-\d{3}-\d{2}-\d{2}|\(\d{4}\)\s\d{2}-\d{2}-\d{3}|\d{4}-\d{2}-\d{3}|8\s\d{4}\s\d{2}\s\d{3}|\+7\s\d{4}\s\d{2}\s\d{3}|\d{2}-\d{2}-\d{4}/;
  const replacementPhone = "**********";
  text = replacer(text, patternPhone, replacementPhone);

  // Postal code 6 цифп
  const patternPostalCode = /\b\d{6}\b/;
  const replacementPostalCode = "******";
  text = replacer(text, patternPostalCode, replacementPostalCode);

  return text;
};

export { removePersonData };
