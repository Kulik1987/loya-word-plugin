import { diff_match_patch } from "diff-match-patch";

const htmlChangesMatching = (source: string, target: string): string | null => {
  // TODO: добавить вывод ошибок
  try {
    let dmp = new diff_match_patch();
    let diff = dmp.diff_main(source, target);

    dmp.diff_cleanupSemantic(diff);

    const array = diff.map((el) => {
      if (Array.isArray(el) && el.length === 2) {
        const actionFlag = el[0];
        const textItem = el[1];

        const isDeleteItem = actionFlag === -1;
        const isCreateItem = actionFlag === 1;
        const isStetItem = actionFlag === 0;

        switch (true) {
          case isDeleteItem:
            return `<del  style="color: #db690d;">${textItem}</del>`;
          case isCreateItem:
            return `<inc style="color: #099e1a; font-weight: bold;
           ">${textItem}</inc>`;
          case isStetItem:
            return `${textItem}`;
          default:
            console.log("empty element", el);
            return ``;
        }
      } else {
        console.log("not Array", el);
        return "";
      }
    });

    const response = array.join("");
    return response;
  } catch (error) {
    console.log("error [htmlChangesMatching]", error);

    return null;
  }
};

export default { htmlChangesMatching };
