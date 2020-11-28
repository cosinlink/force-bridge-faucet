import React, { useState, useContext } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
    border: 3px dashed red;
    text-align: center;
    // margin: 0 auto;
    display: flex;
    flex: 1;
    flex-direction: column;
`
const Balances = ({ wallet }) => {
    return (
        <StyledContainer>
            <h1>Wallet</h1>
            {wallet.status === 'connected' ? (
                <div>
                    <div>Account: {wallet.account}</div>
                    <div>Balance: {wallet.balance}</div>
                    <button onClick={() => wallet.reset()}>disconnect</button>
                </div>
            ) : (
                <div>
                    Connect:
                    <button onClick={() => wallet.connect()}>MetaMask</button>
                </div>
            )}
        </StyledContainer>
    )
}

export default Balances
