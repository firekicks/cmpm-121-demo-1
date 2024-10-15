import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Atri's Magnificent Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const playButton = document.createElement("button");
playButton.className = "favorite styled";
playButton.type = "button";
playButton.innerHTML = "🎉 Let's Play!";
app.append(playButton);

let counter: number = 0;
const unitLabel: string = "celebrations";
let growthRate: number = 0;
const purchasedItems = { A: 0, B: 0, C: 0 };
const baseCosts = { A: 10, B: 100, C: 1000 };
const currentCosts = { A: baseCosts.A, B: baseCosts.B, C: baseCosts.C };

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;
app.append(counterDisplay);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
app.append(growthRateDisplay);

const purchaseDisplay = document.createElement("div");
purchaseDisplay.innerHTML = `Purchased: A - ${purchasedItems.A}, B - ${purchasedItems.B}, C - ${purchasedItems.C}`;
app.append(purchaseDisplay);

const createUpgradeButton = (label: string, rate: number, itemKey: keyof typeof purchasedItems) => {
  const button = document.createElement("button");
  button.className = "favorite styled";
  button.type = "button";
  button.innerHTML = `Purchase ${label} (Cost: ${currentCosts[itemKey].toFixed(2)}, +${rate.toFixed(1)} ${unitLabel}/sec)`;
  button.disabled = true;
  app.append(button);

  button.addEventListener("click", () => {
    if (counter >= currentCosts[itemKey]) {
      counter -= currentCosts[itemKey];
      growthRate += rate;
      purchasedItems[itemKey]++;
      currentCosts[itemKey] *= 1.15; // Increase cost by a factor of 1.15
      updateDisplays();
    }
  });

  return button;
};

// Create buttons for A, B, C upgrades
const upgradeAButton = createUpgradeButton("A", 0.1, "A");
const upgradeBButton = createUpgradeButton("B", 2.0, "B");
const upgradeCButton = createUpgradeButton("C", 50.0, "C");

const updateDisplays = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
  purchaseDisplay.innerHTML = `Purchased: A - ${purchasedItems.A}, B - ${purchasedItems.B}, C - ${purchasedItems.C}`;
  
  upgradeAButton.innerHTML = `Purchase A (Cost: ${currentCosts.A.toFixed(2)}, +0.1 ${unitLabel}/sec)`;
  upgradeBButton.innerHTML = `Purchase B (Cost: ${currentCosts.B.toFixed(2)}, +2.0 ${unitLabel}/sec)`;
  upgradeCButton.innerHTML = `Purchase C (Cost: ${currentCosts.C.toFixed(2)}, +50 ${unitLabel}/sec)`;
  
  upgradeAButton.disabled = counter < currentCosts.A;
  upgradeBButton.disabled = counter < currentCosts.B;
  upgradeCButton.disabled = counter < currentCosts.C;
};

playButton.addEventListener("click", () => {
  counter++;
  updateDisplays();
});

let lastTime: number = 0;

const animate = (time: number) => {
  if (lastTime) {
    const deltaTime = (time - lastTime) / 1000;
    counter += growthRate * deltaTime;
    updateDisplays();
  }
  lastTime = time;
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
