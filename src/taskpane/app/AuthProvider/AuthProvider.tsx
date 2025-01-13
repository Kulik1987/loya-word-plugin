import React, { ReactNode, useEffect, useState } from "react";
import { Button, Input, InputProps, Text } from "@fluentui/react-components";
import api from "../../api/v1";
import { AuthStepperEnum } from "../../store/auth";
import { useStores } from "../../store";
import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";

const AuthProvider = () => {
  const { authStore } = useStores();
  const { authStatus } = authStore;

  const [login, setLogin] = useState("");
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
        // localStorage.setItem("authStatus", "user.logged");
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

  if (isLogged) return <Outlet />;

  return (
    <>
      <div
        style={{
          // border: "1px solid red",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: 1,
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
    </>
  );
};

export default observer(AuthProvider);
