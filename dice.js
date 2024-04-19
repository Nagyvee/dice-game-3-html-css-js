let diceOne = document.getElementById('dice-one')
let diceTwo = document.getElementById('dice-two')
let btns = document.querySelectorAll('button')
let winningEl = document.querySelector('h2')
let container = document.querySelector('.container')
let YourChoice = document.querySelector('.your-choice')
let winningDice = document.querySelector('.winning-dice')

function selectDice(input){
 const randomOne = Math.floor(Math.random()*6)+1
 const randomTwo = Math.floor(Math.random()*6)+1
 let winnerStyle = ''
 let winner = ''
  diceOne.setAttribute('src', "dice-images/rolling-whte-dice.gif")
  diceTwo.setAttribute('src', "dice-images/rollingred-dice.gif")
  winningEl.textContent = 'Rolling dices, Wait...'
  
  btns.forEach((button)=>{
    button.style.display = 'none'
  })

  setTimeout(()=>{
    diceOne.setAttribute('src', `dice-images/white${randomOne}.jpeg`)
    diceTwo.setAttribute('src', `dice-images/red${randomTwo}.jpeg`)

    // btns.forEach((button)=>{
    //     button.style.display = ''
    //   })

if(randomOne > randomTwo){
   winner = 'white'
}else if(randomOne === randomTwo){
 winner = 'draw'
}else{
    winner = 'red'
}

if(input === winner){
    winningEl.textContent = 'You won! 🤩' 
    winnerStyle = 'winner-anim'
    winningEl.classList.add(winnerStyle)
    container.classList.add(winnerStyle)
}else{
    winningEl.textContent = 'OOh no, You loose 😢'
}
YourChoice.textContent = `Your choice: \t ${input.toUpperCase()}`
YourChoice.style.color = input
winningDice.textContent = ` Winning Dice: ${winner.toUpperCase()}`
winningDice.style.color = winner
container.innerHTML += `<button class="play-again-btn" onclick="playAgain()">Play Again</button>`

  }, 1000)
}

function playAgain(){
    location.reload()
}