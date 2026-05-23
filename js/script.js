// CLOCK
function updateClock() {

  const now = new Date();

  document.getElementById("clock").innerHTML =
    now.toLocaleTimeString();

  document.getElementById("date").innerHTML =
    now.toDateString();

  const hour = now.getHours();

  let greeting = "Good Evening ✨";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  }

  else if (hour < 18) {
    greeting = "Good Afternoon 🌸";
  }

  const savedName =
    localStorage.getItem("username");

  document.getElementById("greeting").innerHTML =
    savedName
      ? `${greeting}, ${savedName}`
      : greeting;

}

setInterval(updateClock, 1000);

updateClock();

// SAVE NAME
function saveName() {

  const username =
    document.getElementById("username").value;

  localStorage.setItem(
    "username",
    username
  );

  updateClock();

}

// TIMER
let timeLeft = 1500;

let timer;

function updateTimer() {

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  document.getElementById("timer").innerHTML =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

function startTimer() {

  timer = setInterval(() => {

    if (timeLeft > 0) {

      timeLeft--;

      updateTimer();

    }

  }, 1000);

}

function stopTimer() {

  clearInterval(timer);

}

function resetTimer() {

  clearInterval(timer);

  timeLeft = 1500;

  updateTimer();

}

updateTimer();

// TODO LIST
let tasks =
  JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}

function renderTasks() {

  const taskList =
    document.getElementById("taskList");

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.done ? "done" : ""}">
        ${task.text}
      </span>

      <div>
        <button onclick="toggleTask(${index})">
          ✔
        </button>

        <button onclick="deleteTask(${index})">
          ✖
        </button>
      </div>
    `;

    taskList.appendChild(li);

  });

}

function addTask() {

  const input =
    document.getElementById("taskInput");

  const text =
    input.value.trim();

  if (text === "") return;

  const duplicate =
    tasks.some(task => task.text === text);

  if (duplicate) {

    alert("Task already exists!");

    return;

  }

  tasks.push({
    text,
    done: false
  });

  saveTasks();

  renderTasks();

  input.value = "";

}

function toggleTask(index) {

  tasks[index].done =
    !tasks[index].done;

  saveTasks();

  renderTasks();

}

function deleteTask(index) {

  tasks.splice(index, 1);

  saveTasks();

  renderTasks();

}

renderTasks();

// QUICK LINKS
let links =
  JSON.parse(localStorage.getItem("links")) || [];

function saveLinks() {

  localStorage.setItem(
    "links",
    JSON.stringify(links)
  );

}

function renderLinks() {

  const container =
    document.getElementById("linksContainer");

  container.innerHTML = "";

  links.forEach(link => {

    const a =
      document.createElement("a");

    a.href = link.url;

    a.target = "_blank";

    a.innerHTML = link.name;

    container.appendChild(a);

  });

}

function addLink() {

  const name =
    document.getElementById("linkName").value;

  const url =
    document.getElementById("linkURL").value;

  if (name === "" || url === "") return;

  links.push({
    name,
    url
  });

  saveLinks();

  renderLinks();

  document.getElementById("linkName").value = "";

  document.getElementById("linkURL").value = "";

}

renderLinks();