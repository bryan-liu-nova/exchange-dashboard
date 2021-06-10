import React from "react";
import { StyledTerminal } from "./style";
import TerminalTitleBar from "./TerminalTitleBar";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Terminal = () => {
  const { tokens } = useSelector((state) => state.tokens);
  return (
    <StyledTerminal>
      <TerminalTitleBar />
      <div className="content">
        <StyledTable>
          <thead>
            <tr>
              <th>No</th>
              <th>Created</th>
              <th>Token0 Name</th>
              <th>Token0 Amount</th>
              <th>Token1 Name</th>
              <th>Token1 Amount</th>
            </tr>
          </thead>
          <tbody>
            {tokens.length > 0 &&
              tokens.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.block.timestamp.iso8601}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </StyledTable>
      </div>
    </StyledTerminal>
  );
};
const StyledTable = styled.table`
  width: 100%;
`;
export default Terminal;
