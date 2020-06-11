import { GRID_SIZE } from './config.js'
import { isIntersectingSnake } from './snake.js'

const getRandomGridPosition = () => ({
    x: Math.floor(Math.random() * GRID_SIZE + 1),
    y: Math.floor(Math.random() * GRID_SIZE + 1)
  })

let foodPosition = getRandomGridPosition()

export function getCurrentFoodPosition() {
  return foodPosition
}

function getRandomFoodPosition() {
    let newFoodPosition
    while ( newFoodPosition == null || isIntersectingSnake(newFoodPosition)) {
      newFoodPosition = getRandomGridPosition()
    }
    return newFoodPosition
}

export function eatFood() {
  updateFood()
}

export function updateFood() {
  foodPosition = getRandomFoodPosition()
}

export function renderFood(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = foodPosition.y
  foodElement.style.gridColumnStart = foodPosition.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}
