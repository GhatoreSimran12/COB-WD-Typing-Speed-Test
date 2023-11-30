const typetest = document.querySelector(".type-test p"),
    inpField = document.querySelector(".wrapper .input-field"),
    mistakeText = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    trybtn = document.querySelector("button"),
    timeTag = document.querySelector(".time span b");

let timer,
    maxtime = 30,
    timeleft = maxtime,
    charIndex = mistakes = isTyping = 0;


function randompara() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typetest.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typetest.innerHTML += spanTag;
    });
    typetest.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typetest.addEventListener("click", () => inpField.focus());

}
function initTyping() {
    const characters = typetest.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeleft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            charIndex--;

            characters[charIndex].classList.remove("correct", "incorrect");
        } else {

            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxtime - timeleft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        mistakeText.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;

    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeleft > 0) {
        timeleft--;
        timeTag.innerText = timeleft;
    } else {
        clearInterval(timer)
    }
}
function resetGame() {
    randompara();
    inpField.value = "";
    clearInterval(timer);
    timeleft = maxtime,
        charIndex = mistakes = isTyping = 0;
    mistakeText.innerText = mistakes;
    cpmTag.innerText = 0;
    wpmTag.innerText = 0;
}

randompara();
inpField.addEventListener("input", initTyping);
trybtn.addEventListener("click", resetGame);