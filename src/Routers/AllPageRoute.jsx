import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserList from "../Component/Pages/UserList";
import UserDetails from "../Component/Pages/UserDetails";
import Error404 from "../Component/Pages/Error404";

export default function AllPageRoute() {
  const { pathname } = useLocation();
  return (
    <React.Fragment>
      {pathname === "/" && <Navigate to={"/userList"} />}
      <Routes>
        <Route path="/userList" Component={UserList}></Route>
        <Route path={"/userDetails/:id"} Component={UserDetails}></Route>
        <Route path={"*"} Component={Error404}></Route>
      </Routes>
    </React.Fragment>
  );
}
