const beginerBtn = document.getElementById('beginer');
const intermediateBtn = document.getElementById('intermediate');
const masterBtn = document.getElementById('master');
const tdArr = document.getElementsByTagName('td');
const COLOR = ['red', 'skyblue', 'olive', 'green', 'blue', 'purple', 'brown', 'black'];
let row;
let col;

// beginerBtn.addEventListener('click', null);
// intermediateBtn.addEventListener('click', null);
// masterBtn.addEventListener('click', null);
window.addEventListener('contextmenu', function (e) {
	e.preventDefault();
});

function setGame(roww, coll, mineNumm) {
	const gameSet = document.querySelector('.gameSet');
	gameSet.style.display = 'none';

	row = roww;
	col = coll;
	mineNum = mineNumm;
	const mineArr = setMineNumArr(mineNum, row * col);

	makeBoard(row, col);
	putMineInBoard(mineArr);

	// 타일에 이벤트 넣기

	for (let i = 0; i < tdArr.length; i++) {
		tileEvent(i, getAroundArr(i));
	}
}

function level_beginer() {
	setGame(9, 9, 10);
}

function level_intermediate() {
	setGame(16, 16, 40);
}

function level_master() {
	setGame(30, 16, 99);
}

function getAroundArr(num) {
	if (num === 0) return [1, row, row + 1];
	if (num === row - 1) return [row - 2, 2 * row - 2, 2 * row - 1];
	if (num === row * (col - 1)) return [row * (col - 2), row * (col - 2) + 1, row * (col - 1) + 1];
	if (num === row * col - 1) return [row * (col - 1) - 2, row * (col - 1) - 1, row * col - 2];
	if (0 < num && num < row - 1) return [num - 1, num + 1, num + row - 1, num + row, num + row + 1];
	if (row * (col - 1) < num && num < row * col - 1)
		return [num - row - 1, num - row, num - row + 1, num - 1, num + 1];
	if (num % row === 0) return [num - row, num - row + 1, num + 1, num + row, num + row + 1];
	if (num % row === row - 1) return [num - row - 1, num - row, num - 1, num + row - 1, num + row];
	return [num - row - 1, num - row, num - row + 1, num - 1, num + 1, num + row - 1, num + row, num + row + 1];
}

// board 만들기
function makeBoard(rowNum, colNum) {
	let tableEle = '<table>';

	for (let i = 0; i < colNum; i++) {
		tableEle += '<tr>';
		for (let j = 0; j < rowNum; j++) {
			tableEle += '<td></td>';
		}
		tableEle += '</tr>';
	}
	tableEle += '</table>';
	document.getElementById('gameBoard').innerHTML = tableEle;
}

// 지뢰 위치 번호 뽑기
function setMineNumArr(numLimit, numRange) {
	let mineArr = [];
	for (let i = 0; i < numLimit; i++) {
		let randomNum = Math.floor(Math.random() * numRange);
		if (mineArr.indexOf(randomNum) === -1) {
			mineArr.push(randomNum);
		} else {
			i--;
		}
	}
	return mineArr;
}

// board에 "mine" class로 삽입하기
function putMineInBoard(mine) {
	for (let i = 0; i < tdArr.length; i++) {
		if (mine.indexOf(i) !== -1) {
			tdArr[i].classList.add('mine');
		}
	}
}

function clickTile(targetNum, aroundArr) {
	if (
		tdArr[targetNum].className !== 'flag' &&
		tdArr[targetNum].className !== 'qmark' &&
		tdArr[targetNum].className !== 'mine flag' &&
		tdArr[targetNum].className !== 'mine qmark'
	) {
		let count = 0;
		for (let j = 0; j < aroundArr.length; j++) {
			if (tdArr[aroundArr[j]].classList.contains('mine')) count++;
		}
		if (tdArr[targetNum].className === 'mine') {
			alert('GAME OVER!!!');
		} else if (count === 0) {
			tdArr[targetNum].style.backgroundColor = 'rgb(225, 250, 173)';
			for (let k = 0; k < aroundArr.length; k++) {
				if (tdArr[aroundArr[k]].dataset.isOpen !== 'true') {
					tdArr[aroundArr[k]].dataset.isOpen = 'true';
					clickTile(aroundArr[k], getAroundArr(aroundArr[k]));
				}
			}
		} else if (count > 0) {
			tdArr[targetNum].dataset.isOpen = 'true';
			tdArr[targetNum].style.color = COLOR[count - 1];
			tdArr[targetNum].innerHTML = count;
		}
	}
}

// 타일 클릭 시 실행할 함수 추가
function tileEvent(targetNum, aroundArr) {
	tdArr[targetNum].addEventListener('click', function () {
		clickTile(targetNum, aroundArr);
	});

	tdArr[targetNum].addEventListener('auxclick', function () {
		if (tdArr[targetNum].dataset.isOpen === 'true') return;
		else if (tdArr[targetNum].className === 'flag' || tdArr[targetNum].className === 'mine flag') {
			tdArr[targetNum].classList.remove('flag');
			tdArr[targetNum].innerHTML = '';
			tdArr[targetNum].style.backgroundColor = '';
		} else {
			tdArr[targetNum].classList.add('flag');
			tdArr[targetNum].innerHTML = '🚩';
			tdArr[targetNum].style.backgroundColor = 'rgb(255, 255, 160)';
		}
	});
}
