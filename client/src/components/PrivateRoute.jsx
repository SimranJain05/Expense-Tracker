import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../api/auth.api";
import { setUser } from "../redux/slices/user.slice";
import { setSuccess } from "../redux/slices/success.slice";

export default function PrivateRoute() {
  const [userFetched, setUserFetched] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser();
      if (res.success === true) {
        dispatch(setUser(res.user));
        dispatch(setSuccess(res.message));
      }
      setUserFetched(true);
    };
    if (user == false) {
      fetchData();
    } else {
      setUserFetched(true);
    }
  }, []);

  const { user } = useSelector((state) => state.user);
  if (!userFetched) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-xl">
        Authenticating...
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}
