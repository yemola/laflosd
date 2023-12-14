// import "regenerator-runtime/runtime";
const timebox = document.querySelector(".timebox");
const date = document.querySelector(".date");

timebox.innerHTML = showTime();
let today = new Date();
date.innerHTML = today.toDateString();

function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  //12hr Format
  hour = hour % 12 || 12;
  if (min < 10) {
    min = `${0}${min}`;
  }

  // Output Time
  timebox.innerHTML = `<h1>${hour}<span class="separator">:</span>${min}<span class="am-pm">${amPm}</span></h1>
    `;

  setTimeout(showTime, 1000);
}

// Run
showTime();

// const key = '3000676dfafdec286daed52b82cd2a21';
const key = "b6f9a9bde334842bdfa6744f61a8d2e5";
const details = document.querySelector(".details");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  details.innerHTML = "<h4>loading...</h4>";
  const location = e.target.location.value;
  weatherApp(location);
});

async function weatherApp(location) {
  const data = await fetchAPI(location);
  generateHTML(data);
}

async function fetchAPI(location) {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${key}`;
  const res = await fetch(baseURL);
  const data = await res.json();
  //   console.log(data);
  return data;
}
function generateHTML(data) {
  if (!data) return;
  details.innerHTML = `<h5>Sorry! This city is not captured. Make sure it's spelt correctly or try another city</h5>`;
  const html = `
    <p class="current">currently</p>
    <div class="temp-box"><div class="temp-celcius"><h1 class="temp">${
      data.main.temp
    }</h1></div>
        <div class="unit"><h3 class="item">°</h3>
        <h3 class="item">C</h3></div>
        </div>
    <div><h3 class="status">${data.weather.shift().description}</h3>
    <h3 class="feelslike">Feels like ${data.main.feels_like}°</h3></div>
    <div class="current-info">
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Pressure: ${data.main.pressure} mBar</p>
      <p>Visibility: ${data.visibility / 1000}Km</p>
      <p>Wind speed: ${data.wind.speed}</p>
      <h4 class="query">${data.name}, ${data.sys.country}</h4>
    </div>`;
  details.innerHTML = html;
}
