import { clonedSquare } from '../utils'
import _ from 'lodash'

const emptySquare = (squareSize) => {
    const square = []
    for (let i = 0; i < squareSize; i++) {
        square.push([])
    }
    return square
}

const generateNewHead = (prevQueue, direction) => {
    const snakeHead = [...prevQueue[0]]

    // snakeHead moved from prev snakeHead to direction once
    if (direction === 1) {
        snakeHead[0]--
    } else if (direction === 2) {
        snakeHead[1]++
    } else if (direction === 3) {
        snakeHead[0]++
    } else if (direction === 4) {
        snakeHead[1]--
    }

    return snakeHead
}

export const isOppositeDirection = (direction1, direction2) => {
    return Math.abs(direction1 - direction2) === 2
}

export const getSquareDisplayed = (snakeQueue, squareSize) => {
    let displayed = emptySquare(squareSize)
    for (const [x, y] of snakeQueue) {
        if (outOfBounds(x, y, squareSize)) {
            continue
        }
        displayed[x][y] = true
    }
    return displayed
}

export const getMovedQueue = (prevQueue, direction) => {
    const newQueue = clonedSquare(prevQueue)
    const snakeHead = generateNewHead(newQueue, direction)

    // add new snakeHead to first index of newQueue
    newQueue.unshift(snakeHead)

    // remove snakeTail
    newQueue.pop()

    return newQueue
}

export const eatSweet = (queue, direction) => {
    queue.unshift(generateNewHead(queue, direction))
    queue.unshift(generateNewHead(queue, direction))
    return queue
}

export const targetInQueue = (target, queue) => {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i][0] === target[0] && queue[i][1] === target[1]) {
            return true
        }
    }
    return false
}

export const outOfBounds = (x, y, squareSize) => {
    return x < 0 || x >= squareSize || y < 0 || y >= squareSize
}

export const gameOver = (queue, squareSize) => {
    const hasVisited = {}
    for (const [x, y] of queue) {
        if (outOfBounds(x, y, squareSize) || hasVisited[`${x},${y}`]) {
            return true
        }
        hasVisited[`${x},${y}`] = true
    }

    return false
}

export const generateRandomSweet = (snakeQueue, squareSize) => {
    let x = _.random(0, squareSize - 1)
    let y = _.random(0, squareSize - 1)
    while (targetInQueue([x, y], snakeQueue)) {
        x = _.random(0, squareSize - 1)
        y = _.random(0, squareSize - 1)
    }

    return [x, y]
}
