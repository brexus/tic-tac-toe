// empty - 'empty' (small char)
// x - 'x' (small char)
// o - 'o' (small char)

// 0 1 2
// 3 4 5
// 6 7 8

// Player factory function
const Player = (name, marker) => {
    return {name, marker};
};




const Gameboard = (() => {

    let myBoard = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        myBoard[index] = sign;
    }

    const getField = (index) => {
        return myBoard[index];
    }

    const reset = () => {
        myBoard = ["", "", "", "", "", "", "", "", ""];
    }

    const showMyBoard = () => {
        console.log(myBoard[0], myBoard[1], myBoard[2]);
        console.log(myBoard[3], myBoard[4], myBoard[5]);
        console.log(myBoard[6], myBoard[7], myBoard[8]);

    }

    return {setField, getField, reset, showMyBoard};
})();













const GameController = (() => {
    const PlayerX = Player("Player X", "x");
    const PlayerO = Player("Player O", "o");
    let scorePlayerX = 0;
    let scorePlayerO = 0;
    let scoreTies = 0;

    let round = 0;
    let isOver = false;
    let occupiedFields = 0;
    let whoWin = "";

    const getScorePlayerX = () => scorePlayerX;
    const getScorePlayerO = () => scorePlayerO;
    const getScoreTies = () => scoreTies;


    const winning_combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const getCurrentSign = () => {
        if(round % 2 === 1) return "x";
        return "o";
    }

    const checkWin = () => {
        
        for (let i = 0; i < winning_combos.length; i++) {
            let [a, b, c] = winning_combos[i];

            if ((Gameboard.getField(a) !== "") && (Gameboard.getField(a) === Gameboard.getField(b)) && (Gameboard.getField(b) === Gameboard.getField(c))) {
                // isOver = true;
                // whoWin = Gameboard.getField(a);
                return true;
            }
        }
        return false;
    }

    const playRound = (index) => {

        round++;
        sign = getCurrentSign();
       
        if(!checkWin() && (occupiedFields <= 9)) {
            // PUSTE POLE
            if (Gameboard.getField(index) === "") {
                Gameboard.setField(index, sign);
                displayController.updateDashboard();
                occupiedFields++;
            }

            // REMIS
            if(occupiedFields == 9) {
                scoreTies++;
                resetAfterWin();
                
                displayController.updateScoreboard();
                displayController.winCommunicate("ties", null);

            // WIN
            } else if (checkWin()) {
                if(sign === "x") {
                    scorePlayerX++;
                    displayController.winCommunicate("x", null);

                } else if(sign === "o") {
                    scorePlayerO++;
                    displayController.winCommunicate("o", null);
                }
                displayController.updateScoreboard();
                resetAfterWin();
                
            } else {
                displayController.winCommunicate(null, sign);
            }
            
        }
    };

    const resetAfterWin = () => {
        round = 0;
        occupiedFields = 0;
        Gameboard.reset();
        displayController.updateDashboard();
    };

    const resetGame = () => {
        resetAfterWin();
        displayController.updateScoreboard();
        scorePlayerX = 0;
        scorePlayerO = 0;
        scoreTies = 0;
    };
    
    return {playRound, getScorePlayerX, getScorePlayerO, getScoreTies, resetGame};
})();









const displayController = (() => {
    const dashboardItems = document.querySelectorAll('[data-dashboard]');
    
    for (let i = 0; i < dashboardItems.length; i++) {
        dashboardItems[i].addEventListener('click', () => {
            GameController.playRound(i);
        });
        
    }

    const updateDashboard = () => {
        for (let i = 0; i < dashboardItems.length; i++) {
            dashboardItems[i].innerHTML = Gameboard.getField(i);
        }
    }

    const updateScoreboard = () => {
        const scorePlayerX = document.getElementById("player-x-score");
        const scorePlayerO = document.getElementById("player-o-score");
        const scoreTies = document.getElementById("ties-score");

        scorePlayerX.innerText = GameController.getScorePlayerX();
        scorePlayerO.innerText = GameController.getScorePlayerO();
        scoreTies.innerText = GameController.getScoreTies();
    }

    const resetBtn = document.getElementById("restart");
    resetBtn.addEventListener('click', () => {
        GameController.resetGame();
    });

    
    const winCommunicate = (winner, sign) => {
        const whoseGameTurn = document.getElementById("whose-game-turn");
        if (winner === "x") {
            whoseGameTurn.innerText = "X WIN! X TURN";
        } else if (winner === "o") {
            whoseGameTurn.innerText = "O WIN! X TURN";
        } else if (winner === 'ties') whoseGameTurn.innerText = "TIES! X TURN";
        else if (sign === "x") whoseGameTurn.innerText = "O TURN";
        else if (sign === "o") whoseGameTurn.innerText = "X TURN";
        
    };

    

    return {updateDashboard, updateScoreboard, winCommunicate};
})();



// GameController.playGame();

// displayController.play();
