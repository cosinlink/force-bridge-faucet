import { useEffect, useState } from 'react'
import { GAME_STATUS } from '../constants/constant'
import {
    eatSweet,
    generateRandomSweet,
    getMovedQueue,
    targetInQueue,
} from '../containers/helper'

export const useSnakeMove = (direction, gameStatus, squareSize) => {
    const initQueue = [
        [5, 8],
        [5, 7],
        [5, 6],
    ]
    const [snakeQueue, setSnakeQueue] = useState(initQueue)
    const [sweetGrid, setSweetGrid] = useState(
        generateRandomSweet(initQueue, squareSize)
    )

    useEffect(() => {
        const id = setInterval(() => {
            if (gameStatus !== GAME_STATUS.STARTED) {
                return
            }

            setSnakeQueue((prevQueue) => {
                let newQueue = getMovedQueue(prevQueue, direction)

                // snake eat the sweet
                if (targetInQueue(sweetGrid, snakeQueue)) {
                    newQueue = eatSweet(newQueue, direction)
                    setSweetGrid(generateRandomSweet(newQueue, squareSize))
                }

                return newQueue
            })
        }, 100)

        return () => {
            clearInterval(id)
        }
    })
    return [snakeQueue, sweetGrid]
}
