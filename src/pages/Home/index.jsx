import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../Common";
import Dashboard from "../Dashboard";
import Transaction from "../Transaction";

const Home = ({ data, isLoading }) => {
  return (
    <StyledHome>
      <Header />
      <StyledBody>
        <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard isLoading={isLoading} data={data} />
            </Route>
            <Route exact path="/:id/transaction">
              <Transaction />
            </Route>
          </Switch>
        </Router>
      </StyledBody>
    </StyledHome>
  );
};
const StyledBody = styled.div`
  width: 100vw;
  padding-top: 77px;
  min-height: calc(100vh - 77px);
  background-color: #e4ebf5;
`;

const StyledHome = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  .pageTitle {
    font-weight: 400;
    font-size: 35px;
  }
`;
export default Home;
