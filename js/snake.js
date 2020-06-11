import { SNAKE_BEGIN_POSITION, SNAKE_GROWTH_RATE } from './config.js'
import { getCurrentFoodPosition, eatFood } from './food.js'
import { getInputDirection } from './input.js'

/* UTILITY FUNCTIONS */
export function isIntersectingSnake(item, snake) {
  // snake is a Boolean to check if its snake
  let check = [...snakeBody]
  if (snake) {
    check.shift()
    console.log(check)
  }
  return check.some(segment => (segment.x === item.x && segment.y === item.y))
}

function isOutsideGrid(head) {
  return ( head.x < 1 || head.x > 21 || head.y < 1 || head.y > 21 )
}

/* SNAKE METHODS */
let snakeBody = [SNAKE_BEGIN_POSITION]
export function getSnakeBody() {
  return snakeBody
}

function moveSnake(userMove) {
  let newHead = {
    x: snakeBody[0].x + userMove.x,
    y: snakeBody[0].y + userMove.y
  }

  let move = [...snakeBody]
  move.pop()
  move.unshift(newHead)
  snakeBody = [...move]
}

function killSnake() {
  console.log("DEAD")
  return false
}


function growSnake() {
  let grow = [...snakeBody]
  for (let i = 0; i < SNAKE_GROWTH_RATE; i++) {
    const lastSegment = grow[grow.length - 1]
    grow.push({...lastSegment})
  }
  snakeBody = [...grow]
}

export function updateSnake(userMove) {
  moveSnake(userMove)
  const newHead = snakeBody[0]

  /* check snake death */
  if (isOutsideGrid(newHead) || isIntersectingSnake(newHead, true)) return killSnake()

  /* check food position */
  const foodPosition = getCurrentFoodPosition()
  const snakeOnFood = (
    foodPosition.x === newHead.x
    && foodPosition.y == newHead.y
  )

  /* eat food and grow */
  if (snakeOnFood) {
    console.log("Nom Nom")
    eatFood()
    growSnake()
  }
}

export function renderSnake(gameBoard) {
  /* draw snake with body parts (segments) */
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    /* render body parts on an x,y axis */
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.style.gridRowStart = segment.y
    /* set class and append to screen (game board) */
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}
