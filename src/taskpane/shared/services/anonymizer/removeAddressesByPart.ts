const removeAddressesByPart = (inputString: string): string => {
  let text = inputString;

  // city
  text = text.replace(/(?<=(?:г\.?\s?|город\s?))(?:[А-ЯЁ][а-яё]+(?:[ -][А-ЯЁ][а-яё]+)*)/g, "******");

  // other city
  text = text.replace(/(?<=(?:н\.п\.?\s?|населенный\s*пункт\s?))(?:[А-ЯЁ][а-яё]+(?:[ -][А-ЯЁ][а-яё]+)*)/g, "*********");

  // highway
  text = text.replace(
    /(?<=(?:шоссе\s?|ш\.?\s?))(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*)|(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*\s?шоссе)/g,
    "********"
  );

  // Street
  text = text.replace(/(?<=(?:\bул\.?\s?|ул\.|улица\s?))(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*)/g, "**********");

  // Prospekt
  text = text.replace(
    /(?<=(?:\bпр-т\.?\s?|пр-т\.|проспект\s?))(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*)|(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*\s?(?:пр-т\.?\s?|пр-т\.|проспект\s?))/g,
    "**********"
  );

  // Pereulok
  text = text.replace(
    /(?<=(?:\bпер\.?\s?|пер\.|переулок\s?))(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*)|(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*\s?(?:пер\.?\s?|пер\.|переулок))/g,
    "**********"
  );

  // Proezd
  text = text.replace(
    /(?<=(?:\bпроезд\s?|пр-д\s?|пр-зд\s?|пр\.\s?|пр-д|пр-зд|пр\.))(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*)|(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*\s?(?:проезд|пр-д|пр-зд|пр\.))/g,
    "**********"
  );

  // Bulevar
  text = text.replace(
    /(?<=(?:\bб-р\.\s?|б-р\.|бульвар\s?))(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*)|(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*\s?(?:б-р\.\s?|б-р\.|бульвар))/g,
    "**********"
  );

  // Square
  text = text.replace(
    /(?<=(?:\bпл\.\s?|пл\.|площадь\s?))(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*)|(?:[А-ЯЁа-яё0-9]+(?:[ -][А-ЯЁа-яё0-9]+)*\s?(?:пл\.\s?|пл\.|площадь))/g,
    "**********"
  );

  // House
  text = text.replace(/(?<=(?:\bд\.\s?|д\.|дом\s?))(?:\d+[а-я]?)|(?:\d+[а-я]?\s?(?:д\.\s?|д\.|дом))/g, "**********");

  // korp
  text = text.replace(
    /(?<=(?:\bкорп\.\s?|корп\.|корпус\s?))(?:\d+[а-я]?)|(?:\d+[а-я]?\s?(?:корп\.\s?|корп\.|корпус))/g,
    "**********"
  );

  // build
  text = text.replace(
    /(?<=(?:\bстр\.\s?|стр\.|строение\s?))(?:\d+[а-я]?)|(?:\d+[а-я]?\s?(?:стр\.\s?|стр\.|строение))/g,
    "**********"
  );

  // office
  text = text.replace(
    /(?<=(?:\bоф\.\s?|оф\.|офис\s?))(?:\d+[а-я]?)|(?:\d+[а-я]?\s?(?:оф\.\s?|оф\.|офис))/g,
    "**********"
  );

  // flat
  text = text.replace(
    /(?<=(?:\bкв\.\s?|кв\.|квартира\s?))(?:\d+[а-я]?)|(?:\d+[а-я]?\s?(?:кв\.\s?|кв\.|квартира))/g,
    "**********"
  );

  // region
  text = text.replace(
    /(?:[А-ЯЁ][а-яё]+\s*область)|(?:[А-ЯЁ][а-яё]+\s*обл\.)|(?:[А-ЯЁ][а-яё]+\s*край)|(?:[А-ЯЁ][а-яё]+\s*кр\.)|(?:Республика\s*[А-ЯЁ][а-яё]+)|(?:Респ\.\s*[А-ЯЁ][а-яё]+)/g,
    "**********"
  );

  return text;
};

export { removeAddressesByPart };
