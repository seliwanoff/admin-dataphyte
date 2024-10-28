import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SkeletonScreen from "../components/skeletonScreen";
//import DashBoardWrapper from "../dashboard/dashboardWrapper";
import "nprogress/nprogress.css"; // Import the NProgress CSS
import NProgress from "nprogress";

const DashBoardWrapper = React.lazy(
  () => import("../dashboard/dashboardWrapper")
);
const DataManagemnt = React.lazy(
  () => import("../Datamanagement/ManagementWrapper")
);
const UserManagement = React.lazy(
  () => import("../Usermanagement/usermanagementWrapper")
);
const AnalyticsReport = React.lazy(
  () => import("../AnalyticsReport/analyticsWrapper")
);
const Accesslog = React.lazy(() => import("../Accesslog/accesslogwrapper"));
const LoginWrapper = React.lazy(() => import("../panel/auth/login"));

const RouteWrapper: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    NProgress.done();

    return () => {
      NProgress.done();
    };
  }, [location]);
  return (
    <Suspense fallback={<SkeletonScreen />}>
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/dashboard" element={<DashBoardWrapper />} />
        <Route path="/data-management" element={<DataManagemnt />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/analytics-report" element={<AnalyticsReport />} />
        <Route path="/access-log" element={<Accesslog />} />
      </Routes>
    </Suspense>
  );
};

export default RouteWrapper;
