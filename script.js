const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const buttonsContainer = document.getElementById("buttonsContainer");
const heart = document.querySelector(".heart");
const body = document.body;
const loveMessage = document.getElementById("loveMessage");
const fireworksContainer = document.getElementById("fireworks-container");
const titleText = document.querySelector(".text");

let hasMoved = false;

noButton.addEventListener("mouseover", () => {
  if (!hasMoved) {
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const minX = buttonWidth * 2;
    const maxX = buttonWidth * 2.5;
    const minY = buttonHeight * 1;
    const maxY = buttonHeight * 3;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    let finalX =
      noButton.offsetTop + (Math.random() > 0.5 ? randomX : -randomX);
    let finalY =
      noButton.offsetTop + (Math.random() > 0.5 ? randomY : -randomY);

    noButton.style.position = "absolute";
    noButton.style.left = `${finalX}px`;
    noButton.style.top = `${finalY}px`;

    hasMoved = true;
  }
});

function handleNoClick() {
  noButton.style.display = "none";
  yesButton.classList.add("highlight");
  showSnackbar("¡JAJA, no tienes opción! 😆💕");
}

function handleYesClick() {
  buttonsContainer.style.display = "none"; // Oculta los botones
  showSnackbar(
    "¡Sabía que dirías que sí, porque soy genial! 😎\n...\nNah, ¡Es porque te amooo! 💖"
  );

  heart.classList.add("expand-heart");

  setTimeout(() => {
    body.style.transition = "background 2s ease-in-out";
    body.style.background = "#001f3f";
    heart.style.display = "none";

    titleText.textContent = "¡Eres mi Valentine! 💖";
    // Muestra el mensaje romántico
    loveMessage.classList.remove("hidden");
    loveMessage.classList.add("fade-in");
    loveMessage.style.opacity = 1;

    // Inicia la animación de fuegos artificiales con corazones
    startFireworks();
  }, 3000);
}

function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.innerText = message;
  snackbar.classList.add("show");
  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
}
function startFireworks() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      launchFirework();
    }, i * 500);
  }
}

function launchFirework() {
  const firework = document.createElement("div");
  firework.classList.add("firework-core");
  firework.style.left = `${Math.random() * 80 + 10}vw`;
  firework.style.bottom = "0px";

  fireworksContainer.appendChild(firework);

  setTimeout(() => {
    firework.remove();
    explodeFirework(firework.style.left);
  }, 1000);
}

function explodeFirework(position) {
  const colors = ["#ff4d6d", "#ff9a9e", "#ffd700", "#8a2be2", "#00c3ff"];
  const numParticles = 20;

  for (let i = 0; i < numParticles; i++) {
    setTimeout(() => {
      createHeartFirework(position, colors[i % colors.length]);
    }, i * 100);
  }
}

function createHeartFirework(position, color) {
  const heart = document.createElement("div");
  heart.classList.add("firework-heart");
  heart.style.left = position;
  heart.style.bottom = "50vh";
  heart.style.backgroundColor = color;

  const randomAngle = Math.random() * 360;
  const distance = Math.random() * 100 + 50;
  const finalX = Math.cos(randomAngle) * distance;
  const finalY = Math.sin(randomAngle) * distance;

  heart.style.setProperty("--final-x", `${finalX}px`);
  heart.style.setProperty("--final-y", `${finalY}px`);

  fireworksContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

yesButton.addEventListener("click", handleYesClick);
noButton.addEventListener("click", handleNoClick);
