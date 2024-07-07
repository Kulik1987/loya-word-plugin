import React from "react";
import { observer } from "mobx-react";
import { AddCircleRegular } from "@fluentui/react-icons";
import { Button, Text } from "@fluentui/react-components";

const Playbook = () => {
  return (
    <>
      <Text size={400} weight="bold">
        Playbooks
      </Text>
      <div>
        <Button
          appearance="primary"
          size="medium"
          style={{ whiteSpace: "nowrap" }}
          icon={<AddCircleRegular />}
          disabled
        >
          New playbook
        </Button>
      </div>
    </>
  );
};

export default observer(Playbook);
