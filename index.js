let gameRound = 0;
const round = document.querySelector(".round");
const roundEl = document.querySelector("span");
let rollBtn = document.querySelector("button");
let matchResults = [];
const view = document.querySelector(".view");
let Player1 = document.querySelector(".first-player");
let Player2 = document.querySelector(".second-player");
let playerWinningsTotal = document.querySelector('#player-winnings-total')
let firstPlaayerWinnigs = 0
let secondPlaayerWinnigs = 0
let drawPlaayerWinnigs = 0
const formData = document.querySelector('form')
let name1 = 'You';
let name2 = 'Computer';
const wrongName = document.querySelector('.wrong-name')

function localFetch(){
  const firstName = localStorage.getItem('name1')
  const secondName = localStorage.getItem('name2')

  if(firstName != null && secondName != null){
    console.log(firstName)
    name1 = firstName
    console.log(secondName)
    name2 = secondName
    Player1.textContent = name1;
    Player2.textContent = name2;
    localStorage.removeItem('name1')
    localStorage.removeItem('name2')
  }else{
    console.log('Nothing')
    Player1.textContent = name1;
    Player2.textContent = name2;
}
}

function rollDice() {
  gameRound += 1;
  let dice1 = document.getElementById("dice-1");
  rollBtn.style.display = "none";
  let dice2 = document.getElementById("dice-2");
  let winnerPlayer = document.querySelector("#winner-results");
  let randomNum1 = Math.floor(Math.random() * 6) + 1;
  let randomNum2 = Math.floor(Math.random() * 6) + 1;
  let message = "";
  let winner = "";
  let matchData = {
    round: "",
    winner: "",
    dices: {},
  };

  winnerPlayer.classList.remove("winner-highlight");
  dice1.setAttribute("src", "images/rolling-whte-dice.gif");
  dice2.setAttribute("src", "images/rollingred-dice.gif");
  winnerPlayer.textContent = message;
  setTimeout(() => {
    dice1.setAttribute("src", `images/white${randomNum1}.jpeg`);
    dice2.setAttribute("src", `images/red${randomNum2}.jpeg`);

    if (randomNum1 > randomNum2) {
      message = `${name1} won`;
      firstPlaayerWinnigs += 1
      winner = name1;
    } else if (randomNum1 === randomNum2) {
      message = "Draw Game";
      drawPlaayerWinnigs += 1
      winner = "Draw";
    } else {
      message = `${name2} won`;
      secondPlaayerWinnigs += 1
      winner = name2;
    }
    winnerPlayer.textContent = message;
    winnerPlayer.classList.add("winner-highlight");
    roundEl.textContent = gameRound;

    matchData.round = gameRound;
    matchData.winner = winner;
    matchData.dices = {
      img1: `images/white${randomNum1}.jpeg`,
      img2: `images/red${randomNum2}.jpeg`,
    };
    matchResults.unshift(matchData);
    selectedMatchResults = matchResults.slice(0, 5);

    setTimeout(() => {
      let nayNag = "";
      selectedMatchResults.forEach((item) => {
        nayNag += `
       <div class='prev-results-container'>
          <div class'prev-round'>
          ${item.round}
          </div>
          <div class='prev-winner'>
          ${item.winner}
          </div>
          <div class='prev-results'>
          <img src=${item.dices.img1} />
          <img src=${item.dices.img2} />
          </div>
       </div>`;
      });
      view.innerHTML = `<p onclick='viewAll()'>View All</p>
         <p onclick="clearAll()">clear History</p>
         `;
      round.innerHTML = nayNag;
    }, 500);
  }, 1800);
  setTimeout(() => {
    rollBtn.style.display = "block";
    playerWinningsTotal.innerHTML = `
    <h4>${name1}: <span>${firstPlaayerWinnigs} </span></h4>
    <h4>Draws: <span>${drawPlaayerWinnigs}</span></h4>
    <h4>${name2}: <span>${secondPlaayerWinnigs}</span></h4>
    `
    

  }, 2800);
}

function viewAll() {
  view.innerHTML = `<p onclick='hide()'>Hide</p>
        <p onclick="clearAll()">clear Game History</p>
  `;
  let nayNag = "";
  matchResults.forEach((item) => {
    nayNag += `
 <div class='prev-results-container'>
    <div class'prev-round'>
    ${item.round}
    </div>
    <div class='prev-winner'>
    ${item.winner}
    </div>
    <div class='prev-results'>
    <img src=${item.dices.img1} />
    <img src=${item.dices.img2} />
    </div>
 </div>`;
  });
  round.innerHTML = nayNag;
}

function hide() {
  view.innerHTML = `<p onclick='viewAll()'>Viell All</p>
         <p onclick="clearAll()">clear Game History</p>
  `;
  let nayNag = "";
  selectedMatchResults.forEach((item) => {
    nayNag += `
 <div class='prev-results-container'>
    <div class'prev-round'>
    ${item.round}
    </div>
    <div class='prev-winner'>
    ${item.winner}
    </div>
    <div class='prev-results'>
    <img src=${item.dices.img1} />
    <img src=${item.dices.img2} />
    </div>
 </div>`;
  });
  round.innerHTML = nayNag;
}

function clearAll() {
  matchResults = [];
  round.innerHTML = "";
  playerWinningsTotal.innerHTML = ''
 gameRound = 0;
 firstPlaayerWinnigs = 0
 secondPlaayerWinnigs = 0
 drawPlaayerWinnigs = 0
}

function handleSubmit(){
   let player1Name = document.getElementById("player1-name").value
   let player2Name = document.getElementById("player2-name").value
   let playerNameMessage = ''

   if(player1Name.length >= 3 && player2Name.length >= 3){
    if(player1Name.length < 9 && player2Name.length < 9){
      if(player1Name != player2Name){
        localStorage.setItem('name1', player1Name)
        localStorage.setItem('name2', player2Name)
        window.location.href = 'play.html'
      }else{
        playerNameMessage = 'Use different names'
      }
    }else{
      playerNameMessage = 'Name should be 3 to 8 characters.'
    }
   }else{
    playerNameMessage = 'Name should be 3 to 8 characters.'
   }
  wrongName.textContent = playerNameMessage
}

localFetch()