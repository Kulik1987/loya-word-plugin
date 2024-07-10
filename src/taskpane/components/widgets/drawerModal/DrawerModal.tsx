import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle, Text, Tooltip } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { useStores } from "../../../store";
import { ArrowExitFilled, ArrowExportLtrFilled, Dismiss24Regular } from "@fluentui/react-icons";
import { RoutePathEnum } from "../../../app/navigation/Navigation";

const T = {
  tooltipBack: {
    ru: "Назад",
    en: "Back",
  },
  tooltipLogout: {
    ru: "Выйти",
    en: "Logout",
  },
  draft: {
    ru: "Написание",
    en: "Draft",
  },
  review: {
    ru: "Проверка",
    en: "Review",
  },
  summary: {
    ru: "Отчет",
    en: "Summary",
  },
  default: {
    ru: "Сперанский",
    en: "Speransky",
  },
};

const DrawerModal = () => {
  const { menuStore } = useStores();
  const { locale } = menuStore;
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();
  const { authStore } = useStores();

  const [isOpen, setIsOpen] = useState(false);
  const isDisableGoBack = location.key === "default";

  const handleLogout = () => {
    setIsOpen(true);
    // authStore.logout();
  };

  const handleClickBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const title = ((path) => {
    switch (path) {
      case RoutePathEnum.DRAFT:
        return T.draft[locale];
      case RoutePathEnum.REVIEW:
        return T.review[locale];
      case RoutePathEnum.SUMMARY:
        return T.summary[locale];
      default:
        return T.default[locale];
    }
  })(pathname);

  return (
    <Drawer
      // {...restoreFocusSourceAttributes}
      // type={type}
      separator
      open={isOpen}
      onOpenChange={(_, { open }) => setIsOpen(open)}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => setIsOpen(false)}
            />
          }
        >
          Default Drawer
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <p>Drawer content</p>
      </DrawerBody>
    </Drawer>
  );
};

export default observer(DrawerModal);
