/**
 * @description функция преобразует строку в массив элементов заданной длины
 */
const splitStringIntoChunks = (str: string, chunkSize: number = 250) => {
  const chunks: string[] = [];
  for (var i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize));
  }
  return chunks;
};

export const convert = {
  splitStringIntoChunks,
};
