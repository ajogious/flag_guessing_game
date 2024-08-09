// 'use strict';
let flagName = document.querySelector('.flag_image');
let flagNameInput = document.querySelector('.flag_name_input');
const scoreCount = document.querySelector('.score_count');
const timeCount = document.querySelector('.time_count');
const totalFlag = document.querySelector('.total_flag');
const skipGame = document.querySelector('.skip_game');
const newGame = document.querySelector('.new_game');
const imageContainer = document.querySelector('.image');

let score = 0;
let time = 60;

let timer;

scoreCount.textContent = score;
timeCount.textContent = time;

let randCountryFlag;
let randCountryName;

const startTimer = function () {
	timer = setInterval(function () {
		time--;
		timeCount.textContent = time;

		if (time < 1) {
			flagNameInput.disabled = true;
			clearInterval(timer);

			skipGame.disabled = true;

			flagNameInput.value = 'Game Over';
			flagNameInput.style.fontWeight = 'bold';
			flagNameInput.style.color = 'red';
		}
	}, 1000);
};

const getData = function () {
	fetch('https://restcountries.com/v3.1/all')
		.then((response) => response.json())
		.then((data) => {
			const random = Math.trunc(Math.random() * data.length);
			const totalCountry = data.length;
			totalFlag.textContent = totalCountry;
			randCountryFlag = data[random].flags.png;
			randCountryName = data[random].name.common.toLowerCase();
			flagName.src = randCountryFlag;
			console.log(randCountryName);

			startTimer();

			flagNameInput.addEventListener('input', function () {
				const inputValue = flagNameInput.value;
				if (inputValue === randCountryName) {
					score++;
					scoreCount.textContent = score;

					const random = Math.trunc(Math.random() * data.length);
					const totalCountry = data.length;
					totalFlag.textContent = totalCountry;
					randCountryFlag = data[random].flags.png;
					randCountryName = data[random].name.common.toLowerCase();
					flagName.src = randCountryFlag;
					console.log(randCountryName);

					flagNameInput.value = '';

					time += 20;
					if (time < 1) {
						flagNameInput.disabled = true;
						clearInterval(timer);

						skipGame.disabled = true;

						flagNameInput.value = 'Game Over';
						flagNameInput.style.fontWeight = 'bold';
						flagNameInput.style.color = 'red';
					}
				}
			});
		})
		.catch((err) => {
			imageContainer.textContent = err.getMessage;
		});
};

getData();

newGame.addEventListener('click', () => {
	flagNameInput.disabled = false;
	score = 0;
	time = 60;

	scoreCount.textContent = score;
	timeCount.textContent = time;

	clearInterval(timer);

	flagNameInput.value = '';

	flagNameInput.focus();

	getData();

	skipGame.disabled = false;

	flagNameInput.style.color = 'black';
});

skipGame.addEventListener('click', function () {
	if (time) {
		time -= 10;
		timeCount.textContent = time;
		flagNameInput.value = '';

		clearInterval(timer);
		getData();

		if (time < 1) {
			skipGame.disabled = true;
		}
	}
});
