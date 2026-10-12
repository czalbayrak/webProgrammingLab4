# Assignment 4 – Dynamic Task Dashboard

A small task management dashboard built with **vanilla JavaScript** (no frameworks, no libraries).
Tasks are loaded from a simulated server, rendered with DOM APIs, and can be toggled or deleted.
All state updates are immutable.

## How to Run

Open `assignment4/index.html` in a browser and click **Load Tasks**.
After about 1.5 seconds the tasks appear.

## File Organization

```
/assignment4
 ├── index.html       DOM structure: heading, Load Tasks button, status message, task list container
 ├── styles.css       Minimal styling; .completed tasks are shown with line-through
 ├── taskManager.js   Task and TaskManager classes
 ├── api.js           fetchTasks(): simulated server request (Promise + setTimeout 1500ms)
 └── main.js          Connects everything: event listeners, async loading, rendering
```

- **taskManager.js**
  - `Task` – `id` is made read-only with `Object.defineProperty` (`writable: false`, `configurable: false`).
    `toggle()` returns a **new** `Task` instead of changing the current one.
  - `TaskManager` – keeps a `tasks` array. `setTasks`, `addTask`, `removeTask` and `toggleTask`
    always assign a **new array** (spread operator, `filter`, `map`), so the old array is never mutated.
- **api.js** – `fetchTasks()` returns a Promise that resolves with the raw task data after 1500ms.
- **main.js**
  - On click, shows "Loading tasks...", then uses `async/await` to get the data.
  - The raw data is converted with `JSON.stringify` and back with `JSON.parse`, then mapped to `Task` instances.
  - Tasks are stored in `TaskManager` and rendered with `createElement` / `appendChild`.
  - Each Toggle / Delete button has its own `addEventListener` (no inline HTML handlers) and re-renders the list.
  - Loading is wrapped in `try/catch`; on failure an error message is shown in `statusMessage`.

Scripts are loaded with normal `<script>` tags in dependency order
(`taskManager.js` → `api.js` → `main.js`), so the project also works when opened directly from the file system.

## Challenges

- **Immutability:** It was easy to accidentally use `push`, `splice` or change `task.completed` directly.
  I had to think in terms of "create a new array / new object" every time, using `map`, `filter` and the spread operator.
- **Read-only id:** Understanding `Object.defineProperty` and that assigning to a non-writable property
  silently fails (outside strict mode) instead of throwing an error.
- **Re-rendering:** After each toggle or delete the list must be cleared before rendering again,
  otherwise tasks are duplicated. Each button's listener also needs the correct task id, which I solved with closures.
- **Async flow:** Making sure the status message changes in the right order
  ("Loading tasks..." → cleared, or an error message) and disabling the button while loading
  so the user cannot start several requests at once.
