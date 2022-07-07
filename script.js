// Game board
document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.game-board')
  let squares = Array.from(document.querySelectorAll('.game-board div'))
  const width = 10

  // Piece (L,L(flipped),T,Z,Z(flipped),I,O)
  //Rotation 1
  //Rotation 2
  //Rotation 3
  //Rotation 4

  const lPiece = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]
  const lFlippedPiece = [
    [0, 1, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [width, width * 2, width + 1, width + 2]
  ]
  const tPiece = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]
  const zPiece = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const zFlippedPiece = [
    [1, width, width + 1, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width, width + 1, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2]
  ]

  const iPiece = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const oPiece = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const gamePieces = [
    lPiece,
    lFlippedPiece,
    zFlippedPiece,
    zPiece,
    tPiece,
    iPiece,
    oPiece
  ]

  //Selecting Random Pieces

  let currentPosition = 4
  let currentRotation = 0

  let random = Math.floor(Math.random() * gamePieces.length)
  let currentpiece = gamePieces[random][currentRotation]

  function draw() {
    currentpiece.forEach((index) => {
      squares[currentPosition + index].classList.add('piece')
    })
  }
  draw()

  function undraw() {
    currentpiece.forEach((index) => {
      squares[currentPosition + index].classList.remove('piece')
    })
  }

  // Register keyboard commands to control current piece
  // keycodes: 37 - left arrow, 38 - up arrow , 39 - right arrow, 40 - down arrow
  function control(e) {
    if (e.keyCode === 37) {
      slideLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      slideRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

  // Falling down the board
  fallingSpeed = setInterval(moveDown, 1000)

  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    stopFalling()
  }
  // create bottom border to stop falling

  function stopFalling() {
    if (
      currentpiece.some((index) =>
        squares[currentPosition + index + width].classList.contains('taken')
      )
    ) {
      currentpiece.forEach((index) =>
        squares[currentPosition + index].classList.add('taken')
      )
      random = Math.floor(Math.random() * gamePieces.length)
      currentpiece = gamePieces[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }
  // Lateral movement down the board
  function slideLeft() {
    undraw()
    const leftBorder = currentpiece.some(
      (index) => (currentPosition + index) % width === 0
    )

    if (!leftBorder) currentPosition -= 1
    if (
      currentpiece.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition += 1
    }
    draw()
  }

  function slideRight() {
    undraw()
    const rightBorder = currentpiece.some(
      (index) => currentPosition + (index % width) === width - 1
    )

    if (!rightBorder) currentPosition += 1
    if (
      currentpiece.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition -= 1
    }
    draw()
  }
  // Rotating Pieces
  function rotate() {
    undraw()

    currentRotation++
    if (currentRotation === currentPosition.length) {
      currentRotation = 0
    }
    currentpiece = gamePieces[random][currentRotation]
    draw()
  }

  // Show the upcoming piece

  // Clear the rows when full

  // Increase Score
  const scoreDisplay = document.querySelector('#score')
  // Increase speed gradually with every level increase
  const levelDisplay = document.querySelector('#level')
  // End game when column is full

  //  Click Play Again to Start Over
})
