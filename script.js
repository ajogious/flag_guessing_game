'use strict';

// here are the DOM elements
let flagName = document.querySelector('.flag_image');
let flagNameInput = document.querySelector('.flag_name_input');
const scoreCount = document.querySelector('.score_count');
const timeCount = document.querySelector('.time_count');
const totalFlag = document.querySelector('.total_flag');
const skipGame = document.querySelector('.skip_game');
const newGame = document.querySelector('.new_game');
const imageContainer = document.querySelector('.image');

// global variables
let score = 0;
let time = 60;
let timer;
let randCountryFlag;
let randCountryName;

// init
const initializeGame = function () {
	score = 0;
	time = 60;
	scoreCount.textContent = score;
	timeCount.textContent = time;
	flagNameInput.value = '';
	flagNameInput.disabled = false;
	flagNameInput.style.color = 'black';
	skipGame.disabled = false;
	clearInterval(timer);
	getRandomFlag();
	startTimer();
};

// time function
const startTimer = function () {
	clearInterval(timer);
	timer = setInterval(function () {
		time--;
		timeCount.textContent = time;

		if (time < 1) {
			endGame();
		}
	}, 1000);
};

// fetching data
const getRandomFlag = function () {
	fetch('https://restcountries.com/v3.1/all')
		.then((response) => response.json())
		.then((data) => {
			const random = Math.trunc(Math.random() * data.length);
			totalFlag.textContent = data.length;
			randCountryFlag = data[random].flags.png;
			randCountryName = data[random].name.common.toLowerCase();
			flagName.src = randCountryFlag;
			console.log(randCountryName);
		})
		.catch((err) => {
			imageContainer.textContent = `Error: ${err.message}`;
		});
};

// user input handling
const handleUserInput = function () {
	const inputValue = flagNameInput.value.trim().toLowerCase();
	if (inputValue === randCountryName) {
		score++;
		scoreCount.textContent = score;
		time += 20;
		getRandomFlag();
		flagNameInput.value = '';
		if (time < 1) {
			endGame();
		}
	}
};

// skiping flag
const skipFlag = function () {
	if (time > 0) {
		time -= 10;
		timeCount.textContent = time;
		flagNameInput.value = '';
		getRandomFlag();
		flagNameInput.focus();
		if (time < 1) {
			endGame();
		}
	}
};

// when game over
const endGame = function () {
	flagNameInput.disabled = true;
	clearInterval(timer);
	skipGame.disabled = true;
	flagNameInput.value = 'Game Over';
	flagNameInput.style.fontWeight = 'bold';
	flagNameInput.style.color = 'red';
};

// event listener
flagNameInput.addEventListener('input', handleUserInput);
newGame.addEventListener('click', initializeGame);
skipGame.addEventListener('click', skipFlag);

// starting game initially
initializeGame();
