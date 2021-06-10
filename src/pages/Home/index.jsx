import React from "react";
// import gql from "graphql-tag";
import styled from "styled-components";
import { Header } from "../Common";

const calculateOffsetTime = (timeStamp) => {
  const offset = new Date().getTime() - timeStamp * 1000;
  let seconds = parseInt(offset / 1000) % 60;
  let minutes = parseInt(offset / 1000 / 60) % 60;
  return minutes + "m " + seconds + "s";
};

// const GET_TOKEN_PRICE = gql`
//   query TokenDayDatas($tokenAddress: String!) {
//     tokenDayDatas(
//       first: 1
//       orderBy: date
//       orderDirection: desc
//       where: { token: $tokenAddress }
//     ) {
//       priceUSD
//     }
//   }
// `;

const Home = ({ data, isLoading }) => {
  console.log(data, "this is data");
  return (
    <StyledHome>
      <Header />
      <StyledBody>
        <div className="body-container">
          <div className="filter-container">
            <select>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <span className="content">
              Data after 10 entries will no longer refreshed.
            </span>
          </div>
          <div className="token-information">
            <table>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Time</th>
                  <th>Actions</th>
                  <th>
                    Initial Price
                    <br />
                    /Current Price(USD)
                  </th>
                  <th>
                    Initial Pool Token
                    <br />
                    /Current Pool Token
                  </th>
                  <th>
                    Initial Market Cap
                    <br />
                    /Current Market Cap
                  </th>
                  <th>
                    Initial Pool
                    <br />
                    /Current Pool
                  </th>
                  {/* <th>Price Change</th>
                  <th>
                    Locked
                    <br />
                    (VIP)
                  </th>
                  <th>
                    Check Contract
                    <br />
                    (VIP)
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  data &&
                  data.length > 0 &&
                  data.map((item, index) =>
                    item.token0.symbol === "WETH" ? (
                      <tr key={index}>
                        <td>
                          {item.token1.symbol}
                          <br />
                          {item.token1.name}
                        </td>
                        <td>{calculateOffsetTime(item.createdAtTimestamp)}</td>
                        <td className="btn-group">
                          <div className="buy-btn">buy</div>
                        </td>
                        <td>
                          {item.reserve1 !== "0"
                            ? item.mints.length > 0
                              ? (
                                  parseFloat(item.mints[0].amountUSD) /
                                  2 /
                                  parseFloat(item.mints[0].amount1)
                                ).toFixed("10")
                              : (
                                  parseFloat(item.reserveUSD) /
                                  2 /
                                  parseFloat(item.reserve1)
                                ).toFixed("10")
                            : 0}
                          $
                          <br />
                          {item.reserve1 !== "0"
                            ? (
                                parseFloat(item.reserveUSD) /
                                2 /
                                parseFloat(item.reserve1)
                              ).toFixed("10")
                            : 0}
                          $
                        </td>
                        <td>
                          {parseFloat(
                            item.mints.length > 0
                              ? item.mints[0].amount1
                              : item.reserve1
                          ).toFixed("10")}{" "}
                          {item.token1.symbol}
                          <br />
                          {parseFloat(item.reserve1).toFixed("10")}{" "}
                          {item.token1.symbol}
                        </td>
                        <td>
                          {(
                            parseFloat(
                              item.mints.length > 0
                                ? item.mints[0].amountUSD
                                : item.reserveUSD
                            ) / 2
                          ).toFixed("10")}
                          $
                          <br />
                          {(parseFloat(item.reserveUSD) / 2).toFixed("10")}$
                        </td>
                        <td>
                          {parseFloat(
                            item.mints.length > 0
                              ? item.mints[0].amount0
                              : item.reserve0
                          ).toFixed("10")}{" "}
                          {item.token0.symbol}
                          <br />
                          {parseFloat(item.reserve0).toFixed("10")}{" "}
                          {item.token0.symbol}
                        </td>
                        {/* <td className="price">
                          <div className="negative">-0.14%</div>
                        </td>
                        <td>0%</td>
                        <td>asdfas</td> */}
                      </tr>
                    ) : (
                      <tr key={index}>
                        <td>
                          {item.token0.symbol}
                          <br />
                          {item.token0.name}
                        </td>
                        <td>{calculateOffsetTime(item.createdAtTimestamp)}</td>
                        <td className="btn-group">
                          <div className="buy-btn">buy</div>
                        </td>
                        <td>
                          {item.reserve0 !== "0"
                            ? item.mints.length > 0
                              ? (
                                  parseFloat(item.mints[0].amountUSD) /
                                  2 /
                                  parseFloat(item.mints[0].amount0)
                                ).toFixed("10")
                              : (
                                  parseFloat(item.reserveUSD) /
                                  2 /
                                  parseFloat(item.reserve0)
                                ).toFixed("10")
                            : 0}
                          $
                          <br />
                          {item.reserve0 !== "0"
                            ? (
                                parseFloat(item.reserveUSD) /
                                2 /
                                parseFloat(item.reserve0)
                              ).toFixed("10")
                            : 0}
                          $
                        </td>
                        <td>
                          {parseFloat(
                            item.mints.length > 0
                              ? item.mints[0].amount0
                              : item.reserve0
                          ).toFixed("10")}{" "}
                          {item.token0.symbol}
                          <br />
                          {parseFloat(item.reserve0).toFixed("10")}{" "}
                          {item.token0.symbol}
                        </td>
                        <td>
                          {(
                            parseFloat(
                              item.mints.length > 0
                                ? item.mints[0].amountUSD
                                : item.reserveUSD
                            ) / 2
                          ).toFixed("10")}
                          $
                          <br />
                          {(parseFloat(item.reserveUSD) / 2).toFixed("10")}$
                        </td>
                        <td>
                          {parseFloat(
                            item.mints.length > 0
                              ? item.mints[0].amount1
                              : item.reserve1
                          ).toFixed("10")}{" "}
                          {item.token1.symbol}
                          <br />
                          {parseFloat(item.reserve1).toFixed("10")}{" "}
                          {item.token1.symbol}
                        </td>
                        {/* <td className="price">
                          <div className="negative"></div>
                        </td>
                        <td>0%</td>
                        <td>asdfas</td> */}
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </StyledBody>
      {/* <Body /> */}
    </StyledHome>
  );
};
const StyledBody = styled.div`
  width: 100vw;
  padding-top: 77px;
  min-height: calc(100vh - 77px);
  background-color: #e4ebf5;
  .body-container {
    padding: 20px;
    .filter-container {
      text-align: left;
      select {
        width: 15%;
        padding: 10px 30px 10px 10px;
        border-width: 0px;
        margin-right: 15px;
      }
      .content {
        padding: 0px 15px;
        border-left: 1px solid #6f7c8a;
        color: #6f7c8a;
      }
    }
    .token-information {
      margin: 20px 0px;
      background-color: white;
      table {
        border-width: 0px;
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
        thead {
          color: #606a75;
          font-weight: bold;
          border-bottom: 1px solid #abb3bb;
          th {
            padding: 20px 10px;
            line-height: 20px;
          }
        }
        tbody {
          tr {
            td {
              padding: 10px;
            }
            .btn-group > * {
              display: inline-block;
              padding: 0px 5px;
              cursor: pointer;
            }
            .btn-group > .buy-btn {
              padding: 5px 10px;
              background-color: #1c97ff;
              color: white;
              border-radius: 4px;
              margin-right: 5px;
            }
            .price {
              div {
                padding: 10px 10px;
                border-radius: 4px;
                color: white;
                &.negative {
                  background-color: #de5165;
                }
                &.positive {
                  background-color: #5eae8f;
                }
              }
            }
          }
          /* td {
            display: flex;
            justify-content: center;
            > div {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100px;
            }
          } */
        }
      }
    }
  }
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
