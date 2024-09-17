import { store } from "@/redux/store";
import React, { FC } from "react";
import { Provider } from "react-redux";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
