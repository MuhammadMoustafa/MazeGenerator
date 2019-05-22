let current = undefined;
let next = undefined;
let index = undefined;
let stack = [];
let isMazeGenerated = false;


function setup() {
	const width = 3 * windowWidth / 4;
	const height = 3 * windowHeight / 4;
	createCanvas(width, height);
	Cell.setCellWidth(width);
	Cell.setCellHeigth(height);

	for (rowIndex = 0; rowIndex < Cell.cellsPerCol; rowIndex++) {
		for (colIndex = 0; colIndex < Cell.cellsPerRow; colIndex++)
			Cell.grid.push(new Cell(rowIndex, colIndex));
	}
	//Cell.grid.forEach(item => item.show());
	//Cell.grid.forEach(item => item.checkNeighbours());
	//frameRate(1000);
	current = Cell.grid[0];
	current.isCurrent = true;
	stack.push(current);
}

function draw() {
	background(0);

	if (!isMazeGenerated) {
		generateMaze();
	} else {
		frameRate(8);
		solveMaze();
	}
	/*
	{
		
		let index = undefined;
		if (keyIsDown(DOWN_ARROW) && !current.boundaries.bottom) {
			//console.log("Down");
			index = Cell.getIndex(current.rowIndex + 1, current.colIndex);
		} else if (keyIsDown(UP_ARROW) && !current.boundaries.top) {
			//console.log("UP");
			index = Cell.getIndex(current.rowIndex - 1, current.colIndex);
		} else if (keyIsDown(RIGHT_ARROW) && !current.boundaries.right) {
			//console.log("Right");
			index = Cell.getIndex(current.rowIndex, current.colIndex + 1);
		} else if (keyIsDown(LEFT_ARROW) && !current.boundaries.left) {
			//console.log("left");
			index = Cell.getIndex(current.rowIndex, current.colIndex - 1);
		}
		if (!isNaN(index)) {
			current.isCurrent = false;
			current = Cell.grid[index];
			current.isCurrent = true;
			//console.log(current);
		}
		Cell.grid.forEach(item => item.show());
		if (current.index === Cell.getIndex(Cell.cellsPerRow - 1, Cell.cellsPerCol - 1)) {
			Cell.isGoalReached = true;
			current.show();
			console.log("Bravo!!");
			noLoop();
		}
	}
	*/

}


function generateMaze() {
	current.isVisted = true;
	current.isCurrent = true;
	Cell.grid.forEach(item => item.show());
	if (stack.length > 0) {
		let neighbors = current.checkNeighbors();
		if (neighbors.length > 0) {
			index = floor(random(0, neighbors.length));
			next = neighbors[index];
			current.removeWall(next);
			current.isCurrent = false;
			current = next;
			stack.push(current);
		} else {
			current.isCurrent = false;
			current = stack.pop();
		}
	} else {
		console.log("Done !!");
		isMazeGenerated = true;
	}
}

function solveMaze() {
	Cell.grid.forEach(item => item.show());
	let index = undefined;
	if (keyIsDown(DOWN_ARROW) && !current.boundaries.bottom) {
		index = Cell.getIndex(current.rowIndex + 1, current.colIndex);
	} else if (keyIsDown(UP_ARROW) && !current.boundaries.top) {
		index = Cell.getIndex(current.rowIndex - 1, current.colIndex);
	} else if (keyIsDown(RIGHT_ARROW) && !current.boundaries.right) {
		index = Cell.getIndex(current.rowIndex, current.colIndex + 1);
	} else if (keyIsDown(LEFT_ARROW) && !current.boundaries.left) {
		index = Cell.getIndex(current.rowIndex, current.colIndex - 1);
	}
	if (!isNaN(index)) {
		current.isCurrent = false;
		current.show();
		current = Cell.grid[index];
		current.isCurrent = true;
		current.show();
	}
	//Cell.grid.forEach(item => item.show());
	if (current.index === Cell.getIndex(Cell.cellsPerRow - 1, Cell.cellsPerCol - 1)) {
		Cell.isGoalReached = true;
		current.show();
		console.log("Bravo!!");
		noLoop();
	}
}