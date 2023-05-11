const wordElement = document.getElementById('word');
const wordImage = document.getElementById('word-image');
const inputElement = document.getElementById('input');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

const wordsWithImages = [
    {
      word: 'T47_松崎竜雅_サウナが大好き',
      imageUrls: [
        'img/IMG_7881.JPG',
        'img/IMG_7881.JPG',
        'img/IMG_7881.JPG',
        'img/IMG_7881.JPG',
        'img/IMG_7881.JPG',
        'img/IMG_7881.JPG',
      ]
    },
    {
        word: 'T47_まつざきりゅうが_お酒が大好き',
        imageUrls: [
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
        ]
    },
    {
        word: 'T47_松崎竜雅です。',
        imageUrls: [
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
          'img/IMG_7881.JPG',
        ]
    }
    // 他の単語と画像URLの配列を追加...
  ];
  
let currentWordWithImage;
let currentWord;
  
let score = 0;
let timeRemaining = 120; // ゲームの制限時間 (秒)
let timerInterval;

function setNewWord() {
    const randomIndex = Math.floor(Math.random() * wordsWithImages.length);
    currentWord = wordsWithImages[randomIndex].word;
    const currentWordObj = wordsWithImages.find((obj) => obj.word === currentWord);
    word.textContent = currentWord;
    input.value = '';
    displayImages(currentWordObj)
}

function displayImages(currentWordObj) {
    const imageSlider = document.querySelector(".image-slider");
    let imageCount = 0;
    
    currentWordObj.imageUrls.forEach((imageUrl) => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = currentWordObj.word;
        imgElement.classList.add("word-image-placeholder");
        imgElement.style.maxWidth = "300px";
        imgElement.style.maxHeight = "300px";

        if (imageCount === 3) {
            return;
        }
        
        imageSlider.appendChild(imgElement);
        imageCount++;
    });
  }

function startTimer() {
  timerElement.textContent = timeRemaining;
  timerInterval = setInterval(() => {
    timeRemaining--;
    timerElement.textContent = timeRemaining;
    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  alert('ゲーム終了! あなたのスコア: ' + score);
  inputElement.disabled = false;
  startButton.disabled = false;
  resetButton.disabled = false;
  resetGame()
}

function resetGame() {
  score = 0;
  timeRemaining = 30;
  wordElement.textContent = '';
  inputElement.value = '';
  clearImages();
  scoreElement.textContent = '';
  timerElement.textContent = '';
  scoreElement.textContent = 'スコア: 0';
  inputElement.disabled = false;
  startButton.disabled = false;
  resetButton.disabled = true;
}

function clearImages() {
    const imagecontainer = document.querySelector(".image-container");
    const imageSlider = document.querySelector(".image-slider");
    
    imagecontainer.appendChild(imageSlider);
}

inputElement.addEventListener('input', () => {
  if (inputElement.value === currentWord) {
    inputElement.value = '';
    setNewWord();
    score++;
    scoreElement.textContent = 'スコア: ' + score;
    timeRemaining += 1; // 1単語の入力期間 (秒)
  }
});

startButton.addEventListener('click', () => {
  setNewWord();
  startTimer();
  inputElement.disabled = false;
  inputElement.focus();
  startButton.disabled = true;
  resetButton.disabled = false;
  scoreElement.textContent = 'スコア: 0';
});

resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  resetGame();
});


document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  
    if (keyElement) {
      keyElement.classList.add("pressed");
    }
  });
  
document.addEventListener("keyup", (event) => {
    const key = event.key.toUpperCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  
    if (keyElement) {
      keyElement.classList.remove("pressed");
    }
  });
