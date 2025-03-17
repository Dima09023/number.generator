
function isValidNumber(value) {
    return !isNaN(value) && value >= -999 && value <= 999;
}

let minValue;
do {
    const input = prompt('Минимальное значение числа для игры', '0');
    minValue = parseInt(input);
    if (!isValidNumber(minValue)) {
        alert('Пожалуйста, введите число от -999 до 999');
    }
} while (!isValidNumber(minValue));

let maxValue;
do {
    const input = prompt('Максимальное значение числа для игры', '100');
    maxValue = parseInt(input);
    if (!isValidNumber(maxValue) || maxValue <= minValue) {
        alert('Пожалуйста, введите корректное число от -999 до 999, большее минимального значения');
    }
} while (!isValidNumber(maxValue) || maxValue <= minValue);

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;
let usedQuestions = new Set();

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;

function getRandomQuestion(number) {
    const questions = [
        `Вы загадали число ${number}?`,
        `Может это число ${number}?\n\u{1F914}`,
        `Я думаю, это число ${number}\n\u{1F928}`,
        `Предполагаю, что это ${number}\n\u{1F92F}`
    ];
    
    let availableQuestions = questions.filter(q => !usedQuestions.has(q));
    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        availableQuestions = questions;
    }
    
    const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    usedQuestions.add(question);
    return question;
}

answerField.innerText = getRandomQuestion(answerNumber);

document.getElementById('btnRetry').addEventListener('click', function() {
    window.location.reload();
});

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phrases = [
                `Вы загадали неправильное число!\n\u{1F914}`,
                `Я сдаюсь..\n\u{1F92F}`,
                `Я не знаю \n\u{1F92A}`
            ];
            answerField.innerText = phrases[Math.floor(Math.random() * phrases.length)];
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = getRandomQuestion(answerNumber);
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phrases = [
                `Вы загадали неправильное число!\n\u{1F914}`,
                `Я не знаю..\n\u{1F92F}`,
                `Такого числа не может быть!\n\u{1F928}`
            ];
            answerField.innerText = phrases[Math.floor(Math.random() * phrases.length)];
            gameRun = false;
        } else {
            maxValue = answerNumber;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = getRandomQuestion(answerNumber);
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phrases = [
            `Я всегда угадываю\n\u{1F60E}`,
            `Это было очевидно!\n\u{1F609}`,
            `В точку!\n\u{1F3AF}`
        ];
        answerField.innerText = phrases[Math.floor(Math.random() * phrases.length)];
        gameRun = false;
    }
});