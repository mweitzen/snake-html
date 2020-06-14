let inputDirection = { x: 0, y: 0 }
let lastInputDirection = null
import { getSnakeBody } from './snake.js'
import { getAnimation, setAnimation } from './main.js'

let paused = false
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (paused === false) {
      paused = true
      return window.cancelAnimationFrame(getAnimation())
    }
    paused = false
    return setAnimation()
  }
  if (!lastInputDirection || lastInputDirection.x === 0) {
    if (e.key === 'ArrowLeft') return inputDirection = { x: -1, y: 0 }
    if (e.key === 'ArrowRight') return inputDirection = { x: 1, y: 0 }
  }
  if (!lastInputDirection || lastInputDirection.y === 0) {
    if (e.key === 'ArrowUp') return inputDirection = { x: 0, y: -1 }
    if (e.key === 'ArrowDown') return inputDirection = { x: 0, y: 1 }
  }
})

export function getInputDirection() {
  const snakeBody = getSnakeBody()
  if (snakeBody.length > 1) {
    lastInputDirection = inputDirection
  }
  return inputDirection
}
