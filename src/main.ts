import remoteURL from "./remote-control-vector-isolated-icon-remote-control-emoji-illustration-remote-control-vector-icon_603823-875.jpg";
import "./style.css";

let counter: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Total Attention Units: <span id="counter">0</span></p>
  <button id="increment"></button>
  <button id="autoclick-btn">Enable Channel Surfer</button>
  <p>Example image asset: <img src="${remoteURL}" class="icon" /></p>
`;

// Add click handler
const button = document.getElementById("increment")!;
const autoclickButton = document.getElementById("autoclick-btn")!;

const img = document.createElement("img");
img.src = remoteURL; // <-- put your image path here
img.alt = "Click to change channels!";
img.width = 128;
img.height = 128;

// Add the image inside the button
button.appendChild(img);

const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  // Increase counter each time button is clicked.
  ++counter;
  counterElement.textContent = counter.toString();
  // console.log("I have these thingies:", button, counterElement, counter);
});

let autoclickEnabled = false;

autoclickButton.addEventListener("click", () => {
  autoclickEnabled = !autoclickEnabled;
  if (autoclickEnabled) {
    setInterval(() => {
      ++counter;
      counterElement.textContent = counter.toString();
    }, 1000);
  }
});

console.log("cookie");
