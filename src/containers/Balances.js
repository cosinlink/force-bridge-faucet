import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import Label from '../components/Label'
import Value from '../components/Value'
import CardTitle from '../components/CardTitle'
import CardContent from '../components/CardContent'
import { getBalanceNumber } from '../utils/formatBalance'
import BigNumber from 'bignumber.js'
import { getUserBalance } from '../contract/erc20'
const log = console.log.bind(console)

const StyledTitle = styled.div`
    border-bottom: solid 1px #e2d6cf;
`

const useTokenBalance = (tokenName, userAddr, ethereum) => {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        getUserBalance(tokenName, userAddr).then((result) => {
            setBalance(new BigNumber(result))
        })
    }, [userAddr, tokenName, ethereum])

    return balance
}

const Balances = ({ wallet }) => {
    const { account, balance, ethereum } = wallet

    const DAIBalance = useTokenBalance('dai', account, ethereum)
    const USDTBalance = useTokenBalance('usdt', account, ethereum)
    const USDCBalance = useTokenBalance('usdc', account, ethereum)

    return (
        <Card>
            <StyledTitle>
                <CardTitle text="Wallet" />
            </StyledTitle>
            <CardContent>
                <div style={{ flex: 1 }}>
                    <Label text="TEST Ether" />
                    <Value
                        value={
                            !!account
                                ? getBalanceNumber(balance)
                                : 'Wallet Not Connected'
                        }
                        decimals={4}
                    />
                </div>
            </CardContent>
            <CardContent>
                <div style={{ flex: 1 }}>
                    <Label text="TEST DAI" />
                    <Value
                        value={
                            !!account
                                ? getBalanceNumber(DAIBalance)
                                : 'Wallet Not Connected'
                        }
                        decimals={4}
                    />
                </div>
            </CardContent>
            <CardContent>
                <div style={{ flex: 1 }}>
                    <Label text="TEST USDT" />
                    <Value
                        value={
                            !!account
                                ? getBalanceNumber(USDTBalance, 6)
                                : 'Wallet Not Connected'
                        }
                        decimals={4}
                    />
                </div>
            </CardContent>
            <CardContent>
                <div style={{ flex: 1 }}>
                    <Label text="TEST USDC" />
                    <Value
                        value={
                            !!account
                                ? getBalanceNumber(USDCBalance, 6)
                                : 'Wallet Not Connected'
                        }
                        decimals={4}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Balances
