const levels = document.querySelectorAll('.lvl');

//Выбир уровеня игры
function chooseLevel() {
	levels.forEach(elem => {
		elem.addEventListener('click', () => {
			for (let i=0; i<levels.length; i++) {
				levels[i].style.listStyle = 'none';
			};
			elem.style.listStyleImage = 'url("img/Rectangle.png")';
		});
	});
}
chooseLevel();

const simpleGame = document.querySelector('.simple-game');
const mediumGame = document.querySelector('.medium-game');
const complexGame = document.querySelector('.complex-game');
const cards = document.querySelectorAll('.cell');
const bugCard = document.createElement('img');
bugCard.src = 'img/victory.png';
const btnStart = document.querySelector('.start');
btnStart.addEventListener('click', startGame);

//Старт игры.
function startGame() {
	const menu = document.getElementById('menu');
	menu.classList.add('displayNone');
	let level;
	let cardTable;
	const arrCards = [];	

	levels.forEach(elem => {
		if (elem.style.listStyle !== 'none') {
			level = elem;
		};
	});

	//Переход к карточному столу и создание массива карт выбранного уровня
	switch (level.textContent) {
		case 'Простой':
			cardTable = simpleGame;
			createArrCards(0, 3);
			break;
		case 'Средний':
			cardTable = mediumGame;
			createArrCards(3, 9);
			break;
		case 'Сложный':
			cardTable = complexGame;
			createArrCards(9, 19);
	};
	cardTable.classList.remove('displayNone');
	function createArrCards (min, max) {
		for (let i=min; i<max; i++) {
			arrCards.push(cards[i]);
		};
	}

	//Замена обратной строны рандомной карты с gameOver на bugCard
	const random = Math.floor(Math.random() * arrCards.length); 
	console.log(random);
	const back = arrCards[random].children[1];
	back.children[0].style.display = 'none';
	back.append(bugCard);
	bugCard.classList.add('card');
}

//При клике - поворот карты, при повторном клике - сброс игры
let current = 0;
let clickedCard;
function flipTheCard () {
	cards.forEach(elem => {
		elem.addEventListener('click', () => {
			current++;
			if (current%2 === 0) {
				simpleGame.classList.add('displayNone');
				mediumGame.classList.add('displayNone');
				complexGame.classList.add('displayNone');
				menu.classList.remove('displayNone');
				for (let i=0; i<levels.length; i++) {
					levels[i].style.listStyle = 'none';
				};
				clickedCard.classList.toggle('rotate');
				clickedCard.children[1].children[0].style.display = 'block';
				current = 0;
			} else {
				elem.classList.toggle('rotate');
				clickedCard = elem;
			};
		});
	});
}
flipTheCard();