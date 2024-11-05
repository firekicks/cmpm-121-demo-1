// 1. Imports and Interfaces
import "./style.css";

interface Item {
  name: string;
  price: number;
  growth: number;
  description: string;
}

// 2. Constants and Initial Game State
const PRICE_MULTIPLIER = 1.15;
const flowerUnitLabel = "flowers";

const upgradeItemsList: Item[] = [
  { name: "Watering Can", price: 10, growth: 0.1, description: "Keeps your plants hydrated, adding a small trickle of flowers." },
  { name: "Gardener", price: 100, growth: 2.0, description: "A skilled gardener who nurtures your plants, producing flowers faster." },
  { name: "Greenhouse", price: 1000, growth: 50.0, description: "A large greenhouse that provides the perfect environment for plants to flourish." },
  { name: "Sprinkler System", price: 5000, growth: 150.0, description: "Automated sprinklers provide consistent hydration, speeding up flower production." },
  { name: "Botanical Garden", price: 20000, growth: 500.0, description: "An entire garden managed by experts, attracting tons of visitors and growing flowers rapidly." },
];

// Game state variables
let totalFlowers = 0;
let flowersPerSecond = 0;
const purchasedUpgrades: { [key: string]: number } = {};
const currentItemPrices: { [key: string]: number } = {};
const upgradeButtons: { [key: string]: HTMLButtonElement } = {};

// Initialize item purchase count and prices
upgradeItemsList.forEach((item) => {
  purchasedUpgrades[item.name] = 0;
  currentItemPrices[item.name] = item.price;
});

// 3. UI Element Declarations
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Garden Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const flowerButton = document.createElement("button");
flowerButton.className = "giant-flower";
flowerButton.type = "button";
flowerButton.innerHTML = "🌸 Giant Flower 🌸";

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${totalFlowers.toFixed(2)} ${flowerUnitLabel}`;

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth Rate: ${flowersPerSecond.toFixed(1)} ${flowerUnitLabel}/sec`;

const purchaseDisplay = document.createElement("div");

// 4. Event Listeners
const setupEventListeners = () => {
  flowerButton.addEventListener("click", () => {
    totalFlowers++;
    updateDisplays();
  });

  upgradeItemsList.forEach((item) => {
    const button = document.createElement("button");
    button.className = "favorite styled";
    button.type = "button";
    button.innerHTML = `Purchase ${item.name} (Cost: ${currentItemPrices[item.name].toFixed(2)}, +${item.growth.toFixed(1)} ${flowerUnitLabel}/sec)`;
    button.disabled = true;
    app.append(button);

    const description = document.createElement("p");
    description.innerHTML = item.description;
    app.append(description);

    upgradeButtons[item.name] = button;

    button.addEventListener("click", () => {
      if (totalFlowers >= currentItemPrices[item.name]) {
        totalFlowers -= currentItemPrices[item.name];
        flowersPerSecond += item.growth;
        purchasedUpgrades[item.name]++;
        currentItemPrices[item.name] *= PRICE_MULTIPLIER;
        updateDisplays();
      }
    });
  });
};

// 5. Core Functions
const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${totalFlowers.toFixed(2)} ${flowerUnitLabel}`;
};

const updateGrowthRateDisplay = () => {
  growthRateDisplay.innerHTML = `Growth Rate: ${flowersPerSecond.toFixed(1)} ${flowerUnitLabel}/sec`;
};

const updatePurchaseDisplay = () => {
  purchaseDisplay.innerHTML =
    `Purchased: ` +
    upgradeItemsList
      .map((item) => `${item.name} - ${purchasedUpgrades[item.name]}`)
      .join(", ");
};

const updateButtons = () => {
  upgradeItemsList.forEach((item) => {
    const button = upgradeButtons[item.name];
    button.innerHTML = `Purchase ${item.name} (Cost: ${currentItemPrices[item.name].toFixed(2)}, +${item.growth.toFixed(1)} ${flowerUnitLabel}/sec)`;
    button.disabled = totalFlowers < currentItemPrices[item.name];
  });
};

const updateDisplays = () => {
  updateCounterDisplay();
  updateGrowthRateDisplay();
  updatePurchaseDisplay();
  updateButtons();
};

let lastTime = 0;
const animate = (time: number) => {
  if (lastTime) {
    const deltaTime = (time - lastTime) / 1000;
    totalFlowers += flowersPerSecond * deltaTime;
    updateDisplays();
  }
  lastTime = time;
  requestAnimationFrame(animate);
};

// 6. Initial Setup Calls
app.append(header, flowerButton, counterDisplay, growthRateDisplay, purchaseDisplay);
setupEventListeners();
requestAnimationFrame(animate);

// Color Animation Variables
let hue = 0;

// Function to update the background color
const animateBackgroundColor = () => {
  hue = (hue + 0.5) % 360; // Increment hue and loop it back to 0 after reaching 360
  document.body.style.backgroundColor = `hsl(${hue}, 60%, 85%)`; // Light pastel color scheme
  requestAnimationFrame(animateBackgroundColor); // Continue animation
};

// Start the color animation
animateBackgroundColor();
