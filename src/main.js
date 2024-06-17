const digits = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const operators = ["+", "-", "%", "/", "*"];

const input = document.querySelector("#input");
const keys = document.querySelector(".keys");
const result = document.querySelector("#result");
const recent = document.querySelector("#recent");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab");
let hasEvaluated = false;
const records = [];

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
    } else if (value === "AC") resetValues();
    else if (digits.includes(value) || operators.includes(value)) {
        input.textContent += value;
        if (digits.includes(value)) evalulate(false);
    }
});

function evalulate(submit = true) {
    try {
        const answer = +eval(input.textContent).toFixed(10);
        result.style.opacity = 0.5;
        result.textContent = answer;

        if (submit) {
            saveToLocalStorage(
                input.textContent,
                answer,
                new Date().toLocaleDateString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
            );
            createAndAppendRecords();

            const holder = document.querySelector("#answer-animator");
            recent.textContent = answer;
            holder.textContent = answer;
            holder.classList.add("animate-in");
            result.style.opacity = 0;

            input.textContent = "";
            setTimeout(() => {
                input.textContent += answer;
                holder.textContent = "";
                holder.style.top = "45%";
                holder.classList.remove("animate-in");

                const selectedText = window.getSelection();
                const selectedRange = document.createRange();

                selectedRange.setStart(input, 1);
                selectedRange.collapse(true);
                selectedText.removeAllRanges();
                selectedText.addRange(selectedRange);
                input.focus();
            }, 200);
        }
        hasEvaluated = submit;
    } catch {}
}

function createHistoryRecord(statement, answer, at) {
    const div = document.createElement("div");
    div.setAttribute(
        "class",
        "flex justify-between p-5 bg-slate-900 rounded-sm"
    );

    div.innerHTML = `
        <h2
            class="font-mono text-2xl space-y-2 max-w-[60%] overflow-scroll text-wrap"
        >
            <p>${statement}</p>
            <p class="text-blue-500">=${answer}</p>
        </h2>
        <h4 class="text-blue-300/50">
            ${at}
        </h4>
    `;
    document.querySelector("#history").appendChild(div);
}

function saveToLocalStorage(statement, answer, at) {
    records.unshift({
        statement,
        answer,
        at,
    });

    localStorage.setItem("calculator_RECORDS", JSON.stringify(records));
}

function createAndAppendRecords() {
    const his = document.querySelector("#history");
    his.innerHTML = "<h1>Recent acitivity</h1>";
    for (const { statement, answer, at } of records) {
        createHistoryRecord(statement, answer, at);
    }
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
    input.textContent = recent.textContent;
    hasEvaluated = false;
}

function readLocalStorage() {
    const recs = localStorage.getItem("calculator_RECORDS");
    if (recs) records.push(...JSON.parse(recs));

    createAndAppendRecords();
}

async function thing(answer = 100) {
    for (let i = 0; i < answer; i++) {
        await new Promise((res) => setTimeout(res, 1));
        input.textContent = i;
    }
}

// thing();

readLocalStorage();
