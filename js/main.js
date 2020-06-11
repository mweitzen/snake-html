/* GAME CONFIG CONSTANTS */
import { SNAKE_SPEED } from './config.js'

/* GAME PIECES */
import { updateSnake, renderSnake } from './snake.js'
import { updateFood, renderFood } from './food.js'
import { getInputDirection } from './input.js'

/* GAME BOARD */
const gameBoard = document.getElementById("game-board")

/* MAIN GAME LOOP */
let animation
export function getAnimation(){
  return animation
}
let lastRenderTime = 0
let gameOver = false
function main(currentTime) {
  if (gameOver) {
    const retry = confirm("You lost dummy. Want to play again?")
    if (retry) return window.location = "/"
    return
  }
  /* request animation loop */
  animation = window.requestAnimationFrame(main)
  /* initial render */
  if (lastRenderTime === 0) render()

  /* check the speed of our animation delay and throttle to SNAKE_SPEED */
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if ( secondsSinceLastRender < ( 1 / SNAKE_SPEED ) ) return
  lastRenderTime = currentTime

  /* update game logic */
  const shouldRender = update()
  if (shouldRender) {
    render()
  }
}

/* UPDATE */
function update() {
  const userMove = getInputDirection()
  const stillAlive = updateSnake(userMove)
  if (stillAlive === false) {
    gameOver = true
    return false
  }
  return true
}

/* RENDER */
function render() {
  gameBoard.innerHTML = ""
  renderSnake(gameBoard)
  renderFood(gameBoard)
}

/* BEGIN MAIN LOOP */
animation = window.requestAnimationFrame(main)
