import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance, decimals = 18) => {
  balance = new BigNumber(balance)
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getDisplayBalance = (balance, decimals = 18) => {
  balance = new BigNumber(balance)
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4)
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export const getFullDisplayBalance = (balance, decimals = 18) => {
  balance = new BigNumber(balance)
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}
