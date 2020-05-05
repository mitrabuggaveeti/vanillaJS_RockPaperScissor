const game = () => {
  let pScore = 0;
  let cScore = 0;
  const options = document.querySelectorAll(".options button");
  const playerHand = document.querySelector(".player-hand");
  const computerHand = document.querySelector(".computer-hand");
  const hands = document.querySelectorAll(".hands img");
  const match = document.querySelector(".match");
  const won=document.querySelector(".won");
  const winner = document.querySelector(".winner");
  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
  
   

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;

    if(pScore>=3 || cScore>=3){
      
      match.classList.remove("fadeIn");
      match.classList.add("fadeOut");
      won.classList.add("fadeIn");

      if(pScore>cScore){
        document.querySelector(".won h2").textContent = "WINNER IS PLAYER";
      }
      else{ 
        if(pScore==cScore){
          document.querySelector(".won h2").textContent = "ITS A TIE 50:50";
        }
        else
        document.querySelector(".won h2").textContent = "WINNER IS COMPUTER";
      }
      
      const reMatchBtn = document.querySelector(".won button");
      
      reMatchBtn.addEventListener("click", ()=>{
             
        match.classList.remove("fadeOut");
         match.classList.add("fadeIn");
         won.classList.remove("fadeIn");
         won.classList.add("fadeOut");

         playerScore.textContent = 0;
        computerScore.textContent = 0;
        pScore=0;
        cScore=0;

        winner.textContent = "Choose an option";
        playerHand.src = `./assets/rock.png`;
        computerHand.src = `./assets/rock.png`;


      });
      

    }
  };

  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();
