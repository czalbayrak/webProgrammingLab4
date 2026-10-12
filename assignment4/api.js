// Simulates a server request that takes 1.5 seconds
function fetchTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: "Study JavaScript", completed: false },
          { id: 2, title: "Practice DOM", completed: true },
          { id: 3, title: "Read Async Patterns", completed: false }
        ]);
      }, 1500);
    });
  }