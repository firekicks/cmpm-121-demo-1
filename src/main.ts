import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Atri's Magnificent Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.className = "favorite styled";
button.type = "button";
button.innerHTML = "🎉 Let's Play!";
app.append(button);

let counter: number = 0;
const unitLabel: string = "celebrations";

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} ${unitLabel}`;
app.append(counterDisplay);

const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`; 
};

button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

let lastTime: number = 0;

const animate = (time: number) => {
  if (lastTime) {
    const deltaTime = (time - lastTime) / 1000; 
    counter += deltaTime; 
    updateCounterDisplay();
  }
  lastTime = time;
  requestAnimationFrame(animate); 
};

requestAnimationFrame(animate);
