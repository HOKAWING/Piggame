var scopes,roundScore,activePlayer,gameplaying;

init();

document.querySelector(".btn-roll").addEventListener("click",function () {
    if(!gameplaying){
        return;
    }
    //1. Random the number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    //3. Updata the round scope if the rolled number not a 1.
    if (dice1 !== 1 && dice2 !== 1) {
        // add the scope
        roundScore += dice1 + dice2;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        //innerHTML能编辑HTML，textContent只能编辑纯文本。
        // document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice +'</em>';
    }else{
        nextPlay();
    }
})

document.querySelector(".btn-hold").addEventListener("click",function () {
    if(!gameplaying){
        return;
    }

    // add current scope to global score
    scopes[activePlayer] += roundScore;

    // update the UI
    document.querySelector("#score-" + activePlayer).textContent = scopes[activePlayer];

    //获取获胜的分数
    var input = document.querySelector(".final-score").value;
    var winningScore;
    //undefined, 0 , null , ""  are coerced to false, anything else is coerced to ture.
    if(input){
        winningScore = input;
    }else{
        winningScore = 100;
    }

    //check if player won the game
    if(scopes[activePlayer] >=winningScore){
        //修改胜利的样式
        document.querySelector("#name-" + activePlayer).textContent = 'Winner!';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
        document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
        gameplaying = false;
    }else{
        nextPlay();
    }
});

document.querySelector(".btn-new").addEventListener("click",init);

function nextPlay(){    //this function doesn't receive any parameters and also doesn't return any result.
    // 切换活跃状态
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //分数归零
    roundScore = 0;
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scopes = [0,0];
    roundScore = 0; //一方累计的分
    activePlayer = 0;   //0 will be the first player, 1 will be the second player.
    gameplaying = true;

    //隐藏骰子，<img src="dice-5.png" style="display: none;">
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById("score-0").textContent = '0';//getElementById查找key不用加#号，而querySelector查找key前要加#号，查找class前要加.号。
    document.getElementById("score-1").textContent = '0';//getElementById method is a bit faster than querySelector.
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

}