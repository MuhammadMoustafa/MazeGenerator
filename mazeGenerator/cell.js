class Cell {

    static cellsPerRow = 20;
    static cellsPerCol = 20;
    static cellWidth = undefined;
    static cellHeight = undefined;
    static isGoalReached = false;
    static grid = [];

    constructor(rowIndex, colIndex) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.index = Cell.getIndex(rowIndex, colIndex);
        this.boundaries = {
            top: true,
            right: true,
            bottom: true,
            left: true
        };

        this.isVisted = false;
        this.isCurrent = false;
    }

    static setCellWidth(width) {
        Cell.cellWidth = floor(width / Cell.cellsPerRow);
    }
    static setCellHeigth(height) {
        Cell.cellHeight = floor(height / Cell.cellsPerCol);
    }


    isNotVisited(index) {
        return !Cell.grid[index].isVisted;
    }

    static getIndex(x, y) {
        //console.log("I'm in this shit!!!!!!");
        if ((x === Cell.cellsPerRow) || (x < 0) || (y === Cell.cellsPerCol) || (y < 0)) {
            //console.log("aydgasjf ds");
            return undefined;
        } else {
            //console.log("Valid aho !!");
            //console.log(x, Cell.cellsPerRow, y);
            return (x * Cell.cellsPerRow + y);
        }
    }
    checkNeighbors() {
        let neighbors = [];

        let bottomIndex = Cell.getIndex(this.rowIndex + 1, this.colIndex);
        //console.log("bottom index", bottomIndex);
        if (bottomIndex && this.isNotVisited(bottomIndex)) { // check for bottom boundary
            neighbors.push(Cell.grid[bottomIndex]);
        }

        let topIndex = Cell.getIndex(this.rowIndex - 1, this.colIndex);
        //console.log("top index", topIndex);
        //console.log((this.rowIndex - 1) * Cell.cellsPerRow + this.colIndex);
        if (topIndex && this.isNotVisited(topIndex)) { // check for top boundary
            //console.log(Cell.grid[topIndex]);
            neighbors.push(Cell.grid[topIndex]);
        }

        let rightIndex = Cell.getIndex(this.rowIndex, this.colIndex + 1);
        //console.log("right index", rightIndex);
        if (rightIndex && this.isNotVisited(rightIndex)) { // check for right boundary
            neighbors.push(Cell.grid[rightIndex]);
        }

        let leftIndex = Cell.getIndex(this.rowIndex, this.colIndex - 1);
        //console.log("left index", leftIndex);
        if (leftIndex && this.isNotVisited(leftIndex)) { // check for left boundary
            neighbors.push(Cell.grid[leftIndex]);
        }
        return neighbors;
    }

    show() {
        let startX = this.colIndex * Cell.cellWidth;
        let startY = this.rowIndex * Cell.cellHeight;
        if (this.boundaries.top) { //&& this.isValidBoundary()
            line(startX, startY, startX + Cell.cellWidth, startY)
        }
        if (this.boundaries.bottom) { //&& this.isValidBoundary()
            line(startX, startY + Cell.cellHeight, startX + Cell.cellWidth, startY + Cell.cellHeight)
        }
        if (this.boundaries.left) { //&& this.isValidBoundary()
            line(startX, startY, startX, startY + Cell.cellHeight);
        }
        if (this.boundaries.right) { //&& this.isValidBoundary()
            line(startX + Cell.cellWidth, startY, startX + Cell.cellWidth, startY + Cell.cellHeight)
        }

        if (this.isVisted) {
            noStroke();
            fill(100, 200, 255, 100);
            if (this.isCurrent) {
                fill(255, 255, 255, 100);
            }
            if (Cell.isGoalReached) {
                fill(50, 255, 50, 100);
            }
            rect(startX, startY, Cell.cellWidth, Cell.cellHeight);
            stroke(255, 100);
            strokeWeight(4);
        }
        //
        /*if (this.rowIndex === 5 && this.colIndex === 5) {
            console.log(startX);
            console.log(startY);
            console.log(startX);
            console.log(cellWidth);
        }*/
    }

    removeWall(neighbor) {
        if (neighbor.rowIndex - this.rowIndex === 1) { // bottom neighbor
            this.boundaries.bottom = false;
            neighbor.boundaries.top = false;
        } else if (neighbor.rowIndex - this.rowIndex === -1) { // top neighbor
            this.boundaries.top = false;
            neighbor.boundaries.bottom = false;
        } else if (neighbor.colIndex - this.colIndex === 1) { // right neighbor
            this.boundaries.right = false;
            neighbor.boundaries.left = false;
        } else if (neighbor.colIndex - this.colIndex === -1) { // left neighbor
            this.boundaries.left = false;
            neighbor.boundaries.right = false;
        }
    }
}