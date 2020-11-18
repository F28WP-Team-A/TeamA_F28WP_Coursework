const loginModalButton = document.getElementById("login-modal-button");
const regModalButton = document.getElementById("reg-modal-button");
const loginModal = document.getElementById("login-modal");
const regModal = document.getElementById("registration-modal");
const closeModalButton = document.getElementById("close-button");
const outerModal = document.getElementById("modal");

const closeAll = () => {
  loginModal.style.display = "none";
  regModal.style.display = "none";
  outerModal.style.display = "none";
};

const openModal = (modalName) => {
  outerModal.style.display = "block";

  const isLogin = modalName == "login";
  loginModal.style.display = isLogin ? "flex" : "none";
  regModal.style.display = isLogin ? "none " : "flex";
};

loginModalButton.addEventListener("click", (event) => {
  event.preventDefault();
  openModal("login");
});

regModalButton.addEventListener("click", (event) => {
  event.preventDefault();
  openModal("registration");
});

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

/* loop through instructions*/
window.onload = function () {
  changeInstruction();
  setInterval(changeInstruction, 2000);
};
