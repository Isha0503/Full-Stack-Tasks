const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");
const progressCount = document.getElementById("progressCount");

const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];
let currentFilter = "all";


// Add Task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        taskInput.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        priority: priorityInput.value,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    renderTasks();
    taskInput.focus();
}


// Create Task Element
function createTaskElement(task) {

    const taskCard = document.createElement("article");
    taskCard.classList.add("task-card");

    if (task.completed) {
        taskCard.classList.add("completed");
    }


    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-check");
    checkbox.checked = task.completed;


    // Task Content
    const content = document.createElement("div");
    content.classList.add("task-content");


    // Task Name
    const taskName = document.createElement("p");
    taskName.classList.add("task-name");
    taskName.textContent = task.text;


    // Priority
    const priority = document.createElement("span");
    priority.classList.add("priority");
    priority.textContent = task.priority + " Priority";


    content.appendChild(taskName);
    content.appendChild(priority);


    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "✕";
    deleteButton.setAttribute("aria-label", "Delete task");


    // Complete Task
    checkbox.addEventListener("change", function () {

        task.completed = checkbox.checked;

        renderTasks();
    });


    // Delete Task
    deleteButton.addEventListener("click", function () {

        tasks = tasks.filter(function (item) {
            return item.id !== task.id;
        });

        renderTasks();
    });


    taskCard.appendChild(checkbox);
    taskCard.appendChild(content);
    taskCard.appendChild(deleteButton);

    return taskCard;
}


// Display Tasks
function renderTasks() {

    taskList.innerHTML = "";

    let visibleTasks = tasks;

    if (currentFilter === "active") {
        visibleTasks = tasks.filter(function (task) {
            return !task.completed;
        });
    }

    if (currentFilter === "completed") {
        visibleTasks = tasks.filter(function (task) {
            return task.completed;
        });
    }


    visibleTasks.forEach(function (task) {

        const taskElement = createTaskElement(task);

        taskList.appendChild(taskElement);
    });


    updateStats();

    if (visibleTasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// Update Statistics
function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const active = total - completed;

    totalTasks.textContent = total;
    activeTasks.textContent = active;
    completedTasks.textContent = completed;
    remainingTasks.textContent = active;


    // Progress Percentage
    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    progressCount.textContent = percentage + "%";
}


// Filter Tasks
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});


// Clear Completed Tasks
clearCompletedBtn.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    renderTasks();
});


// Button Click
addTaskBtn.addEventListener("click", addTask);


// Enter Key
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }
});


// Initial Display
renderTasks();