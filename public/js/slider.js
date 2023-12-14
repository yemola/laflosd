const designs = Array.from(document.querySelectorAll(".design"));
const designBox = document.querySelector(".designs");
const scrollBtn = document.querySelectorAll(".scroll div");
const ballEl = document.querySelector(".balls");
let timeoutId;

function getRightLeft() {
  const activeSlide = document.querySelector(".design.active");
  const activeIndex = designs.indexOf(activeSlide);
  let right, left;
  if (activeIndex === designs.length - 1) right = designs[0];
  else right = designs[activeIndex + 1];

  if (activeIndex === 0) left = designs[designs.length - 1];
  else {
    left = designs[activeIndex - 1];
  }
  return [right, left];
}

function getPosition() {
  const activeSlide = document.querySelector(".design.active");
  const activeIndex = designs.indexOf(activeSlide);

  const [right, left] = getRightLeft();

  designs.forEach((design, index) => {
    if (index === activeIndex) {
      design.style.transform = "translateX(0)";
    } else if (design === left) {
      design.style.transform = "translateX(-150%)";
    } else if (design === right) {
      design.style.transform = "translateX(150%)";
    } else design.style.transform = "translateX(150%)";
    design.addEventListener("transitionend", () => {
      design.classList.remove("top");
    });
  });
}
getPosition();

scrollBtn.forEach((scroll) => {
  scroll.addEventListener("click", (e) => {
    if (scroll.classList.contains("right")) {
      getRightSlide();
    } else if (scroll.classList.contains("left")) {
      getLeftSlide();
    }
  });
});

function getRightSlide() {
  clearTimeout(timeoutId);
  const current = document.querySelector(".design.active");
  const [right, left] = getRightLeft();

  if (current.classList.contains("top")) {
    return;
  }
  current.classList.add("top");
  right.classList.add("top");
  current.classList.remove("active");
  current.style.transform = "translate(-150%)";
  right.classList.add("active");
  right.style.transform = "translate(0)";
  getPosition();
  getActiveBall();
  autoLoop();
}
function getLeftSlide() {
  const current = document.querySelector(".design.active");
  const [right, left] = getRightLeft();

  if (current.classList.contains("top")) {
    return;
  }
  current.classList.add("top");
  left.classList.add("top");
  current.classList.remove("active");
  current.style.transform = "translateX(150%)";
  left.classList.add("active");
  left.style.transform = "translateX(0)";
  getPosition();
  getActiveBall();
}

//Dot Functionality
designs.forEach((design) => {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  ballEl.appendChild(ball);
});

function getActiveBall() {
  const allBalls = document.querySelectorAll(".balls .ball");
  const activeSlide = document.querySelector(".design.active");
  const activeIndex = designs.indexOf(activeSlide);

  allBalls.forEach((ball) => {
    ball.classList.remove("active");
  });
  allBalls[activeIndex].classList.add("active");
}
function clickableBalls() {
  const allBalls = document.querySelectorAll(".balls .ball");
  allBalls.forEach((ball, index) => {
    ball.addEventListener("click", () => {
      getBallSlide(index);
    });
  });
}
function getBallSlide(index) {
  clearTimeout(timeoutId);
  designs.forEach((design) => {
    design.classList.remove("active");
  });
  designs[index].classList.add("active");
  getPosition();
  getActiveBall();
  autoLoop();
}

function autoLoop() {
  timeoutId = setTimeout(() => {
    getRightSlide();
  }, 3000);
}
getActiveBall();
clickableBalls();
autoLoop();
