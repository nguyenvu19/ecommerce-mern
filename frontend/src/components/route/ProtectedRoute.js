import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { loadUser } from "../../actions/userAction";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ children, isAdmin }) => {
  const {
    isAuthenticated = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, loading, user]);

  if (loading) return <Loader />;

  if (!loading && !isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
