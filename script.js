// Game board
document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.game-board')
  let squares = Array.from(document.querySelectorAll('.game-board div'))
  const width = 10
  let nextRandom = 0
  let score = 0
  let gameOver = false
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

  // Random colors for each piece

  let randomColor
  function colorPiece() {
    const pieceColors = [
      'red',
      'yellow',
      'blue',
      'orange',
      'green',
      'purple',
      'pink'
    ]
    const chooseRandomColor = Math.floor(Math.random() * pieceColors.length)
    randomColor = pieceColors[chooseRandomColor]
  }
  colorPiece()
  function clearTopArea() {
    squares.forEach((index) => {
      squares.forEach((item, index) => {
        if (!squares[index].classList.contains('taken')) {
          squares[index].classList.remove(
            'green',
            'blue',
            'orange',
            'yellow',
            'purple',
            'red',
            'pink'
          )
        }
      })
    })
  }
  //Selecting Random Pieces

  let currentPosition = 4
  let currentRotation = 0

  let random = Math.floor(Math.random() * gamePieces.length)
  let currentpiece = gamePieces[random][currentRotation]

  function draw() {
    currentpiece.forEach((index) => {
      squares[currentPosition + index].classList.add('piece', randomColor)
    })
  }
  draw()

  function undraw() {
    currentpiece.forEach((index) => {
      squares[currentPosition + index].classList.remove('piece', randomColor)
    })
  }

  // Register keyboard commands to control current piece
  // keycodes: 37 - left arrow, 38 - up arrow , 39 - right arrow, 40 - down arrow
  function control(e) {
    if (gameOver != true) {
      if (e.keyCode === 37) {
        slideLeft()
      } else if (e.keyCode === 38) {
        rotate()
      } else if (e.keyCode === 39) {
        slideRight()
      } else if (e.keyCode === 40) {
        score += 1
        scoreDisplay.innerHTML = score
        moveDown()
      }
    }
  }
  document.addEventListener('keyup', control)

  // Falling down the board
  fallingSpeed = setInterval(moveDown, 500)

  function moveDown() {
    if (gameOver != true) {
      clearTopArea()
      undraw()
      currentPosition += width
      draw()
      stopFalling()
    }
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
      //Start new piece
      colorPiece()
      random = nextRandom
      nextRandom = Math.floor(Math.random() * gamePieces.length)
      currentpiece = gamePieces[random][currentRotation]
      currentPosition = 4
      draw()
      displayPreview()
      addScore()
      endGame()
    }
  }
  // Lateral movement down the board
  function slideLeft() {
    clearTopArea()
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
    clearTopArea()
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
    clearTopArea()
    undraw()

    currentRotation++
    if (currentRotation === currentpiece.length) {
      currentRotation = 0
    }
    currentpiece = gamePieces[random][currentRotation]
    draw()
  }

  // Show the upcoming piece

  const displayNextPiece = document.querySelectorAll('.next-piece div')
  const displayWidth = 4
  let displayIndex = 0

  const upNextPieces = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //l piece
    [0, 1, displayWidth + 1, displayWidth * 2 + 1], // l (flipped) piece
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // t piece
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // z piece
    [1, displayWidth, displayWidth + 1, displayWidth * 2], // z (flipped) piece
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // I piece
    [0, 1, displayWidth, displayWidth + 1] // O peice
  ]
  function displayPreview() {
    displayNextPiece.forEach((square) => {
      square.classList.remove('piece', randomColor)
    })
    upNextPieces[nextRandom].forEach((index) => {
      displayNextPiece[displayIndex + index].classList.add('piece', randomColor)
    })
  }

  // Increase Score
  const scoreDisplay = document.querySelector('#score')
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9
      ]

      if (row.every((index) => squares[index].classList.contains('taken'))) {
        score += 100
        scoreDisplay.innerHTML = score

        // Clear the rows when full

        row.forEach((index) => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('piece')
        })
        const squaresCleared = squares.splice(i, width)
        squares = squaresCleared.concat(squares)
        squares.forEach((cell) => board.appendChild(cell))
        clearTopArea()
      }
    }
  }

  // End game when column is full
  function endGame() {
    if (
      currentpiece.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      gameOver = true
      const message = document.querySelector('#message')
      message.innerHTML = 'GAME OVER'
      clearInterval(fallingSpeed)
    }
    stopFalling()
  }
  endGame()
})

// Sources
// This code was inspired by the tutorial of coding JavaScript
// by Ania Kubow

//https://selftaughttxg.com/2022/03-22/Ania_Kubow-Tetris/
