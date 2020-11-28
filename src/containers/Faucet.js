import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {getUserBalance, postGetTestToken} from '../contract/erc20'
const log = console.log.bind(console)

const StyledButton = styled.button`
    margin-top: 40px;
    // margin-bottom: 30px;

    background: palevioletred;
    width: 12em;
    color: white;
    font-size: 1.2em;
    padding: 0.3em 1.2em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    // margin-left: 0.5em;
`

const StyledContainer = styled.div`
    border: 3px dashed red;
    text-align: center;
    // margin: 0 auto;
    display: flex;
    flex: 1;
    flex-direction: column;
`

const Faucet = ({ wallet }) => {
    const getTestToken = (tokenName) => {
        return () => {
            log(`getTestToken: ${tokenName}, userAddr: ${wallet.account}`)
            getUserBalance(tokenName.toLowerCase(), wallet.account)
                .then((amount) => {
                    log(amount)
                })

            postGetTestToken(tokenName.toLowerCase(), wallet.account)
                .then((result) => {
                    log(result)
                })
        }
    }

    return (
        <StyledContainer>
            <StyledButton onClick={getTestToken('dai')}>
                Get 100 DAI
            </StyledButton>
            <StyledButton onClick={getTestToken('usdt')}>
                Get 100 USDT
            </StyledButton>
            <StyledButton onClick={getTestToken('usdc')}>
                Get 100 USDC
            </StyledButton>
        </StyledContainer>
    )
}

export default Faucet
