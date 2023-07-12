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

    let round = 1;
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

        sign = getCurrentSign();

       
        if(!checkWin() && (occupiedFields <= 9)) {
            if (Gameboard.getField(index) === "") {
                Gameboard.setField(index, sign);
                displayController.updateDashboard();
                occupiedFields++;
            }
            round++;

            // WIN
            if (checkWin()) { 
                if(sign === "x") {
                    scorePlayerX++;

                } else if(sign === "o") {
                    scorePlayerO++;
                }
                displayController.updateScoreboard();
                resetGame();
                occupiedFields = 0;
                Gameboard.showMyBoard();
            }
        }
    };

    const resetGame = () => {
        round = 1;
        Gameboard.reset();
        displayController.updateDashboard();
    };
    
    return {playRound, getScorePlayerX, getScorePlayerO, getScoreTies};
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

    return {updateDashboard, updateScoreboard};
})();



// GameController.playGame();

// displayController.play();
