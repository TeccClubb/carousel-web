"use client"
import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";

const ConfigureStore: FC<{ children: ReactNode }> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ConfigureStore;
