import React from "react";
import { observer } from "mobx-react";
import { AddCircleRegular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import { useStores } from "../../../store";

const Playbook = () => {
  const { menuStore } = useStores();
  const { locale } = menuStore;

  const T = {
    buttonAddPlaybook: {
      ru: "Добавить чек-лист",
      en: "New playbook",
    },
  };

  return (
    <>
      <div>
        <Button
          appearance="primary"
          size="medium"
          style={{ whiteSpace: "nowrap" }}
          icon={<AddCircleRegular />}
          disabled
        >
          {T.buttonAddPlaybook[locale]}
        </Button>
      </div>
    </>
  );
};

export default observer(Playbook);
