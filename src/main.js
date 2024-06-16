const keys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "%",
    "/",
    "*",
];
const input = document.querySelector("#input");

document.addEventListener("keydown", (key) => {
    const { key: k } = key;

    if (checkKey(k)) {
        input.value += processIntoKey(k);
    }
});

function checkKey(key) {
    return keys.includes(key);
}

function processIntoKey(key) {
    if (key === "*") return " x ";
    if (key === "/") return " ÷ ";
    return key;
}
