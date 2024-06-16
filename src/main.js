const digits = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const operators = ["+", "-", "%", "/", "*"];

const input = document.querySelector("#input");
const keys = document.querySelector(".keys");
const result = document.querySelector("#result");
const recent = document.querySelector("#recent");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab");
let hasEvaluated = false;

tabBtns.forEach((btn) => {
    btn.addEventListener("click", ({ target: clickedBtn }) => {
        tabBtns.forEach((b) => (b.dataset.active = b === clickedBtn));
        tabs.forEach((tab) => {
            tab.dataset.tabactive =
                tab.dataset.tabname === clickedBtn.dataset.tabname;
        });
    });
});

input.addEventListener("keydown", (e) => e.preventDefault());

document.addEventListener("keydown", (key) => {
    const { key: k } = key;

    if (hasEvaluated && checkDigit(k)) startNewEvaluation();
    if (hasEvaluated && checkOperator(k)) usePreviousResult();

    if (k === "Escape") resetValues();

    if (k === "Enter") {
        evalulate();
    } else if (checkKey(k)) {
        input.value += processIntoKey(k);
    }
});

keys.addEventListener("click", (click) => {
    const value = click.target.dataset.value;

    if (hasEvaluated && checkDigit(value)) startNewEvaluation();
    if (hasEvaluated && checkOperator(value)) usePreviousResult();

    if (value === "=") evalulate();
    else if (value === "AC") resetValues();
    else if (digits.includes(value) || operators.includes(value)) {
        input.value += processIntoKey(value);
    }
});

function evalulate() {
    const answer = eval(input.value.replaceAll("x", "*").replaceAll("÷", "/"));
    result.textContent = answer;
    recent.textContent = answer;
    hasEvaluated = true;
}

function checkDigit(key) {
    return digits.includes(key);
}

function checkOperator(key) {
    return operators.includes(key);
}

function checkKey(key) {
    return digits.includes(key) || operators.includes(key);
}

function processIntoKey(key) {
    if (key === "*") return " x ";
    if (key === "/") return " ÷ ";
    return key;
}

function resetValues() {
    input.value = "";
    result.textContent = "0";
}

function startNewEvaluation() {
    input.value = "";
    hasEvaluated = false;
}

function usePreviousResult() {
    input.value = result.textContent;
    hasEvaluated = false;
}
