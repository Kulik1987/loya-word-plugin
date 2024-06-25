import React, { ReactNode, useEffect, useState } from "react";
import { Button, Input, InputProps, Text } from "@fluentui/react-components";
import api from "../../shared/api/v1";
import { AuthStepperEnum } from "../../shared/store/auth";
import { useStores } from "../../shared/store";
import { observer } from "mobx-react";

type AuthProviderT = {
  children: ReactNode;
};

const AuthProvider = (props: AuthProviderT) => {
  const { children } = props;
  const { authStore } = useStores();
  const { authStatus } = authStore;

  const [login, setLogin] = useState("seo.resait@ya.ru");
  const [isFetchingRequestLogin, setIsFetchingRequestLogin] = useState(false);

  const onChange: InputProps["onChange"] = (_ev, data) => {
    authStore.setAuthStatus(AuthStepperEnum.LOGOUT);
    if (data.value.length <= 30) {
      setLogin(data.value);
    }
  };

  useEffect(() => {
    const locStoreAuthStatus = localStorage.getItem("authStatus");
    const enumKey = Object.keys(AuthStepperEnum).find((key) => AuthStepperEnum[key] === locStoreAuthStatus);

    console.log({ locStoreAuthStatus, enumKey });

    if (enumKey) {
      const authStatus = AuthStepperEnum[enumKey as keyof typeof AuthStepperEnum];
      authStore.setAuthStatus(authStatus);
    }
    return () => {
      // localStorage.setItem("authStatus", "");
    };
  }, []);

  const handleRequestLogin = async () => {
    try {
      setIsFetchingRequestLogin(true);
      const response = await api.auth.checkAccess(login);
      console.log(response);
      const { data } = response;
      if (data.access === true) {
        authStore.setAuthStatus(AuthStepperEnum.LOGGED);
        localStorage.setItem("authStatus", AuthStepperEnum.LOGGED);
      } else {
        authStore.setAuthStatus(AuthStepperEnum.FORBIDDEN);
      }
    } catch (error) {
      authStore.setAuthStatus(AuthStepperEnum.ERROR);
    } finally {
      setIsFetchingRequestLogin(false);
    }
  };

  const isDisplayErrorMessage = authStatus === AuthStepperEnum.FORBIDDEN;
  const isDisabledSendButton = login.length < 7 || isFetchingRequestLogin;
  const isLogged = authStatus === AuthStepperEnum.LOGGED;

  return (
    <>
      {isLogged && <div>{children}</div>}

      {!isLogged && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "25px 16px",
            flex: 1,
            border: "1px solid red",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
          }}
        >
          <Text as="h1" weight="bold" size={400}>
            Войти
          </Text>
          <Input value={login} onChange={onChange} placeholder="Введите логин" />
          <Button onClick={handleRequestLogin} disabled={isDisabledSendButton}>
            Отправить
          </Button>
          {isDisplayErrorMessage && <Text size={400}>Неверное имя пользователя</Text>}
        </div>
      )}
    </>
  );
};

export default observer(AuthProvider);
