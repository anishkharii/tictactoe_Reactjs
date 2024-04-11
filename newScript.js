var user1Score = 0;
var user2Score = 0;
var tieScore= 0;

var startingMenu = document.querySelector(".starting-menu");
var gameContainer = document.querySelector(".game-container");
var user1 = document.querySelector(".user1-score");
var user2 = document.querySelector(".user2-score");
var tie = document.querySelector(".tie-score")
var gameBtns = document.getElementsByClassName("game-btn");
var playerTurn = document.querySelector(".player-turn");
var restartBtn = document.querySelector(".restart-btn-primary");
var winBar = document.querySelector(".win-status");
var winDetail = document.querySelector(".win-detail");
var nextRoundBtn = document.querySelector(".next-btn");
var restartMenu = document.querySelector(".restart-pop-up");
var playerOption = document.querySelectorAll(".player-option");
var quitBtn = document.querySelector(".quit-btn");
var cancelBtn = document.querySelector(".cancel-btn")
var opac = document.querySelector(".opac");

var currPlayer = "X";
running = false;
var winningPatterns= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];
  
    
var options = ["","","","","","","","",""];


function setLevel(val){
    if(val==1){
        playerOption[0].classList.add("active");
        playerOption[1].classList.remove("active"); 
        currPlayer = "X";
    }
    else{
        playerOption[0].classList.remove("active");
        playerOption[1].classList.add("active"); 
        currPlayer = "O";
    }
}

function initializeGame(){
    startingMenu.style.display="none";
    gameContainer.style.display="block";
    for(var i=0;i<gameBtns.length;i++){
        gameBtns[i].addEventListener("click",clicked);
    }
    restartBtn.addEventListener("click",()=>{
        restartGame();
        
      // restartMenu.style.display="block";
      //  running=false;
      //  opac.style.display="block";
    });
    nextRoundBtn.addEventListener("click",nextRound);
    quitBtn.addEventListener("click",()=>{
        restartGame(1);
       // restartMenu.style.display="block";
    });
    cancelBtn.addEventListener("click",()=>{
        restartMenu.style.display="none";
        if(winBar.style.display=="none"){
            running=true;
        }
        
        if(running){
            opac.style.display="none";
        }
    });
    user1.innerHTML = user1Score;
    user2.innerHTML = user2Score;
    tie.innerHTML = tieScore;
    playerTurn.innerHTML = currPlayer;
    running = true;
}

function clicked(){
    var index = this.getAttribute("cellIndex");
    if(options[index]!=="" || !running){
        return;
    }
    
    this.innerHTML = currPlayer;
    if(currPlayer=="X"){
        this.style.color="#31c3be";
    }
    else{
        this.style.color="#f2b236";
    }
    options[index] = currPlayer;
    checkWinner();
    playerTurn.innerHTML= currPlayer;
}
function nextRound(){
    winBar.style.display ="none";
    opac.style.display="none";
    for(var i=0;i<gameBtns.length;i++){
        gameBtns[i].innerHTML="";
        gameBtns[i].style.background="#1e3640";
        options[i]="";
    }
    running=true;
}

function restartGame(key=0){
    if(key==1){
        restartMenu.style.display="block";
        return;
    }
    startingMenu.style.display="block";
    gameContainer.style.display="none";
    restartMenu.style.display="none";
    winBar.style.display="none";
    opac.style.display="none";
    for(var i=0;i<gameBtns.length;i++){
        gameBtns[i].innerHTML="";
        gameBtns[i].style.background="#1e3640";
        options[i]="";
    }
    user1Score =0;
    user2Score =0;
    tieScore =0;
}

function changePlayer(){
    (currPlayer=="X")? currPlayer="O" : currPlayer="X";
    
}

function checkWinner(){
    
    let roundWon = false;
    
    for(var i=0;i< winningPatterns.length;i++){
        var condition = winningPatterns[i];
        var cellA = options[condition[0]];
        var cellB = options[condition[1]];
        var cellC = options[condition[2]];
        
        if(cellA=="" || cellB =="" || cellC==""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            for(var j=0;j<condition.length;j++){
                var color = (currPlayer=="X")? " #31c3be" : "#f2b236";
                gameBtns[condition[j]].style.background = color;
                gameBtns[condition[j]].style.color= "#1e3640";
            }
            
            roundWon = true;
            if(currPlayer == "X"){
               user1.innerHTML = ++user1Score;
               }
           else{
               user2.innerHTML = ++user2Score;
               }
               
            break;
        }
        
        
    }
    if(!options.includes("") && roundWon==false){
        tie.innerHTML = ++tieScore;
        opac.style.display ="block";
        winBar.style.display="block";
        winDetail.innerHTML = "It's a draw!";
        winDetail.style.color="#fff";
        return;
    }
    if(roundWon){
        opac.style.display ="block";
        winBar.style.display ="block";
        winDetail.innerHTML = `<h1 class="win-player"> ${currPlayer} </h1>  Takes the round!`;
        var color = (currPlayer=="X")? " #31c3be" : "#f2b236";
        winDetail.style.color=color;
        changePlayer();
        running = false;
        return;
    }
    changePlayer();
}