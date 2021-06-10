import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi'
const Header = () => {
  return (
    <>
      <StyledHeader>
        <div className="left-container">
          <div className="logo">
          </div>
          <span className="title">
            UniMonitor
          </span>
          <div className="navigation">
            <Link to="/created" className="active"> Pair Created </Link>
            <span className="vertical-line"></span>
            <Link to="/explore"> Pair Explore </Link>
          </div>
        </div>
        <div className="right-container">
          <div className="search-box">
            <button>
              <FiSearch />
              Search
            </button>
          </div>
          <div className="content-box">
            <p>FastGas: {`161`}</p>
            <p>Currently Delay: {`0s`}</p>
          </div>
        </div>
      </StyledHeader>
    </>
  )
}
const StyledHeader = styled.div`
  display: flex;
  background: #2F4255;
  width: 100vw;
  color: white;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0px;
  top: 0px;
  .left-container {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      .title {
      padding: 0px 30px 0px 0px;
      font-size: 25px;
    }
    .navigation {
      display: flex;
      > a {
        display: inline-block;
        padding-right: 20px;
        text-decoration: none;
        color: #6F7C8A;
        cursor: pointer;
        position: relative;
        padding: 15px 0px 20px 0px;
        &::after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 50%;
          width: 70%;
          height: 3px;
          background-color: transparent;
          transform: translate(-50%, 0px);
        }
      }
      > a.active {
        color: white;
        &::after {
          background-color: #3C7CC0;
        }
      }
      .vertical-line {
        width: 30px;
        display: inline-block;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          height: 50%;
          width: 1px;
          transform: translate(-50%,-50%);
          background-color: white;
        }
      }
    }
  }
  .right-container {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px;
    .search-box {
      button {
        padding: 5px 10px;
        display: flex;
        align-items: center;
        font-size: 14px;
        /* color: #BBC9D5; */
        > svg {
          font-size: 20px;
        }
      }
      padding: 10px 15px
    }
    .content-box {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #6F7C8A;
      > p {
        padding: 0px 15px;
      }
    }
  }
`;
export default Header