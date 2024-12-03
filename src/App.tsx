import React, { useEffect } from "react";
import "./App.css";
import RouteWrapper from "./routes/route";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { AppDispatch } from "./redux/store";
import { ReactNotifications } from "react-notifications-component";
import { useDispatch } from "react-redux";
import { getDetails } from "./slices/AuthSlice";

const FetchUserDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDetails());
  }, [dispatch]);

  return null;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <ReactNotifications />
        <FetchUserDetails />
        <RouteWrapper />
      </Router>
    </Provider>
  );
};

export default App;
