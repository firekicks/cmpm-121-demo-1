import "./style.css";

// Interface for each item (upgrades)
interface Item {
  name: string;
  price: number;      // Alternative term for cost
  growth: number;     // Alternative term for rate
  description: string; // Fun description for each item
}

// Available items (upgradeable tools)
const availableItems: Item[] = [
  { 
    name: "Watering Can", 
    price: 10, 
    growth: 0.1, 
    description: "Keeps your plants hydrated, adding a small trickle of flowers." 
  },
  { 
    name: "Gardener", 
    price: 100, 
    growth: 2.0, 
    description: "A skilled gardener who nurtures your plants, producing flowers faster."
  },
  { 
    name: "Greenhouse", 
    price: 1000, 
    growth: 50.0, 
    description: "A large greenhouse that provides the perfect environment for plants to flourish."
  },
  {
    name: "Sprinkler System", 
    price: 5000, 
    growth: 150.0, 
    description: "Automated sprinklers provide consistent hydration, speeding up flower production."
  },
  {
    name: "Botanical Garden", 
    price: 20000, 
    growth: 500.0, 
    description: "An entire garden managed by experts, attracting tons of visitors and growing flowers rapidly."
  }
];

// Initialize the game
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Garden Clicker";
document.title = gameName;

// Main header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Flower button (main button)
const flowerButton = document.createElement("button");
flowerButton.className = "giant-flower";
flowerButton.type = "button";
flowerButton.innerHTML = "🌸 Giant Flower 🌸";
app.append(flowerButton);

// Game state variables
let flowerCount: number = 0;
const unitLabel: string = "flowers";
let growthRate: number = 0;
const purchasedItems: { [key: string]: number } = {};
const currentPrices: { [key: string]: number } = {};

// Buttons array to store the references for the update functions
const upgradeButtons: { [key: string]: HTMLButtonElement } = {};

// Initialize item purchase count and prices
availableItems.forEach(item => {
  purchasedItems[item.name] = 0;
  currentPrices[item.name] = item.price;
});

// Counter display (shows flower count)
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${flowerCount.toFixed(2)} ${unitLabel}`;
app.append(counterDisplay);

// Growth rate display (automatic flower production rate)
const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
app.append(growthRateDisplay);

// Purchase display (shows how many tools are purchased)
const purchaseDisplay = document.createElement("div");
app.append(purchaseDisplay);

// Update the purchase display
const updatePurchaseDisplay = () => {
  purchaseDisplay.innerHTML = `Purchased: ` + 
    availableItems.map(item => `${item.name} - ${purchasedItems[item.name]}`).join(", ");
};

// Function to create upgrade buttons dynamically from availableItems array
availableItems.forEach(item => {
  const button = document.createElement("button");
  button.className = "favorite styled";
  button.type = "button";
  button.innerHTML = `Purchase ${item.name} (Cost: ${currentPrices[item.name].toFixed(2)}, +${item.growth.toFixed(1)} ${unitLabel}/sec)`;
  button.disabled = true;
  app.append(button);

  // Add a description below each button
  const description = document.createElement("p");
  description.innerHTML = item.description;
  app.append(description);

  upgradeButtons[item.name] = button; // Store the button reference

  button.addEventListener("click", () => {
    if (flowerCount >= currentPrices[item.name]) {
      flowerCount -= currentPrices[item.name];
      growthRate += item.growth;
      purchasedItems[item.name]++;
      currentPrices[item.name] *= 1.15; // Increase price by 1.15x after each purchase
      updateDisplays();
    }
  });
});

// Function to update all displays dynamically
const updateDisplays = () => {
  counterDisplay.innerHTML = `${flowerCount.toFixed(2)} ${unitLabel}`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
  updatePurchaseDisplay();

  // Update all buttons
  availableItems.forEach(item => {
    const button = upgradeButtons[item.name];
    button.innerHTML = `Purchase ${item.name} (Cost: ${currentPrices[item.name].toFixed(2)}, +${item.growth.toFixed(1)} ${unitLabel}/sec)`;
    button.disabled = flowerCount < currentPrices[item.name];
  });
};

// Event listener for clicking the giant flower (main action to gain flowers)
flowerButton.addEventListener("click", () => {
  flowerCount++;
  updateDisplays();
});

// Automatic growth animation (increases flower count based on growth rate)
let lastTime: number = 0;

const animate = (time: number) => {
  if (lastTime) {
    const deltaTime = (time - lastTime) / 1000;
    flowerCount += growthRate * deltaTime;
    updateDisplays();
  }
  lastTime = time;
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
