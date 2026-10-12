class Task {
    constructor(id, title, completed) {
      // id is read-only: it cannot be changed or deleted after creation
      Object.defineProperty(this, "id", {
        value: id,
        writable: false,
        configurable: false,
        enumerable: true
      });
      this.title = title;
      this.completed = completed;
    }
  
    // Does NOT change this task; returns a brand new Task instead
    toggle() {
      return new Task(this.id, this.title, !this.completed);
    }
  }
  
  class TaskManager {
    constructor() {
      this.tasks = [];
    }
  
    // Replace the whole list with a copy of the given array
    setTasks(tasks) {
      this.tasks = [...tasks];
    }
  
    // Spread creates a new array; the old one is never changed
    addTask(task) {
      this.tasks = [...this.tasks, task];
    }
  
    // filter returns a new array without the removed task
    removeTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }
  
    // map returns a new array; only the matching task is replaced by its toggled copy
    toggleTask(taskId) {
      this.tasks = this.tasks.map((task) =>
        task.id === taskId ? task.toggle() : task
      );
    }
  }