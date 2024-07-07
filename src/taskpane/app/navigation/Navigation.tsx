import React from "react";
import { Main, Draft, Review } from "../../pages";
import { LayerBase } from "../../shared/templates";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../AuthProvider";

export enum RoutePathEnum {
  DRAFT = "/draft",
  REVIEW = "/review",
}

const Navigation: React.FC = () => {
  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <Routes>
        <Route element={<LayerBase />}>
          <Route element={<AuthProvider />}>
            <Route index element={<Main />} />
            <Route path={RoutePathEnum.DRAFT} element={<Draft />} />
            <Route path={RoutePathEnum.REVIEW} element={<Review />} />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

export default Navigation;
