const digits = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const operators = ["+", "-", "%", "/", "*"];

const input = document.querySelector("#input");
const keys = document.querySelector(".keys");
const result = document.querySelector("#result");
let hasEvaluated = false;

input.addEventListener("keydown", (e) => e.preventDefault());

document.addEventListener("keydown", (key) => {
    const { key: k } = key;

    if (hasEvaluated && checkDigit(k)) startNewEvaluation();
    if (hasEvaluated && checkOperator(k)) usePreviousResult();

    if (k === "Escape") resetValues();

    if (k === "Enter") {
        result.textContent = eval(
            input.value.replaceAll("x", "*").replaceAll("÷", "/")
        );
        hasEvaluated = true;
    } else if (checkKey(k)) {
        input.value += processIntoKey(k);
    }
});

keys.addEventListener("click", (click) => {
    const value = click.target.dataset.value;

    if (hasEvaluated && checkDigit(value)) startNewEvaluation();
    if (hasEvaluated && checkOperator(value)) usePreviousResult();

    if (digits.includes(value) || operators.includes(value)) {
        input.value += processIntoKey(value);
    }
});

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
