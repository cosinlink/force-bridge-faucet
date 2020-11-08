import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../App'
import { useSnakeMove } from '../hooks/snake'
const log = console.log.bind(console)

const StyledButton = styled.button`
    margin-top: 40px;
    margin-bottom: 30px;

    background: palevioletred;
    color: white;
    font-size: 1.3em;
    padding: 0.3em 1.2em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    margin-left: 0.5em;
`

const StyledContainer = styled.div`
    text-align: center;
    margin: 0 auto;
`

const Faucet = () => {
    const getTestToken = (tokenName) => {
        return () => {
            log(`getTestToken: ${tokenName}`)
        }
    }

    return (
        <StyledContainer>
            <StyledButton onClick={getTestToken('DAI')}>
                Get 100 DAI
            </StyledButton>
            <StyledButton onClick={getTestToken('USDT')}>
                Get 100 USDT
            </StyledButton>
            <StyledButton onClick={getTestToken('USDC')}>
                Get 100 USDC
            </StyledButton>
        </StyledContainer>
    )
}

export default Faucet
