export const fetchNewPairsQuery = (address) => `query {
  pairs (first:5 orderBy:createdAtTimestamp orderDirection:desc) {
    id
    createdAtTimestamp
    createdAtBlockNumber
    token0 {
      symbol
      txCount
    }
    token1 {
      symbol
      txCount
    }
    reserveETH
    reserveUSD
  }
}`;

export const fetchInitialLiquidityQuery = (address) => `query {
  ethereum {
    transfers(
      options: {asc: "block.timestamp.time", limit: 2}
      amount: {gt: 0}
      receiver: {is: "${address}"}
    ) {
      block {
        timestamp {
          time(format: "%Y-%m-%d %H:%M:%S")
        }
        height
      }
      address: sender {
        address
        annotation
      }
      currency {
        address
        symbol
      }
      amount
      transaction {
        hash
      }
      external
    }
  }
}
`