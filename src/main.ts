import remoteURL from "./remote-control-vector-isolated-icon-remote-control-emoji-illustration-remote-control-vector-icon_603823-875.png";
import "./style.css";

interface Upgrade {
  name: string;
  emoji: string;
  cost: number;
  rate: number;
  description: string;
  element?: HTMLButtonElement; // will store reference to its button
  container?: HTMLElement; // optional visual container (like for 📺 or 👶)
}

// === Game State Variables ===
let counter: number = 0;
let growthRate: number = 0;
let autoclickEnabled = false;
let lastTime = performance.now();

// === Upgrade Definitions ===
const upgrades: Upgrade[] = [
  {
    name: "Buy New Screen",
    emoji: "📺",
    cost: 10,
    rate: 1,
    description:
      "Studies show that adding screens increases happiness by 0%. Let’s test that!",
  },
  {
    name: "Add Binge-Watcher",
    emoji: "👩🏽‍💻🛋️",
    cost: 40,
    rate: 4,
    description: "More viewers mean more attention!",
  },
  {
    name: "Endorse a studio nepo baby?",
    emoji: "👶🏻",
    cost: 100,
    rate: 10,
    description:
      "We need ORIGINAL AUTHENTIC content!!! Child of two A-list actors, home-birth on the set of Scarface.. self-made for sure!",
  },
  {
    name: "Promote a pretentious, esoteric director!",
    emoji: "🎬",
    cost: 400,
    rate: 50,
    description:
      "If you didn't like it, you just don't get it. It's all about the subtext.",
  },
  {
    name: "Quit your job to become a full-time streamer! $$$",
    emoji: "🖥️",
    cost: 1000,
    rate: 200,
    description: "Now we can focus on the actually important stuff!",
  },
];

function showUpgradeBanner(description: string) {
  const banner = document.createElement("div");
  banner.textContent = description;
  banner.style.position = "fixed";
  banner.style.top = "0";
  banner.style.left = "50%";
  banner.style.transform = "translateX(-50%)";
  banner.style.background = "#ff7cebff";
  banner.style.color = "#fff";
  banner.style.padding = "4px 8px";
  banner.style.fontSize = "1rem";
  banner.style.zIndex = "10000";
  banner.style.borderRadius = "0 0 2px 2px";
  document.body.appendChild(banner);

  setTimeout(() => {
    banner.remove();
  }, 3000); // Hide after 3 seconds
}

function showFloatingText(amount: number, x: number, y: number) {
  const el = document.createElement("div");
  el.textContent = `+${amount.toFixed(0)}`;
  el.className = "floating-text";

  el.style.position = "absolute";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.transform = "translate(-50%, 0)";
  el.style.fontSize = "24px";
  el.style.fontWeight = "700";
  el.style.color = "#fff";
  el.style.textShadow = "0 2px 4px rgba(0,0,0,0.4)";
  el.style.pointerEvents = "none";
  el.style.userSelect = "none";
  el.style.zIndex = "1000";
  el.style.transition = "transform 1.2s ease-out, opacity 1.2s ease-out";
  document.body.appendChild(el);

  // Trigger the float up animation
  requestAnimationFrame(() => {
    el.style.transform = "translate(-50%, -80px)";
    el.style.opacity = "0";
  });

  // Remove the element after animation
  setTimeout(() => el.remove(), 1200);
}

// Call showUpgradeBanner(description) after a new upgrade is purchased.

// === DOM Initialization ===
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

button.addEventListener("click", (ev: MouseEvent) => {
  ++counter;
  counterElement.textContent = counter.toFixed(2);

  button.classList.add("bounce");
  setTimeout(() => button.classList.remove("bounce"), 700); // match animation duration

  const rect = button.getBoundingClientRect();
  const x = ev.clientX ?? rect.left + rect.width / 2;
  const y = ev.clientY ?? rect.top + rect.height / 2;

  showFloatingText(1, x, y);
});

upgrades.forEach((upgrade) => {
  const btn = document.createElement("button");
  btn.textContent = `${upgrade.emoji} ${upgrade.name} (Cost: ${
    upgrade.cost.toFixed(
      2,
    )
  })`;
  btn.disabled = true;

  btn.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      growthRate += upgrade.rate;
      upgrade.cost *= 1.15; // increase future cost
      showUpgradeBanner(upgrade.description);
      counterElement.textContent = counter.toFixed(2);

      // Update button text to reflect new cost & total rate
      btn.textContent = `${upgrade.emoji} ${upgrade.name} (Cost: ${
        upgrade.cost.toFixed(
          2,
        )
      }) — Rate: ${growthRate}/s`;

      // Visual reward: add emoji for certain upgrades
      if (!upgrade.container) {
        upgrade.container = document.createElement("div");
        upgrade.container.style.marginTop = "8px";
        itemsContainer.appendChild(upgrade.container);
      }
      const emoji = document.createElement("span");
      emoji.textContent = upgrade.emoji;
      emoji.style.fontSize = "48px";
      emoji.style.margin = "8px";
      upgrade.container.appendChild(emoji);
    }
  });

  itemsContainer.appendChild(btn);
  upgrade.element = btn; // store reference
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

  // Enable/disable all upgrade buttons dynamically
  for (const upgrade of upgrades) {
    if (upgrade.element) {
      upgrade.element.disabled = counter < upgrade.cost;
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
