import React from "react";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Text,
  ToggleButton,
} from "@fluentui/react-components";
import { observer } from "mobx-react";
import { Dismiss24Regular, TextBulletListSquareSearchRegular } from "@fluentui/react-icons";
import { useStores } from "../../../store";
import { LocaleEnums } from "../../../store/menu";
import { AuthStepperEnum } from "../../../store/auth";
import { SelectionLang, SelectionModelAi } from "../../widgets";

type DrawerModalT = {
  isOpen: boolean;
  onClose: () => void;
};

const T = {
  title: {
    ru: "Настройки",
    en: "Settings",
  },
  dividerLang: {
    ru: "Язык интерфейса",
    en: "Interface language",
  },
  btnLogout: {
    ru: "Выйти",
    en: "Logout",
  },
};
const appVersion = process.env.appVersion;
const appBuildDate = process.env.appBuildDate;
const DrawerModal = (props: DrawerModalT) => {
  const { isOpen, onClose } = props;
  const { menuStore, authStore } = useStores();
  const { locale, setLocale } = menuStore;

  const handleClose = () => {
    onClose();
  };
  const handleLogout = () => {
    authStore.logout();
    onClose();
  };

  const isDisplayButtonLogout = authStore.authStatus === AuthStepperEnum.LOGGED;
  return (
    <Drawer separator open={isOpen} onOpenChange={() => onClose()}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={<Button appearance="subtle" aria-label="Close" icon={<Dismiss24Regular />} onClick={handleClose} />}
        >
          {T.title[locale]}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          justifyContent: "space-between",
          padding: "24px",
        }}
      >
        <div style={{ display: "flex", gap: "36px", flexDirection: "column" }}>
          <SelectionLang />
          <SelectionModelAi />
        </div>
        <div>
          <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
            {isDisplayButtonLogout && (
              <Button
                appearance="outline"
                onClick={handleLogout}
                style={{ borderColor: "#ce860f", color: "#ce860f" }}
                icon={<TextBulletListSquareSearchRegular style={{ color: "#ce860f" }} />}
                color="red"
              >
                {T.btnLogout[locale]}
              </Button>
            )}
          </div>
          <div style={{ display: "flex", paddingTop: "12px", color: "#B7B7B7" }}>
            v.{appVersion} {appBuildDate}
          </div>
        </div>
      </DrawerBody>
    </Drawer>
  );
};

export default observer(DrawerModal);
