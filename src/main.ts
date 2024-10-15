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

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;
app.append(counterDisplay);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
app.append(growthRateDisplay);

const purchaseDisplay = document.createElement("div");
purchaseDisplay.innerHTML = `Purchased: A - ${purchasedItems.A}, B - ${purchasedItems.B}, C - ${purchasedItems.C}`;
app.append(purchaseDisplay);

const createUpgradeButton = (label: string, cost: number, rate: number, itemKey: keyof typeof purchasedItems) => {
  const button = document.createElement("button");
  button.className = "favorite styled";
  button.type = "button";
  button.innerHTML = `Purchase ${label} (Cost: ${cost}, +${rate.toFixed(1)} ${unitLabel}/sec)`;
  button.disabled = true;
  app.append(button);

  button.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost;
      growthRate += rate;
      purchasedItems[itemKey]++;
      updateDisplays();
    }
  });

  return button;
};

// Create buttons for A, B, C upgrades
const upgradeAButton = createUpgradeButton("A", 10, 0.1, "A");
const upgradeBButton = createUpgradeButton("B", 100, 2.0, "B");
const upgradeCButton = createUpgradeButton("C", 1000, 50.0, "C");

const updateDisplays = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
  purchaseDisplay.innerHTML = `Purchased: A - ${purchasedItems.A}, B - ${purchasedItems.B}, C - ${purchasedItems.C}`;
  
  upgradeAButton.disabled = counter < 10;
  upgradeBButton.disabled = counter < 100;
  upgradeCButton.disabled = counter < 1000;
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
