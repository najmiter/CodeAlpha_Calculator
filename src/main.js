const digits = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const operators = ["+", "-", "%", "/", "*"];

const input = document.querySelector("#input");
const keys = document.querySelector(".keys");
const result = document.querySelector("#result");
const recent = document.querySelector("#recent");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab");
let hasEvaluated = false;

tabBtns.forEach((btn) =>
    btn.addEventListener("click", ({ target: clickedBtn }) => {
        tabBtns.forEach((b) => (b.dataset.active = b === clickedBtn));
        tabs.forEach(
            (tab) =>
                (tab.dataset.tabactive =
                    tab.dataset.tabname === clickedBtn.dataset.tabname)
        );
    })
);

input.addEventListener("input", () => {
    input.textContent = input.textContent.replaceAll(/\n|\t/g, "");
    evalulate(false);
});

document.addEventListener("keydown", (key) => {
    const { key: k } = key;
    if (digits.includes(k) || operators.includes(k)) input.focus();

    if (hasEvaluated && checkDigit(k)) startNewEvaluation();
    if (hasEvaluated && checkOperator(k)) usePreviousResult();

    if (k === "Escape") resetValues();

    if (k === "Enter") {
        evalulate();
        input.textContent = "";
    }
});

keys.addEventListener("click", (click) => {
    const value = click.target.dataset.value;

    if (!value) return;

    if (hasEvaluated && checkDigit(value)) startNewEvaluation();
    if (hasEvaluated && checkOperator(value)) usePreviousResult();

    if (value === "=") {
        evalulate();
        input.textContent = "";
    } else if (value === "AC") resetValues();
    else if (digits.includes(value) || operators.includes(value)) {
        input.textContent += value;
        if (digits.includes(value)) evalulate(false);
    }
});

function evalulate(submit = true) {
    try {
        const answer = +eval(
            input.textContent.replaceAll("x", "*").replaceAll("÷", "/")
        ).toFixed(10);
        result.textContent = answer;
        if (submit) recent.textContent = answer;
        hasEvaluated = submit;
    } catch {}
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

function resetValues() {
    input.textContent = "";
    result.textContent = "0";
}

function startNewEvaluation() {
    input.textContent = "";
    hasEvaluated = false;
}

function usePreviousResult() {
    input.textContent = result.textContent;
    hasEvaluated = false;
}

async function thing(answer = 100) {
    for (let i = 0; i < answer; i++) {
        await new Promise((res) => setTimeout(res, 1));
        input.textContent = i;
    }
}

// thing();
