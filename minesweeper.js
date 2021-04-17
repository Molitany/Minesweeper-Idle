document.addEventListener("DOMContentLoaded", () => main())
let GameOver = false;

function main() {
    let game = new MineSweeperGame(5, 5, 5);
    return "smile"
}

class MineSweeperGame{
    constructor(numBombs, height, width){
        this.cells = [];
        this.numBombs = numBombs;
        this.height = height;
        this.width = width;
        
        for (let i = 0; i < height; i++){
            this.cells.push([])
            for (let j = 0; j < width; j++)
            this.cells[i].push("0");
        }
        this.newGame();
    }
    
    newGame(){
        let minefieldDOM = document.querySelector("#minefield");
        for (let i = 0; i < this.numBombs; i++){
            let x, y;
            do {
                x = Math.floor(Math.random()*this.height);
                y = Math.floor(Math.random()*this.width);
            } while (this.cells[x][y] == 'x');
            
            this.cells[x][y] = "bomb"
            for (let j = -1; j <= 1; j++){
                for (let k = -1; k <= 1; k++){
                    if (this.cells[x+j] !== undefined && this.cells[x+j][y+k] !== undefined)
                    if (this.cells[x+j][y+k] !== "bomb" || (j !== 0 && k != 0))
                    this.cells[x+j][y+k] = isNaN(parseInt(this.cells[x+j][y+k])) ? "bomb" : parseInt(this.cells[x+j][y+k]) + 1; 
                }
            }
        }
        
        for (let i = 0; i < this.width; i++){
            let row = document.createElement('div');
            row.className = 'row';

            for (let j = 0; j < this.height; j++)
                row.innerHTML += '<img src="imgs/' + this.cells[i][j] + '.png" class="Cell">';
            
            minefieldDOM.appendChild(row)
        }
    }
    
    addCell(bomb){
        let cell = new MineSweeperCell(bomb);
        this.cells.push(cell)
        return cell;
    }
    
    get allCells(){
        return this.cells;
    }
}


class MineSweeperCell{
    constructor(bomb){
        this.bomb = bomb;
    }
    
    Reveal(){
        if (bomb)
        GameOver = true;
    }
}