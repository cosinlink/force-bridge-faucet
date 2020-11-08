import React, { useState } from 'react'
import './App.css'
import Faucet from './containers/Faucet'
import { GAME_STATUS, SQUARE_SIZE } from './constants/constant'
import styled from 'styled-components'

export const AppContext = React.createContext({})

const ModalContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
`

const ModalMask = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
`

const AlertWindow = styled.div`
    margin: 0 auto;
    width: 500px;
    height: 200px;
    line-height: 200px;
    font-size: xx-large;
    opacity: 1;

    top: 50%;
    position: relative;
    transform: translateY(-50%);
    background: white;
    text-align: center;
    color: palevioletred;
`

function App() {
    const squareSize = SQUARE_SIZE
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.NOT_START)

    return (
        <AppContext.Provider
            value={{
                gameStatus,
                squareSize,
            }}
        >
            <Faucet />
        </AppContext.Provider>
    )
}

export default App
