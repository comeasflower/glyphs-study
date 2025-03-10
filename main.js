const slider = document.querySelector(".slider");
const text = document.querySelector("#text");
const buttons = document.querySelectorAll(".fontButtonContainer button");
let sentences = {};

// JSON 데이터 불러오기
fetch("sentences.json")
    .then(response => response.json())
    .then(data => sentences = data)
    .then(() => initializeDefaultFont()); // 데이터 로드 후 기본 폰트 설정

function initializeDefaultFont() {
    const defaultButton = buttons[0]; // 첫 번째 버튼을 기본 선택
    changeFont(defaultButton);
    setCursorToEnd(text);
}

// 슬라이더 값이 변경될 때 실행
slider.addEventListener("input", function() {
    const fontSize = slider.value + "px"; // px 단위 추가
    text.style.fontSize = fontSize;
});

function getRandomSentence(fontName) {
    const sentenceList = sentences[fontName] || [];
    return sentenceList.length ? sentenceList[Math.floor(Math.random() * sentenceList.length)] : "No sentences available.";
}

function setCursorToEnd(element) {
    element.focus(); // 요소에 포커스 맞추기
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element); // 요소 전체 선택
    range.collapse(false); // 끝으로 이동
    selection.removeAllRanges();
    selection.addRange(range);
}

function changeFont(button) {
    const fontName = button.innerText; // 버튼에 적힌 텍스트 가져오기
    if (fontName == "표아이") {
        text.style.lineHeight = "70%";
    } else {
        text.style.lineHeight = "120%";
    }
    text.style.fontFamily = fontName; // p 태그의 font-family 변경
    text.innerText = getRandomSentence(fontName); // 랜덤 문장 변경
    // 모든 버튼에서 selected 클래스 제거
    buttons.forEach(btn => btn.classList.remove("selected"));

    // 클릭한 버튼에 selected 클래스 추가
    button.classList.add("selected");
    setCursorToEnd(text);
}

// 버튼 클릭 시 폰트 변경
buttons.forEach(button => {
    button.addEventListener("click", () => changeFont(button));
});