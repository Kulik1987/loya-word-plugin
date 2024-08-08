import React from "react";
import { useStores } from "../../store";
import { SuggestionCard } from "../../components/widgets";
import { Button, Divider, Text } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { SuggestionItemSkeleton } from "./suggestionItemSkeleton";
import { DocumentHelpers } from "../../helpers";

const T = {
  waitingNotification: {
    ru: "Идет подготовка рекомендаций",
    en: "Please await",
  },
  buttonApplyAll: {
    ru: "Применить все",
    en: "Apply All",
  },
};

const Summary = () => {
  const { suggestionsStore, menuStore } = useStores();
  const { locale } = menuStore;

  const {
    // computedIsExistUntouchedSuggestions,
    suggestionsNew,
  } = suggestionsStore;

  const { reviewTypeActive, reviewCustomProcessing, reviewGeneralProcessing } = suggestionsStore;

  const isProcessing = reviewCustomProcessing || reviewGeneralProcessing;
  const isDisplaySuggestions = reviewTypeActive !== null && !isProcessing;

  const handleApplyAll = async () => {
    suggestionsNew.forEach(async (itemSuggestion, indexSuggestion) => {
      const {
        partContract: sourceText,
        partModified: changeText,
        comment: commentText,
        // isApplyChange,
        // isApplyComment,
      } = itemSuggestion;

      await DocumentHelpers.collectRowByDiffArray(sourceText, changeText)
        .then(() => {
          // suggestionsStore.setSuggestionProperty(indexSuggestion, {
          //   isApplyChange: true,
          //   isApplyComment: true,
          // });
        })
        .catch((error) => {
          console.log("Error [handleApplyAll]: " + error);
        });

      await DocumentHelpers.applyComment(sourceText, changeText, commentText)
        .then(() => {
          suggestionsStore.setSuggestionProperty(indexSuggestion, { isApplyComment: true });
        })
        .catch((error) => {
          console.log("Error [handleAddComment]: " + error);
        });
      // await Word.run(async (context) => {
      //   const range = await DocumentHelpers.findRange(context, partContract);
      //   if (!isApplyChange) range.insertText(partModified, "Replace");
      //   if (!isApplyComment) range.insertComment(comment);
      // })
      //   .then(() => {
      //     suggestionsStore.setSuggestionProperty(indexSuggestion, {
      //       isApplyChange: true,
      //       isApplyComment: true,
      //     });
      //   })
      //   .catch((error) => {
      //     console.log("Error [handleApplyAll]: " + error);
      //   });
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {isProcessing && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Divider alignContent="center" inset>
            <Text size={300} weight="medium">
              {T.waitingNotification[locale]}
            </Text>
          </Divider>
          <div>
            <SuggestionItemSkeleton />
          </div>
        </div>
      )}
      {isDisplaySuggestions &&
        suggestionsNew?.map((data, index) => {
          return <SuggestionCard data={data} key={index} index={index} />;
        })}
      {
        // computedIsExistUntouchedSuggestions &&
        !isProcessing && (
          <div>
            <Button
              appearance="primary"
              size="medium"
              onClick={handleApplyAll}
              style={{ borderColor: "#0f6cbd", borderWidth: "2px", whiteSpace: "nowrap" }}
            >
              {T.buttonApplyAll[locale]}
            </Button>
          </div>
        )
      }
    </div>
  );
};

export default observer(Summary);
