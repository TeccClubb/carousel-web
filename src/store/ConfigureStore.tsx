"use client";
import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store/store";

const ConfigureStore: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ConfigureStore;
