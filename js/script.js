document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks && Array.isArray(storedTasks)) {
    tasks = storedTasks; // Restore from storage
    updateTaskList();
    updateStats();
  }
});

let tasks = [];

// save tasks in local storage
const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// add tasks
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();  //trim() - removes spaces from the start and end of the text.

  if (text) {
    tasks.push({ text: text, completed: false });
    updateTaskList();
  }
  taskInput.value = "";
  updateStats();
  saveTask();
};

// toggle function
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  saveTask();
};

// delete function
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
};

// edit function
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
};

// update stats
let hasCelebrated = false;

const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completeTasks} / ${totalTasks}`;

  // Celebrate only the first time we reach 100%
  if (totalTasks > 0 && completeTasks === totalTasks && !hasCelebrated) {
    hasCelebrated = true;
    blaskConfitte();
  }

  // Reset only if not all tasks are complete
  if (totalTasks > 0 && completeTasks < totalTasks) {
    hasCelebrated = false;
  }
};

const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
         <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                  task.completed ? "checked" : ""
                }>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="/img/edit.png" onclick="editTask(${index})">
                <img src="/img/bin.png" onclick="deleteTask(${index})">
            </div>
         </div>
         `;
    listItem.addEventListener("change", () => {
      toggleTaskComplete(index);
    });
    taskList.append(listItem);
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

const blaskConfitte = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
