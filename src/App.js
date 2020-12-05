import React, { useState } from 'react'
import './App.css'
import Faucet from './containers/Faucet'
import Balances from './containers/Balances'
import TopBar from './containers/TopBar/TopBar'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useWallet, UseWalletProvider } from 'use-wallet'
import { ThemeProvider } from 'styled-components'
import { chain } from './contract/common'
import theme from './theme'
import Container from './containers/Container'

export const AppContext = React.createContext({})

const StyledDiv = styled.div`
    display: hidden;
    height: 30px;
    width: 100%;
`

const WalletProvider = () => {
    const wallet = useWallet()
    return (
        <>
            <Router>
                <TopBar wallet={wallet} />
                <Container>
                    <Container>
                        <Faucet wallet={wallet} />
                    </Container>
                    <StyledDiv />
                    <Container>
                        <Balances wallet={wallet} />
                    </Container>
                </Container>
            </Router>
        </>
    )
}

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <UseWalletProvider
                chainId={chain.id}
                connectors={{ walletconnect: { rpcUrl: chain.rpcUrl } }}
            >
                <WalletProvider />
            </UseWalletProvider>
        </ThemeProvider>
    )
}

export default App
