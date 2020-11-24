const loginModalButton = document.getElementById("login-modal-button");
const regModalButton = document.getElementById("reg-modal-button");
const loginModal = document.getElementById("login-modal");
const regModal = document.getElementById("registration-modal");
const closeModalButton = document.getElementById("close-button");
const outerModal = document.getElementById("modal");

/* close the modals */
const closeAll = () => {
  loginModal.style.display = "none";
  regModal.style.display = "none";
  outerModal.style.display = "none";
};

/* open the modals */
const openModal = (modalName) => {
  outerModal.style.display = "block";

  /* when one modal is visible the other is hidden */
  const isLogin = modalName == "login";
  loginModal.style.display = isLogin ? "flex" : "none";
  regModal.style.display = isLogin ? "none " : "flex";
};

/* when login button is clicked open login modal */
loginModalButton.addEventListener("click", (event) => {
  event.preventDefault();
  openModal("login");
});

/* when register button is clicked open register modal*/
regModalButton.addEventListener("click", (event) => {
  event.preventDefault();
  openModal("registration");
});

/* when modal exit button is clicked close the modals */
closeModalButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeAll();
});

/* change instructions on screen */
function changeInstruction() {
  let instruction = document.getElementById("messages");
  instruction.innerHTML = instructions[instructionIndex];
  instructionIndex = (instructionIndex + 1) % instructions.length;
}

/* instructions */
let instructions = [
  "Use WASD or the arrow keys to move.",
  "Collect coins to win.",
  "Use the sapce bar to kill other ninjas.",
];

let instructionIndex = 0;

/* loop through instructions when all content has loaded*/
window.onload = function () {
  /* set the first instruction */
  changeInstruction();
  /* set the instruction change speed */
  setInterval(changeInstruction, 2000);
};

/* game title */
/* every letter warapped in a span */
var textWrapped = document.querySelector(".title .letters");
textWrapped.innerHTML = textWrapped.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".title .letter",
    scale: [0.3, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i + 1),
  })
  .add({
    targets: ".title .line",
    scaleX: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 700,
    offset: "-=875",
    delay: (el, i, l) => 80 * (l - i),
  })
  .add({
    targets: ".title",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

/* request login from server */
function gamelogin() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-psw").value;

  let data = {
    email,
    password,
  };

  /* need to insert the correct link to file */
  fetch("/gamelogin", {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((responseJSON) => responseJSON.json())
    .then((body) => {
      console.log(body);
    })
    .catch((error) => {
      alert(error);
    });
}

/* request registration for game from server */
function gameregistration() {
  let email = document.getElementById("registration-email").value;
  let password = document.getElementById("registration-psw").value;

  let data = {
    email,
    password,
  };

  /* need to insert the correct link to file */
  fetch("/gameregistration", {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((responseJSON) => responseJSON.json())
    .then((body) => {
      console.log(body);
    })
    .catch((error) => {
      alert(error);
    });
}

/* player provided id is hidden */
function closeForm(id) {
  document.getElementById(id).style.display = "none";
}

/* player provided id is visiable */
function openForm(id) {
  document.getElementById(id).style.display = "block";
}
