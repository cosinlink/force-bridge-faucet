import React, {useState} from 'react'
import './App.css'
import Faucet from './containers/Faucet'
import Balances from './containers/Balances'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'

export const AppContext = React.createContext({})

const StyledContainer = styled.div`
    display: flex;
    // align-items: center;
    font-size: 16px;
    width: 100%;
    height: 100%;
`

function App() {
    const wallet = useWallet()
    return (

        <StyledContainer>
            <Faucet wallet={wallet}/>
            <Balances wallet={wallet}/>
        </StyledContainer>
    )
}

export default App
