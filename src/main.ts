import remoteURL from "./remote-control-vector-isolated-icon-remote-control-emoji-illustration-remote-control-vector-icon_603823-875.jpg";
import "./style.css";

let counter: number = 0;
let growthRate: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>CMPM 121 Project</h1>
  <p>Total Attention Units: <span id="counter">0</span></p>
  <button id="increment"></button>
  <button id="autoclick-btn">Enable Channel Surfer</button>
  <button id="upgrade-btn" disabled>📺 Buy New Screen (Cost: 10 units)</button>
  <button id="watch-btn" disabled>👩🏽‍💻🛋️ Add Binge-Watcher (Cost: 40 units)</button>
  <button id="endorse-btn" disabled>👶🏻 Endorse a studio nepo baby? (Cost: 100 units)</button>
`;
document.createElement("div");
let tvContainer = document.getElementById("tv-container");
if (!tvContainer) {
  tvContainer = document.createElement("div");
  tvContainer.id = "tv-container";
  document.body.appendChild(tvContainer);
}

// Add click handler
const button = document.getElementById("increment")!;
const autoclickButton = document.getElementById("autoclick-btn")!;
const upgradeButton = document.getElementById(
  "upgrade-btn",
) as HTMLButtonElement;
const watchButton = document.getElementById(
  "watch-btn",
) as HTMLButtonElement;
const endorseButton = document.getElementById(
  "endorse-btn",
) as HTMLButtonElement;

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
let lastTime = performance.now();
function update(time: number) {
  const delta = time - lastTime; // ms since last frame
  lastTime = time;

  if (autoclickEnabled) {
    // Increase smoothly at 1 unit per second
    counter += delta / 1000;
  }

  // Apply passive growth rate from upgrades
  counter += (growthRate * delta) / 1000;

  // Update display
  counterElement.textContent = counter.toFixed(2);

  // Enable or disable upgrade button dynamically
  upgradeButton.disabled = counter < 10;
  watchButton.disabled = counter < 40;
  endorseButton.disabled = counter < 100;

  requestAnimationFrame(update);
}

// Start animation loop
requestAnimationFrame(update);

// --- Toggle auto-clicking on/off ---
autoclickButton.addEventListener("click", () => {
  autoclickEnabled = !autoclickEnabled;
  autoclickButton.textContent = autoclickEnabled
    ? "Disable Channel Surfer"
    : "Enable Channel Surfer";
});

// --- Upgrade Purchase ---
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1; // increases by 1 unit per second
    counterElement.textContent = counter.toFixed(2);

    // Feedback for upgrade
    upgradeButton.textContent =
      `📺 Buy New Screen (Cost: 10) — Rate: ${growthRate}/s`;
  }
  const tvEmoji = document.createElement("span");
  tvEmoji.textContent = "📺";
  tvEmoji.style.fontSize = "48px"; // Make it large
  tvEmoji.style.margin = "8px";
  tvContainer!.appendChild(tvEmoji);
});

watchButton.addEventListener("click", () => {
  if (counter >= 40) {
    counter -= 40;
    growthRate += 4; // increases by 4 units per second
    counterElement.textContent = counter.toFixed(2);

    // Feedback for upgrade
    watchButton.textContent =
      `👩🏽‍💻🛋️ Add Binge-Watcher (Cost: 40) — Rate: ${growthRate}/s`;
  }
});

endorseButton.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    growthRate += 10; // increases by 10 units per second
    counterElement.textContent = counter.toFixed(2);

    // Feedback for upgrade
    endorseButton.textContent =
      `👶🏻 Endorse a studio nepo baby? (Cost: 100) — Rate: ${growthRate}/s`;
  }
  const babyEmoji = document.createElement("span");
  babyEmoji.textContent = "👶🏻";
  babyEmoji.style.fontSize = "48px"; // Make it large
  babyEmoji.style.margin = "8px";
  tvContainer!.appendChild(babyEmoji);
});

console.log("cookie");
