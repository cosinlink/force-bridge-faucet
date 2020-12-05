import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import {
    getAllowanceForTarget,
    postApproveErc20ToTarget,
    postClaimTestToken,
} from '../contract/erc20'
import Card from '../components/Card'
import Button from '../components/Button'
import CardContent from '../components/CardContent'
import CardTitle from '../components/CardTitle'
import { getTodayDateString } from '../utils/date'

const log = console.log.bind(console)

// TODO this is just mock address for TokenLocker contract address of Force Bridge
// You should replace "0x1111111111111111111111111111111111111111" with the real contract address deployed on ropsten
const FORCE_BRIDGE_TOKEN_LOCKER_ADDRESS =
    '0x1111111111111111111111111111111111111111'

const StyledTitle = styled.div`
    border-bottom: solid 1px #e2d6cf;
`
const StyledDiv = styled.div`
    margin-top: 40px;
    width: 100%;

    button {
        width: 20em;
        display: inline-block;
    }

    button + button {
        margin-left: 10px;
    }
`

const Faucet = ({ wallet }) => {
    const [tokenModal, setTokenModal] = useState('')
    const [approveStatus, setApproveStatus] = useState({
        dai: false,
        usdt: false,
        usdc: false,
    })

    useEffect(() => {
        if (!wallet.account) {
            return
        }

        const tokenNames = ['dai', 'usdt', 'usdc']
        const promises = tokenNames.map((tokenName) =>
            getAllowanceForTarget(
                tokenName,
                wallet.account,
                FORCE_BRIDGE_TOKEN_LOCKER_ADDRESS
            )
        )

        Promise.all(promises).then((results) => {
            const status = {}
            for (let i = 0; i < tokenNames.length; i++) {
                const tokenName = tokenNames[i]
                status[tokenName] = results[i] !== '0'
            }
            log(`approveStatus`, status)
            setApproveStatus(status)
        })
    }, [wallet])

    const claimTestToken = (tokenName) => {
        if (!wallet.account) {
            return () => {
                wallet.connect()
            }
        }
        return () => {
            const dateKey = getTodayDateString()
            let countMap = JSON.parse(localStorage.getItem('count'))
            log(`countMap`, countMap)
            if (countMap && countMap[tokenName] >= dateKey) {
                setTokenModal(tokenName)
                log(`you have got the test ${tokenName.toUpperCase()} today`)
                return false
            }

            postClaimTestToken(tokenName.toLowerCase(), wallet.account).then(
                (result) => {
                    if (result.status) {
                        countMap[tokenName] = dateKey
                        localStorage.setItem('count', JSON.stringify(countMap))
                        log(`get test ${tokenName} successfully!`)
                    }
                }
            )
            return true
        }
    }

    const approveErc20ToLockerContract = (tokenName) => {
        if (!wallet.account) {
            return () => {
                wallet.connect()
            }
        }
        return () => {
            postApproveErc20ToTarget(
                tokenName.toLowerCase(),
                wallet.account,
                FORCE_BRIDGE_TOKEN_LOCKER_ADDRESS
            ).then((result) => {
                if (result.status) {
                    log(`approve test ${tokenName} successfully!`)
                }
            })
            return true
        }
    }

    const renderButtons = () => {
        let StyledDivs = []
        const tokenNames = ['dai', 'usdt', 'usdc']
        for (const tokenName of tokenNames) {
            StyledDivs.push(
                <StyledDiv>
                    <Button onClick={claimTestToken(tokenName)}>
                        Get 100 {tokenName.toUpperCase()}
                    </Button>

                    <Button
                        onClick={approveErc20ToLockerContract(tokenName)}
                        disabled={approveStatus[tokenName]}
                    >
                        {approveStatus[tokenName]
                            ? 'Approved!'
                            : `Approve ${tokenName.toUpperCase()} to Force Bridge`}
                    </Button>
                </StyledDiv>
            )
        }
        return StyledDivs
    }

    return (
        <Card>
            <StyledTitle>
                <CardTitle text="Faucet" />
            </StyledTitle>
            <CardContent>{renderButtons()}</CardContent>
        </Card>
    )
}

export default Faucet
