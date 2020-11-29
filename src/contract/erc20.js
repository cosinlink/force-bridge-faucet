import { address, contracts, init, web3 } from './common';
const log = console.log.bind(console)
init()

export const getUserBalance = (tokenName, userWalletAddress) => {
    if (!contracts[tokenName]) {
        return Promise.resolve('0');
    }
    if (!userWalletAddress) {
        return Promise.resolve('0');
    }
    return contracts[tokenName].methods.balanceOf(userWalletAddress).call().then((result) => {
        return Promise.resolve(result.toString());
    });
};

export const postGetTestToken = (tokenName, userWalletAddress) => {
    if (!contracts[tokenName]) {
        return Promise.resolve(null);
    }
    if (!userWalletAddress) {
        return Promise.resolve(null);
    }
    return contracts[tokenName].methods
        .getTestToken()
        .send({ from: userWalletAddress });
};


