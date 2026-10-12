// Task: represents a single task.
// The id is read-only and immutable (defined with Object.defineProperty).
class Task {
  constructor(id, title, completed) {
    Object.defineProperty(this, "id", {
      value: id,
      writable: false,
      enumerable: true,
      configurable: false
    });
    this.title = title;
    this.completed = completed;
  }

  // Returns a NEW Task with the completed value flipped (does not mutate this one)
  toggle() {
    return new Task(this.id, this.title, !this.completed);
  }
}

// TaskManager: holds the list of tasks.
// Every method creates a NEW array instead of mutating the existing one.
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  // Replace all tasks with a copy of the given array
  setTasks(tasks) {
    this.tasks = [...tasks];
    return this.tasks;
  }

  // Add a task to the end (spread creates a new array)
  addTask(task) {
    this.tasks = [...this.tasks, task];
    return this.tasks;
  }

  // Remove a task by id (filter returns a new array)
  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return this.tasks;
  }

  // Toggle a task by id (map returns a new array, toggle returns a new Task)
  toggleTask(taskId) {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? task.toggle() : task
    );
    return this.tasks;
  }
}
