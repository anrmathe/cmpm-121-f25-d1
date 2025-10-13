import remoteURL from "./remote-control-vector-isolated-icon-remote-control-emoji-illustration-remote-control-vector-icon_603823-875.jpg";
import "./style.css";

interface Item {
  name: string;
  emoji: string;
  cost: number;
  rate: number;
  element?: HTMLButtonElement; // will store reference to its button
  container?: HTMLElement; // optional visual container (like for 📺 or 👶)
}

let counter: number = 0;
let growthRate: number = 0;
let autoclickEnabled = false;
let lastTime = performance.now();

const availableItems: Item[] = [
  { name: "Buy New Screen", emoji: "📺", cost: 10, rate: 1 },
  { name: "Add Binge-Watcher", emoji: "👩🏽‍💻🛋️", cost: 40, rate: 4 },
  {
    name: "Endorse a studio nepo baby?",
    emoji: "👶🏻",
    cost: 100,
    rate: 10,
  },
];

// Create basic HTML structure
document.body.innerHTML = `
  <h1>The Singularity is Nearer</h1>
  <p>Total Attention Units: <span id="counter">0</span></p>
  <button id="increment"></button>
  <button id="autoclick-btn">Enable Channel Surfer</button>
  <div id="items-container"></div>
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
const itemsContainer = document.getElementById("items-container")!;

button.addEventListener("click", () => {
  // Increase counter each time button is clicked.
  ++counter;
  counterElement.textContent = counter.toFixed(2);
  // console.log("I have these thingies:", button, counterElement, counter);
});

availableItems.forEach((item) => {
  const btn = document.createElement("button");
  btn.textContent = `${item.emoji} ${item.name} (Cost: ${
    item.cost.toFixed(
      2,
    )
  })`;
  btn.disabled = true;

  btn.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      item.cost *= 1.15; // increase future cost
      counterElement.textContent = counter.toFixed(2);

      // Update button text to reflect new cost & total rate
      btn.textContent = `${item.emoji} ${item.name} (Cost: ${
        item.cost.toFixed(
          2,
        )
      }) — Rate: ${growthRate}/s`;

      // Visual reward: add emoji for certain items
      if (!item.container) {
        item.container = document.createElement("div");
        item.container.style.marginTop = "8px";
        itemsContainer.appendChild(item.container);
      }
      const emoji = document.createElement("span");
      emoji.textContent = item.emoji;
      emoji.style.fontSize = "48px";
      emoji.style.margin = "8px";
      item.container.appendChild(emoji);
    }
  });

  itemsContainer.appendChild(btn);
  item.element = btn; // store reference
});

function update(time: number) {
  const delta = time - lastTime;
  lastTime = time;

  if (autoclickEnabled) {
    counter += delta / 1000;
  }

  // Passive growth
  counter += (growthRate * delta) / 1000;

  // Update displayed counter
  counterElement.textContent = counter.toFixed(2);

  // Enable/disable all item buttons dynamically
  for (const item of availableItems) {
    if (item.element) {
      item.element.disabled = counter < item.cost;
    }
  }

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

console.log("cookie");
