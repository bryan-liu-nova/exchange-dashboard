import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import DownArrow from "../../assets/keyboard-down-arrow.svg";
import { Link } from "react-router-dom";
const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const calculateOffsetTime = (timeStamp) => {
  const offset = new Date().getTime() - timeStamp * 1000;
  let seconds = parseInt(offset / 1000) % 60;
  let minutes = parseInt(offset / 1000 / 60) % 60;
  let hours = parseInt(offset / 1000 / 60 / 60) % 60;
  return hours + "h " + minutes + "m " + seconds + "s";
};

const Dashboard = ({ isLoading, data }) => {
  const [result, setResult] = useState([]);
  const getData = (item) => {
    const data = {
      symbol: "",
      title: "",
      time: "",
      price: { init: "", current: "" },
      poolToken: { init: "", current: "" },
      marketCap: { init: "", current: "" },
      pool: { init: "", current: "" },
    };
    const defaultToken = {};
    const targetToken = {};
    const totalUSD = item.reserveUSD;
    const initUSD = item.mints.length > 0 ? item.mints[0].amountUSD : 0;

    if (item.token0.symbol === "WETH") {
      defaultToken.symbol = item.token1.symbol;
      defaultToken.amount = item.reserve1;
      defaultToken.tokenName = item.token1.name;
      defaultToken.initAmount =
        item.mints.length > 0 ? item.mints[0].amount1 : 0;

      targetToken.symbol = item.token0.symbol;
      targetToken.amount = item.reserve0;
      targetToken.tokenName = item.token0.name;
      targetToken.initAmount =
        item.mints.length > 0 ? item.mints[0].amount0 : 0;
    } else if (item.token1.symbol === "WETH") {
      defaultToken.symbol = item.token0.symbol;
      defaultToken.amount = item.reserve0;
      defaultToken.tokenName = item.token0.name;
      defaultToken.initAmount =
        item.mints.length > 0 ? item.mints[0].amount0 : 0;

      targetToken.symbol = item.token1.symbol;
      targetToken.amount = item.reserve1;
      targetToken.tokenName = item.token1.name;
      targetToken.initAmount =
        item.mints.length > 0 ? item.mints[0].amount1 : 0;
    } else {
      defaultToken.symbol = item.token1.symbol;
      defaultToken.amount = item.reserve1;
      defaultToken.tokenName = item.token1.name;
      defaultToken.initAmount =
        item.mints.length > 0 ? item.mints[0].amount1 : 0;

      targetToken.symbol = item.token0.symbol;
      targetToken.amount = item.reserve0;
      targetToken.tokenName = item.token0.name;
      targetToken.initAmount =
        item.mints.length > 0 ? item.mints[0].amount0 : 0;
    }

    const currentPrice = defaultToken.amount
      ? (parseFloat(totalUSD) / parseFloat(defaultToken.amount) / 2).toFixed(10)
      : 0;

    data.symbol = defaultToken.symbol;
    data.title = defaultToken.tokenName;
    data.time = calculateOffsetTime(item.createdAtTimestamp);
    data.price.init =
      (defaultToken.initAmount
        ? (
            parseFloat(initUSD) /
            2 /
            parseFloat(defaultToken.initAmount)
          ).toFixed(10)
        : currentPrice) + "$";
    data.price.current = currentPrice + "$";

    data.poolToken.init =
      parseFloat(
        defaultToken.initAmount ? defaultToken.initAmount : defaultToken.amount
      ).toFixed(10) +
      " " +
      defaultToken.symbol;
    data.poolToken.current =
      parseFloat(defaultToken.amount).toFixed(10) + " " + defaultToken.symbol;

    data.marketCap.init =
      (parseFloat(initUSD ? initUSD : totalUSD) / 2).toFixed(10) + "$";
    data.marketCap.current = (parseFloat(totalUSD) / 2).toFixed(10) + "$";

    data.pool.init =
      parseFloat(
        targetToken.initAmount ? targetToken.initAmount : targetToken.amount
      ).toFixed(10) +
      " " +
      targetToken.symbol;
    data.pool.current =
      parseFloat(targetToken.amount).toFixed(10) + " " + targetToken.symbol;

    return data;
  };

  const getPairData = (data) => {
    const result = [];
    data.forEach((item, index) => {
      result[index] = getData(item);
    });
    setResult(result);
  };

  useEffect(() => {
    getPairData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <StyledDashboard>
      <div className="body-container">
        <div className="filter-container">
          <div className="select-wrapper">
            <select>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <div className="arrow-button">
              <img src={DownArrow} alt="loading failed"/>
            </div>
          </div>
          <span className="content">
            Data after 10 entries will no longer refreshed.
          </span>
        </div>
        <div className="token-information">
          <ClipLoader
            color={"black"}
            loading={isLoading}
            css={override}
            size={150}
          />

          <div className="table-container">
            <div className="custom-row thead">
              <div className="token">Token</div>
              <div className="time"> Time</div>
              <div className="action">Actions</div>
              <div className="price">
                <div>Initial Price</div>
                <div>/Current Price(USD)</div>
              </div>
              <div className="pool-token">
                <div>Initial Pool Token</div>
                <div>/Current Pool Token</div>
              </div>
              <div className="market-cap">
                <div>Initial Market Cap</div>
                <div>/Current Market Cap</div>
              </div>
              <div className="pool">
                <div>Initial Pool</div>
                <div>/Current Pool</div>
              </div>
            </div>
            {result.length > 0
              ? result.map((item, index) => (
                  <div className={`custom-row tbody`} key={`key-${index}`}>
                    <div className="token">
                      <div className="multi-item">
                        <div>
                          <Link to={`/${item.symbol}/transaction`}>{item.symbol}</Link>
                        </div>
                        <div>{item.title}</div>
                      </div>
                    </div>
                    <div className="time"> {item.time} </div>
                    <div className="action">Actions</div>
                    <div className="price">
                      <div className="multi-item">
                        <div>{item.price.init}</div>
                        <div>{item.price.current}</div>
                      </div>
                    </div>
                    <div className="pool-token">
                      <div className="multi-item">
                        <div>{item.poolToken.init}</div>
                        <div>{item.poolToken.current}</div>
                      </div>
                    </div>
                    <div className="market-cap">
                      <div className="multi-item">
                        <div>{item.marketCap.init}</div>
                        <div>{item.marketCap.current}</div>
                      </div>
                    </div>
                    <div className="pool">
                      <div className="multi-item">
                        <div>{item.pool.init}</div>
                        <div>{item.pool.current}</div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .body-container {
    font-size: 12px;
    padding: 20px 30px 20px 20px;
    .filter-container {
      text-align: left;
      .select-wrapper {
        display: inline-block;
        width: 15%;
        margin-right: 15px;
        position: relative;
      }
      select {
        padding: 10px 30px 10px 10px;
        border-width: 0px;
        appearance: none;
        width: 100%;
        position: relative;
        z-index: 1;
        cursor: pointer;
      }
      .arrow-button {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 30px;
        height: 100%;
        display: flex;
        background: transparent;
        z-index: 2;
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
      .table-container {
        .custom-row {
          display: flex;
          &.thead {
            border-bottom: 1px solid gray;
          }
          &.tbody {
            > div {
              display: flex;

            }
          }
          > div {
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          > .token {
            width: 10%;
          }
          > .time {
            width: 10%;
          }
          > .action {
            width: 20%;
          }
          > .price {
            width: 15%;
            display: block;
          }
          > .pool-token {
            width: 15%;
            display: block;
          }
          > .market-cap {
            width: 15%;
            display: block;
          }
          > .pool {
            width: 15%;
            display: block;
          }
          /* .multi-item {
            display: flex;
          } */
        }
      }
    }
  }
`;
export default Dashboard;
