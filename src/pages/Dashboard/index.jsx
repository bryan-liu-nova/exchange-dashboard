import React from "react";
import styled from "styled-components";
const StyledDashboard = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;

  .pageTitle {
    font-weight: 400;
    font-size: 35px;
  }
`;

const Dashboard = () => {
  return <StyledDashboard></StyledDashboard>;
};

export default Dashboard;
