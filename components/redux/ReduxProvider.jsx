"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<p>loading...</p>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
