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

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;
app.append(counterDisplay);

const upgradeButton = document.createElement("button");
upgradeButton.className = "favorite styled";
upgradeButton.type = "button";
upgradeButton.innerHTML = "Purchase +1 Growth Rate (Cost: 10)";
upgradeButton.disabled = true;
app.append(upgradeButton);

const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;
  upgradeButton.disabled = counter < 10;
};

playButton.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; 
    growthRate += 1; 
    updateCounterDisplay();
  }
});

let lastTime: number = 0;

const animate = (time: number) => {
  if (lastTime) {
    const deltaTime = (time - lastTime) / 1000; 
    counter += growthRate * deltaTime; 
    updateCounterDisplay();
  }
  lastTime = time;
  requestAnimationFrame(animate); 
};

requestAnimationFrame(animate);
