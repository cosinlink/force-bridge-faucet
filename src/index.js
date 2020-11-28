import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {UseWalletProvider} from "use-wallet";
import {chain} from "./contract/common";

ReactDOM.render(
    <React.StrictMode>
        <UseWalletProvider
            chainId={chain.id}
            connectors={{ walletconnect: { rpcUrl: chain.rpcUrl } }}
        >
            <App />
        </UseWalletProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
