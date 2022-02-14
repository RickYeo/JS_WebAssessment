const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

let playGames = true;

class Field {

    constructor(field) {
        
        //Current location of your character
        this._field = field;
        this.y = 0;
        this.x = 0;
    }

    get field() {
        return this._field;
    }

    print() {
        return this.field.map(row =>
            row.join('')
        ).join('\n');
    }

    //User move
    askQuestion() {
        let move = prompt("Which way? (u = Up, d = down, l = left and r = right)");
        switch(move.toLowerCase()) {
            case "u":
                console.log("Move up");
                this.y -= 1;
                break;
            case "d":
                console.log("Move down");
                this.y += 1;
                break;
            case "l":
                console.log("Move left");
                this.x -= 1;
                break;
            case "r":
                console.log("Move right");
                this.x += 1;
                break;
            default:
                break;
        }    
    }

    gameStatus() {
        /*
        Game Status, 
        hole = lose
        hat = win
        */    
        switch (this.field[this.y][this.x]) {
            case hole:
                console.log("Sorry, you fell down a hole!");
                playGames = false;
                break;
            case undefined:
                console.log("Out of bounds - Game End!");
                playGames = false;
                break;
            case hat:
                console.log("Congrats, you found your hat!");
                playGames = false;
                break;
            case fieldCharacter:
                console.log("Continue...");
                this.field[this.y][this.x] = pathCharacter;
                break;
           
        }    
    }

    static generateField(height, width, percentage = 0.2) {

        const fieldHole = (percentage) => {
            if (percentage >= 0 && percentage <= 100) {
              const ranNum = Math.random() * 100;
              if (ranNum < percentage) {
                return hole;
              } else {
                return fieldCharacter;
              }
            } else {
              console.log("Restart the game");
            }
        }

        //return to plainField
        const plainField = () => {
            function makeWidthArray() {
                let widthArray = [];
                for (let i=0; i < width; i++) {
                    widthArray.push(fieldHole(percentage));
                }
                return widthArray;
            }
            let plainField = [];
            for (let i=0; i < height; i++) {
                plainField.push(makeWidthArray());
            }
            return plainField;
        }

        const readyGame = plainField();

        //Adding hat on plainField
        do {
            readyGame[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        }   while (readyGame[0][0] == hat);
        
        //Set character position as [0][0]
        readyGame[0][0] = pathCharacter;

        return readyGame;
    }

}

//Generate new field into myField
const myField = new Field(Field.generateField(row, col, 20));

function runGame() {
    while(playGames) {
        console.log(myField.print());
        myField.askQuestion();
        myField.gameStatus();
    }
    console.log("Game Over!");
}

runGame();