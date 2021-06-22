import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import { useParams } from 'react-router-dom'
import DownArrow from "../../assets/keyboard-down-arrow.svg";
import axios from 'axios'

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  console.log(data, 'this is table data');
  // Render the UI for your table
  return (
    <>
      <div className="filter-container">
        <div className="select-wrapper">
          <select>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <div className="arrow-button">
            <img src={DownArrow} alt="loading failed" />
          </div>
        </div>
        <span className="content">
          Data after 10 entries will no longer refreshed.
        </span>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

const Transaction = () => {
  const { address, symbol } = useParams();
  const [transactionData, setTransactionData] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Symbol',
        accessor: 'symbol'
      },
      {
        Header: 'Txn Hash',
        accessor: 'hash'
      },
      {
        Header: 'Block',
        accessor: 'blockNumber'
      },
      {
        Header: 'Date Time(UTC)',
        accessor: 'timeStamp'
      },
      {
        Header: 'From',
        accessor: 'from'
      },
      {
        Header: 'To',
        accessor: 'to'
      },
      {
        Header: 'Quantity',
        accessor: 'value'
      }
    ],
    []
  )

  const getTableData = useCallback((originData) => {
    const result = [];
    if (originData.length > 0) {
      originData.forEach((item, index) => {
        result[index] = {
          symbol: symbol,
          hash: item.hash,
          blockNumber: item.blockNumber,
          timeStamp: item.timeStamp,
          from: item.from,
          to: item.to,
          value: item.value
        }
      })
    }
    setTransactionData(result);
    console.log(result, 'this is result');
    // return result;
  }, [symbol])

  const getTransactionsByTokenAddress = useCallback(async (address) => {
    try {
      const transactions = await axios.get(`${process.env.REACT_APP_ETHERSCAN_APP_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`, {})
      getTableData(
        transactions &&
          transactions.data &&
          transactions.data.result &&
          transactions.data.result.length > 0 ?
          transactions.data.result :
          []
      )
    } catch (error) {
      console.log(error);
    }
  }, [getTableData]);


  useEffect(() => {
    getTransactionsByTokenAddress(address);
  }, [address, getTransactionsByTokenAddress]);

  return (
    <StyledContainer>
      <Styles>
        <Table columns={columns} data={transactionData ? transactionData : []} />
      </Styles>
    </StyledContainer>
  )
}
const StyledContainer = styled.div`
`;
const Styles = styled.div`
  padding: 1rem;
  table {
    margin: 20px 0;
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
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
`

export default Transaction;