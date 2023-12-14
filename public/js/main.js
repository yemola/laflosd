// window.onload = function() {
//   const loader = document.querySelector('.wrapper');
//   loader.classList.add('load');
// }
const copyrightLine = document.querySelector(".copyright");
copyrightLine.innerHTML = `<span class="copy">&copy;</span>
<p>${`Copyright 2021-${new Date().getFullYear()} Laflo`}</p>`;

const sideNav = document.querySelector(".toggler");
sideNav.addEventListener("click", () => {
  openNav();
});
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}
const closeNavButton = document.querySelector(".closebtn");
closeNavButton.addEventListener("click", () => {
  closeNav();
});
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

let statusInfo = document.querySelector("#status");

window.addEventListener("offline", () => {
  statusInfo.classList.remove("online");
  void statusInfo.offsetWidth;
  statusInfo.classList.add("offline");
  statusInfo.innerText =
    "You're now offline, pls check your internet connection";
});

window.addEventListener("online", () => {
  statusInfo.classList.remove("offline");
  void statusInfo.offsetWidth;
  statusInfo.classList.add("online");
  statusInfo.innerText = "You're back online";
});
