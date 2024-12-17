import React, { useEffect } from "react";
import "./App.css";
import RouteWrapper from "./routes/route";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store, { AppDispatch } from "./redux/store";
import { ReactNotifications } from "react-notifications-component";
import { useDispatch } from "react-redux";
import { getDetails } from "./slices/AuthSlice";
import { UserProvider } from "./redux/userContext";

const FetchUserDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getDetails()).unwrap(); // Assumes getDetails is a thunk and supports .unwrap()
      } catch (error: any) {
        console.log(error);
        if (error === "Unauthenticated.") {
          navigate("/"); // Redirect to the home page on 401
        }
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return null;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <ReactNotifications />
          <FetchUserDetails />
          <RouteWrapper />
        </Router>
      </UserProvider>
    </Provider>
  );
};

export default App;
