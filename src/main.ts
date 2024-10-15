import "./style.css";

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

// Initial state
let flowerCount: number = 0;
const unitLabel: string = "flowers";
let growthRate: number = 0;
const purchasedItems = { wateringCans: 0, gardeners: 0, greenhouses: 0 };
const baseCosts = { wateringCans: 10, gardeners: 100, greenhouses: 1000 };
const currentCosts = { wateringCans: baseCosts.wateringCans, gardeners: baseCosts.gardeners, greenhouses: baseCosts.greenhouses };

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
purchaseDisplay.innerHTML = `Purchased: Watering Cans - ${purchasedItems.wateringCans}, Gardeners - ${purchasedItems.gardeners}, Greenhouses - ${purchasedItems.greenhouses}`;
app.append(purchaseDisplay);

// Function to create upgrade buttons with custom labels and functionality
const createUpgradeButton = (label: string, rate: number, itemKey: keyof typeof purchasedItems) => {
  const button = document.createElement("button");
  button.className = "favorite styled";
  button.type = "button";
  button.innerHTML = `Purchase ${label} (Cost: ${currentCosts[itemKey].toFixed(2)}, +${rate.toFixed(1)} ${unitLabel}/sec)`;
  button.disabled = true;
  app.append(button);

  button.addEventListener("click", () => {
    if (flowerCount >= currentCosts[itemKey]) {
      flowerCount -= currentCosts[itemKey];
      growthRate += rate;
      purchasedItems[itemKey]++;
      currentCosts[itemKey] *= 1.15; // Increase cost by 1.15x after each purchase
      updateDisplays();
    }
  });

  return button;
};

// Create upgrade buttons for the tools (watering cans, gardeners, and greenhouses)
const upgradeWateringCanButton = createUpgradeButton("Watering Can", 0.1, "wateringCans");
const upgradeGardenerButton = createUpgradeButton("Gardener", 2.0, "gardeners");
const upgradeGreenhouseButton = createUpgradeButton("Greenhouse", 50.0, "greenhouses");

// Function to update the displays dynamically
const updateDisplays = () => {
  counterDisplay.innerHTML = `${flowerCount.toFixed(2)} ${unitLabel}`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
  purchaseDisplay.innerHTML = `Purchased: Watering Cans - ${purchasedItems.wateringCans}, Gardeners - ${purchasedItems.gardeners}, Greenhouses - ${purchasedItems.greenhouses}`;
  
  // Update the button labels to show current costs
  upgradeWateringCanButton.innerHTML = `Purchase Watering Can (Cost: ${currentCosts.wateringCans.toFixed(2)}, +0.1 ${unitLabel}/sec)`;
  upgradeGardenerButton.innerHTML = `Purchase Gardener (Cost: ${currentCosts.gardeners.toFixed(2)}, +2.0 ${unitLabel}/sec)`;
  upgradeGreenhouseButton.innerHTML = `Purchase Greenhouse (Cost: ${currentCosts.greenhouses.toFixed(2)}, +50 ${unitLabel}/sec)`;
  
  // Disable buttons if the player doesn't have enough flowers to purchase
  upgradeWateringCanButton.disabled = flowerCount < currentCosts.wateringCans;
  upgradeGardenerButton.disabled = flowerCount < currentCosts.gardeners;
  upgradeGreenhouseButton.disabled = flowerCount < currentCosts.greenhouses;
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
