import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import Navigation from "./../Navigation/Navigation"

import styled from "@emotion/styled";

const PrivateRoute = () => {
    const { currentUser } = useAuth();
    if(!currentUser) {
      return <Navigate to="/login" replace />
    }

    return (
      <>
        <Outlet />
        <NavWrap>
          <Navigation />
        </NavWrap>
      </>
    )
  };

export default PrivateRoute;


const NavWrap = styled.div`
  padding-bottom: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;