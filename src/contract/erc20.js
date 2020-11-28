import { address, contracts, init, web3 } from './common';
const log = console.log.bind(console)
init()

export const getUserBalance = (tokenName, userWalletAddress) => {
    log(web3)
    if (!contracts[tokenName]) {
        return Promise.resolve('0');
    }
    if (!userWalletAddress) {
        return Promise.resolve('0');
    }
    return contracts[tokenName].methods.balanceOf(userWalletAddress).call().then((result) => {
        if (tokenName === 'usdt' || tokenName === 'usdc') {
            return Promise.resolve(web3.utils.fromWei(result.toString(), 'mwei'));
        }
        return Promise.resolve(web3.utils.fromWei(result.toString(), 'ether'));
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


