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
