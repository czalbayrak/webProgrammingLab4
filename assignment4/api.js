// Simulates a server request that takes 1500ms.
// Returns a Promise that resolves with the raw task data.
function fetchTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Study JavaScript", completed: false },
        { id: 2, title: "Practice DOM", completed: true },
        { id: 3, title: "Read Async Patterns", completed: false }
      ]);
    }, 1500);
  });
}
