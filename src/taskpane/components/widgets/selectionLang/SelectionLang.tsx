import React from "react";
import { Divider, Text, ToggleButton } from "@fluentui/react-components";
import { observer } from "mobx-react";
import { useStores } from "../../../store";
import { LocaleEnums } from "../../../store/menu";

const T = {
  dividerLang: {
    ru: "Язык интерфейса",
    en: "Interface language",
  },
};

const SelectionLang = () => {
  const { menuStore } = useStores();
  const { locale, setLocale } = menuStore;

  return (
    <div
      style={{
        //border: "1px solid red"
        display: "flex",
        gap: "16px",
        flexDirection: "column",
      }}
    >
      <Divider alignContent="center" inset>
        <Text size={300} weight="medium">
          {T.dividerLang[locale]}
        </Text>
      </Divider>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <ToggleButton checked={locale === LocaleEnums.RU} onClick={() => setLocale(LocaleEnums.RU)}>
          RU
        </ToggleButton>
        <ToggleButton checked={locale === LocaleEnums.EN} onClick={() => setLocale(LocaleEnums.EN)}>
          EN
        </ToggleButton>
      </div>
    </div>
  );
};

export default observer(SelectionLang);
