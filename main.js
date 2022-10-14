;(() => {
  const formElm       = document.querySelector("form")
  const inputElm      = document.querySelector("#luck-input")
  const winScoreElm   = document.querySelector(".lucky-number span")
  const winPlayerElm  = document.querySelector(".winner")
  const p1BtnElm      = document.querySelector(".p1Btn")
  const p2BtnElm      = document.querySelector(".p2Btn")
  const p1ScoreElm    = document.querySelector(".p1")
  const p2ScoreElm    = document.querySelector(".p2")
  const resetBtnElm   = document.querySelector("#resetButton")

  let p1Score     
  let p2Score     
  let p1Turn     
  let p2Turn     
  let winScore   
  let isGameOver 

  function setRandonPlayer()
  {
      const playerArr = ["p1Turn", "p2Turn"]
      const num = Math.floor(Math.random()* playerArr.length)
      console.log(num)
      const player = playerArr[num]
      return player
  }

  function setInitialValues(){
      p1Score     = 0
      p2Score     = 0
      if( setRandonPlayer() === "p1Turn" )
      {
          p1Turn = true
          p2Turn = false
      }else{
          p2Turn = true
          p1Turn = false
      }
      // p1Turn = true
      // p2Turn = false
      console.log(p1Turn, p2Turn)
      // winScore    = Math.floor(Math.random()*10 +1)
      winScore    = 10
      isGameOver  = false
  }

  // Validation Check Function
  function validateInPut(inputValue){
      let isInValid = false
      if( !inputValue || inputValue !== inputValue )
      {
          alert("Please fill the input or provide provide valid number")
          isInValid = true
      }
      return isInValid
  }

  function resetInput() {
      //reset the input
      inputElm.value = ''
  }

  function setInitialDOM()
  {
      winScoreElm.textContent     = winScore
      p1ScoreElm.textContent      = p1Score
      p2ScoreElm.textContent      = p2Score

      if(p1Turn)
      {
          p1BtnElm.removeAttribute('disabled')
          p2BtnElm.setAttribute('disabled', 'disabled')
      }else
      {
          p2BtnElm.removeAttribute('disabled')
          p1BtnElm.setAttribute('disabled', 'disabled')
      }

      // resetting winner player message
      winPlayerElm.textContent = ""
  }

  function setDisablePlayerBtn()
  {
      p1BtnElm.setAttribute("disabled", "disabled")
      p2BtnElm.setAttribute("disabled", "disabled")
  }

  formElm.addEventListener( "submit", (evt) => {
      // prevent browser reload
      evt.preventDefault()

      // Reset the game in case anyone change and submit new number 
      setInitialValues()
      setInitialDOM()
      // geeting the input value
      const inputValue = Number(inputElm.value)
      // Validation Check
      const isInValid2 = validateInPut(inputValue)
      if(isInValid2) {
          console.log("some problem")
          return
      }
      // reset the input
      resetInput()
      
      // Setting data on memory 
      winScore = inputValue

      // Setting on winning score
      winScoreElm.textContent = inputValue

  } )

  // Handling Player Click
  p1BtnElm.addEventListener( "click", (evt) => {
      if(p1Turn && !isGameOver){
          // Memory Data Update
          p1Score++
          // DOM Update
          p1ScoreElm.textContent = p1Score
      }
      // setting p1turn false
      p1Turn = false
      p1BtnElm.setAttribute("disabled", "disabled")
      // Switch to p2 turn
      p2Turn = true
      p2BtnElm.removeAttribute("disabled")

      // Checking winner state 
      if( p1Score === winScore )
      {
          isGameOver = true
          setDisablePlayerBtn()
          // Playert 1 is the winner
          winPlayerElm.textContent = "P1 is the winner"
      }
  } )

  p2BtnElm.addEventListener( "click", (evt) => {
      if( p2Turn && !isGameOver)
      {
          // Memory Data Update
          p2Score++
          // DOM Update
          p2ScoreElm.textContent = p2Score
          
      }
      p2Turn = false
      p2BtnElm.setAttribute("disabled", "disabled")

      p1Turn = true
      p1BtnElm.removeAttribute("disabled")

      if( p2Score === winScore )
      {
          isGameOver = true 
          setDisablePlayerBtn()
          // Player 2 is the winner
          winPlayerElm.textContent = "P2 is the winner"

      }

  } );

  resetBtnElm.addEventListener( "click", () => {
      setInitialValues()
      setInitialDOM()
  } )

  setInitialValues()
  setInitialDOM()
})()