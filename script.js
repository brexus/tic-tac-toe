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



const GameController = (() => {
    const Player1 = Player("Player X", "x");
    const Player2 = Player("Player O", "o");
    let round = 1;
    let isOver = false;
    let occupiedFields = 0;
    let whoWin = "";

    const winning_combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const getCurrentSign = () => {
        if(round % 2 === 1) return "x";
        return "o";
    }

    const checkWin = () => {
        for (let i = 0; i < winning_combos; i++) {
            const [a, b, c] = winning_combos[i];

            if ((Gameboard.getField(a) === Gameboard.getField(b)) && (Gameboard.getField(b) === Gameboard.getField(c))) {
                isOver = true;
                whoWin = Gameboard.getField(a);
                return true;
            }
        }
        return false;
    }

    const playRound = (index) => {
        sign = getCurrentSign();

        if (Gameboard.getField(index) === "") {
            Gameboard.setField(index, sign);
            occupiedFields++;
        } else {

        }

        round++;
    };
    
    let counter = 0;

    const playGame = () => {
        occupiedFields = 0;

        while(!checkWin() && ( occupiedFields < 9 )) {
            console.log(counter);
            playRound(prompt("Daj index:"));
        }
        // if (checkWin())

        Gameboard.showMyBoard();
    }

    return {playRound, playGame};
})();





const displayController = (() => {
    const dashboardItems = document.querySelectorAll('[data-dashboard]');
    

})();


const Gameboard = (() => {

    let myBoard = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        myBoard[index] = sign;
    }

    const getField = (index) => {
        return myBoard[index];
    }

    const reset = () => {
        myBoard.forEach(item => {
            item = "";
        });
    }

    const showMyBoard = () => {
        console.log(myBoard[0], myBoard[1], myBoard[2]);
        console.log(myBoard[3], myBoard[4], myBoard[5]);
        console.log(myBoard[6], myBoard[7], myBoard[8]);

    }

    return {setField, getField, reset, showMyBoard};
})();




// GameController.playGame();

