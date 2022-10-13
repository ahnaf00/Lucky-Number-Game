;(() => {
    //selection
    const formElm = document.querySelector('form')
    const inputElm = document.querySelector('#luck-input')
    const winScoreElm = document.querySelector('.lucky-number span')
    const winPlayerElm = document.querySelector('.winner')
    const p1BtnElm = document.querySelector('.p1Btn')
    const p2BtnElm = document.querySelector('.p2Btn')
    const p1ScoreElm = document.querySelector('.p1')
    const p2ScoreElm = document.querySelector('.p2')
    const resetBtnELm = document.querySelector('#resetBtn')
  
    let p1Score
    let p2Score
    let p1Turn
    let p2Turn
    let winScore
    let isGameOver
  
    function setRandomPlayer() {
      const playerArr = ['p1Turn', 'p2Turn']
      const num = Math.floor(Math.random() * playerArr.length)
      console.log(num)
      const player = playerArr[num]
      return player
    }
  
    function setInitialValues() {
      p1Score = 0
      p2Score = 0
      if (setRandomPlayer() === 'p1Turn') {
        p1Turn = true
        p2Turn = false
      } else {
        p2Turn = true
        p1Turn = false
      }
  
      console.log(p1Turn, p2Turn)
      winScore = 10
      isGameOver = false
    }
  
    function validateInput(inputVal) {
      let isInValid = false
      //validation check
      // NaN !== NaN results true if value is not real number
      if (!inputVal || inputVal !== inputVal) {
        alert('please fill the input or provide valid number')
        isInValid = true
      }
  
      return isInValid
    }
  
    function resetInput() {
      //reset the input
      inputElm.value = ''
    }
  
    function setInitialDOM() {
      winScoreElm.textContent = winScore
      p1ScoreElm.textContent = p1Score
      p2ScoreElm.textContent = p2Score
      if (p1Turn) {
        p1BtnElm.removeAttribute('disabled')
        p2BtnElm.setAttribute('disabled', 'disabled')
      } else {
        p2BtnElm.removeAttribute('disabled')
        p1BtnElm.setAttribute('disabled', 'disabled')
      }
  
      //resetting winner player message
      winPlayerElm.textContent = ''
      //resetting player or player-2 button disabled state
    }
  
    function setDisablePlayerBTnOnWin() {
      p1BtnElm.setAttribute('disabled', 'disabled')
      p2BtnElm.setAttribute('disabled', 'disabled')
    }
  
    //handling Submit part
    formElm.addEventListener('submit', (evt) => {
      //prevent browser reload
      evt.preventDefault()
      //reset the game in case anyone change and submit new number during playing
      setInitialValues()
      setInitialDOM()
  
      //getting the input value
      const inputVal = Number(inputElm.value)
  
      const isInValid = validateInput(inputVal)
  
      if (isInValid) {
        console.log('some problem')
        return
      }
      //reset the input
      resetInput()
      //setting data on memory
      winScore = inputVal
      //setting on winning score
      winScoreElm.textContent = inputVal
    })
  
    //Handling players Click
    p1BtnElm.addEventListener('click', (evt) => {
      if (p1Turn && !isGameOver) {
        p1Score++
        p1ScoreElm.textContent = p1Score
      }
      //setting p1 turn false
      p1Turn = false
      p1BtnElm.setAttribute('disabled', 'disabled')
      //switch to p2 Turn
      p2Turn = true
      p2BtnElm.removeAttribute('disabled')
  
      //checking winner state
      if (p1Score === winScore) {
        isGameOver = true
        setDisablePlayerBTnOnWin()
        //p1 is winner
        winPlayerElm.textContent = 'Player 1 is the winner'
      }
    })
  
    p2BtnElm.addEventListener('click', (evt) => {
      if (p2Turn && !isGameOver) {
        //memory data update
        p2Score++
        //DOM Update
        p2ScoreElm.textContent = p2Score
      }
      //setting p2 turn false
      p2Turn = false
      p2BtnElm.setAttribute('disabled', 'disabled')
      //switch to p2 Turn
      p1Turn = true
      p1BtnElm.removeAttribute('disabled')
  
      if (p2Score === winScore) {
        isGameOver = true
        setDisablePlayerBTnOnWin()
        //p2 is winner
        winPlayerElm.textContent = 'Player 2 is the winner'
      }
    })
  
    resetBtnELm.addEventListener('click', () => {
      setInitialValues()
      setInitialDOM()
    })
  
    setInitialValues()
    setInitialDOM()
  })()