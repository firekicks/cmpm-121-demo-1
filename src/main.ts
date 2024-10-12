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

button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${counter} ${unitLabel}`;
});
