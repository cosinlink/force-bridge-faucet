import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import {getUserBalance, postGetTestToken} from '../contract/erc20'
import Card from "../components/Card";
import Button from "../components/Button";
import CardContent from "../components/CardContent";
import CardTitle from "../components/CardTitle";

const log = console.log.bind(console)

const StyledTitle = styled.div`
    border-bottom: solid 1px #e2d6cf;
`
const StyledDiv = styled.div`
    margin-top: 40px;
    width: 12em;
`

const Faucet = ({wallet}) => {
    const getTestToken = (tokenName) => {
        if (!wallet.account) {
            return () => {
                wallet.connect()
            }
        }
        return () => {
            postGetTestToken(tokenName.toLowerCase(), wallet.account)
                .then((result) => {
                    log(result)
                })
        }
    }

    return (
        <Card>
            <StyledTitle>
                <CardTitle text="Faucet"/>
            </StyledTitle>
            <CardContent>
                <StyledDiv>
                    <Button onClick={getTestToken('dai')}>
                        Get 100 DAI
                    </Button>
                </StyledDiv>

                <StyledDiv>
                    <Button onClick={getTestToken('usdt')}>
                        Get 100 USDT
                    </Button>
                </StyledDiv>

                <StyledDiv>
                    <Button onClick={getTestToken('usdc')}>
                        Get 100 USDC
                    </Button>
                </StyledDiv>
            </CardContent>

        </Card>
    )
}

export default Faucet
