import { address, contracts, init, web3, uint256Max } from './common'

const log = console.log.bind(console)
init()

export const getUserBalance = (tokenName, userWalletAddress) => {
    if (!contracts[tokenName]) {
        return Promise.resolve('0')
    }
    if (!userWalletAddress) {
        return Promise.resolve('0')
    }
    return contracts[tokenName].methods
        .balanceOf(userWalletAddress)
        .call()
        .then((result) => {
            return Promise.resolve(result.toString())
        })
}

export const getAllowanceForTarget = (
    tokenName,
    userWalletAddress,
    targetAddress
) => {
    if (!contracts[tokenName]) {
        return Promise.resolve('0')
    }
    if (!userWalletAddress) {
        return Promise.resolve('0')
    }
    if (typeof targetAddress !== 'string') {
        return Promise.resolve('0')
    }
    return contracts[tokenName].methods
        .allowance(userWalletAddress, targetAddress)
        .call()
        .then((result) => {
            // log(`${tokenName} Allowance`, userWalletAddress, 'for target:',targetAddress, result)
            // log(typeof result)
            return Promise.resolve(result)
        })
}

export const postClaimTestToken = (tokenName, userWalletAddress) => {
    if (!contracts[tokenName]) {
        return Promise.resolve(null)
    }
    if (!userWalletAddress) {
        return Promise.resolve(null)
    }
    return contracts[tokenName].methods
        .getTestToken()
        .send({ from: userWalletAddress })
}

export const postApproveErc20ToTarget = (
    tokenName,
    userWalletAddress,
    targetAddress
) => {
    if (!contracts[tokenName]) {
        return Promise.resolve(null)
    }
    if (!userWalletAddress) {
        return Promise.resolve(null)
    }
    return contracts[tokenName].methods
        .approve(targetAddress, uint256Max)
        .send({ from: userWalletAddress })
}
