const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskContainer = document.getElementById("taskContainer");

const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");

let tasks = [];

//Add task
addBtn.addEventListener("click", addTask);

function addTask(){
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    //Craete Task Object
    const task ={
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    taskInput.value = "";

    renderTasks();
}

//Render tasks to DOM
function renderTasks(filter = "all") {
    taskContainer.innerHTML = "";

    tasks.forEach(task => {
        //Filter logic 
        if (filter === "active" && task.completed) return;
        if (filter === "completed" && !task.completed) return;

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-item");

        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        taskDiv.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button class="toggle-btn">✔</button>
            <button class="delete-btn">✗</button>
        </div>
        `;

        // Toggle
        taskDiv.querySelector(".toggle-btn").addEventListener("click", () => {
            toggleTask(task.id);
        });

        // Delete
        taskDiv.querySelector(".delete-btn").addEventListener("click", () => {
            deleteTask(task.id);
        });

        taskContainer.appendChild(taskDiv);
    });

    // Toggle task
    function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
        return { ...task, completed: !task.completed };
        }
        return task;
    });

    renderTasks();
    }

    // Delete task
    function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    }

    // Filters
    filterAll.addEventListener("click", () => renderTasks("all"));
    filterActive.addEventListener("click", () => renderTasks("active"));
    filterCompleted.addEventListener("click", () => renderTasks("completed"));
}