// Game board
document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.game-board')
  let squares = Array.from(document.querySelectorAll('.game-board div'))
  const width = 10

  // Pieces (L,L(flipped),T,Z,Z(reversed),I,O)

  const lPiece = [
    [1, width + 1, width * 2 + 1, 2], //Rotation 1
    [width, width + 1, width + 2, width * 2 + 2], //Rotation 2
    [1, width + 1, width * 2 + 1, width * 2], //Rotation 3
    [width, width * 2, width * 2 + 1, width * 2 + 2] //Rotaion 4
  ]
  const lFlippedPiece = [
    [0, 1, width + 1, width * 2 + 1], //Rotation 1
    [width, width + 1, width + 2, 2], //Rotation 2
    [1, width + 1, width * 2 + 1, width * 2 + 2], //Rotation 3
    [width, width * 2, width + 1, width + 2] //Rotaion 4
  ]
  const tPiece = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width + 1, width, width * 2 + 1]
  ]
  const zPiece = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const zFlippedPiece = [
    [1, width + 1, width, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width + 1, width, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2]
  ]

  const iPiece = [
    [1, width + 1, width * 2 + 1, width * 3 + 1], //Vertical rotaion
    [width, width + 1, width + 2, width + 3], //Horizontal rotation
    [1, width + 1, width * 2 + 1, width * 3 + 1], //Vertical rotation
    [width, width + 1, width + 2, width + 3] //Horizontal rotation
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
  // Movement down the table

  // Rotating Pieces

  // Show the upcoming piece

  // Clear the rows when full

  // Increase Score
  const scoreDisplay = document.querySelector('#score')
  // Increase speed gradually with every level increase
  const levelDisplay = document.querySelector('#level')
  // End game when column is full

  //  Click Play Again to Start Over
})
