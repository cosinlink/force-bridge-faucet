import Contract from 'web3-eth-contract'
import Web3 from 'web3'

import erc20Abi from './abi/test-erc20.json'
const uint256Max = `0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`


const chainList = [
    {
        // yarn build => Ethereum Mainnet
        id: 1,
        networkName: 'Mainnet',
        rpcUrl: 'https://mainnet.eth.aragon.network/',
    },
    {
        // yarn build => Ethereum Ropsten Testnet
        id: 3,
        networkName: 'Ropsten',
        rpcUrl: 'https://ropsten.eth.aragon.network/',
    },
]

const addressList = [
    {
        dai: '0x903C7d9bBbFE765fb4abAf1F43311bc1baf7012C',
        usdt: '0xe90dF1482bd7D97Bde2B61475f707d35c440da6E',
        usdc: '0x68Bb61e383E88dB95AC5ff6CD3c70689a24454Ba',

        ckb_chain: '',
        token_locker: '',
    },
    {
        dai: '0x903C7d9bBbFE765fb4abAf1F43311bc1baf7012C',
        usdt: '0xe90dF1482bd7D97Bde2B61475f707d35c440da6E',
        usdc: '0x68Bb61e383E88dB95AC5ff6CD3c70689a24454Ba',

        ckb_chain: '',
        token_locker: '',
    },
]

const chain =
    process.env.REACT_APP_ENV === 'production' ? chainList[0] : chainList[1]

const address =
    process.env.REACT_APP_ENV === 'production' ? addressList[0] : addressList[1]

const web3 = window.web3
    ? new Web3(window.web3.currentProvider)
    : new Web3(new Web3.providers.HttpProvider(chain.rpcUrl))

let contracts = null

const init = () => {
    if (contracts !== null) {
        return
    }
    Contract.setProvider(window.ethereum || chain.rpcUrl)
    contracts = JSON.parse(JSON.stringify(address))

    // eslint-disable-next-line array-callback-return
    Object.keys(contracts).map((key) => {
        if (key !== "") {
            contracts[key] = new Contract(erc20Abi, address[key])
        }
    })
}

const receipt = (transactionHash) => {
    return new Promise((resolve) => {
        if (!transactionHash) {
            resolve(null)
        }
        web3.eth.getTransactionReceipt(transactionHash, (_, data) => {
            resolve(data)
        })
    })
}

export { address, chain, contracts, init, receipt, uint256Max, web3 }
