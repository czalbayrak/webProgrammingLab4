// DOM references
const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");

// Application state
const taskManager = new TaskManager();

// Builds the DOM element for a single task
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  if (task.completed) {
    taskDiv.classList.add("completed");
  }

  const titleSpan = document.createElement("span");
  titleSpan.textContent = task.title;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  taskDiv.appendChild(titleSpan);
  taskDiv.appendChild(toggleBtn);
  taskDiv.appendChild(deleteBtn);

  return taskDiv;
}

// Clears the list and renders every task again
function renderTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  taskManager.tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

// Loads tasks from the simulated server
async function loadTasks() {
  statusMessage.textContent = "Loading tasks...";

  const rawTasks = await fetchTasks();

  // JSON requirement: stringify, then parse back
  const json = JSON.stringify(rawTasks);
  const parsedTasks = JSON.parse(json);

  // Convert plain objects into Task instances
  const tasks = parsedTasks.map(
    (item) => new Task(item.id, item.title, item.completed)
  );

  taskManager.setTasks(tasks);
  renderTasks();
  statusMessage.textContent = "";
}

loadTasksBtn.addEventListener("click", loadTasks);
