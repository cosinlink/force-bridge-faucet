import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
const log = console.log.bind(console)

const AccountButton = ({wallet}) => {
  const handleConnectClick = () => {
    wallet.connect()
  }
  const handleDisConnectClick = () => {
    wallet.reset()
  }

  return (
    <StyledAccountButton>
      {!wallet.account ? (
        <Button onClick={handleConnectClick} size="sm" text="Connect Wallet" />
      ) : (
        <Button onClick={handleDisConnectClick} size="sm" text="Disconnect" />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
