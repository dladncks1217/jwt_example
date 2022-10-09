import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import AppLayout from "../components/AppLayout";

const App = ({ Component, pageprops }) => {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  );
};

export default App;
