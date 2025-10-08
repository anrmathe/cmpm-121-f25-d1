import remoteURL from "./remote-control-vector-isolated-icon-remote-control-emoji-illustration-remote-control-vector-icon_603823-875.jpg";
import "./style.css";

let counter: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Total Attention Units: <span id="counter">0</span></p>
  <button id="increment"></button>
  <p>Example image asset: <img src="${remoteURL}" class="icon" /></p>
`;

// Add click handler
const button = document.getElementById("increment")!;

const img = document.createElement("img");
img.src = remoteURL; // <-- put your image path here
img.alt = "Click to change channels!";
img.width = 128;
img.height = 128;

// Add the image inside the button
button.appendChild(img);

const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  // This looks like to a good place to add some logic!
  ++counter;
  counterElement.textContent = counter.toString();
  // console.log("I have these thingies:", button, counterElement, counter);
});

console.log("cookie");
