document.addEventListener("DOMContentLoaded", function() {
    const taskModal = document.getElementById('task-modal');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const modalTitle = document.getElementById('modal-title');
    const taskIdInput = document.getElementById('task-id');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskDueDateInput = document.getElementById('task-due-date');
    const closeBtn = document.querySelector('.close-btn');
    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p><strong>Due Date:</strong> ${task.dueDate}</p>
                <div class="task-actions">
                    <button class="edit-btn" data-task-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-task-id="${task.id}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function addTask(task) {
        task.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
        tasks.push(task);
        renderTasks();
        closeModal();
    }

    function editTask(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            modalTitle.textContent = 'Edit Task';
            taskIdInput.value = task.id;
            taskTitleInput.value = task.title;
            taskDescriptionInput.value = task.description;
            taskDueDateInput.value = task.dueDate;
            taskModal.style.display = 'block';
        }
    }

    function updateTask(updatedTask) {
        const index = tasks.findIndex(t => t.id === updatedTask.id);
        if (index > -1) {
            tasks[index] = updatedTask;
            renderTasks();
            closeModal();
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    }

    function closeModal() {
        taskModal.style.display = 'none';
        taskForm.reset();
        modalTitle.textContent = 'Add Task';
        taskIdInput.value = '';
    }

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const id = taskIdInput.value;
        const title = taskTitleInput.value;
        const description = taskDescriptionInput.value;
        const dueDate = taskDueDateInput.value;
        const task = { id: id ? parseInt(id) : null, title, description, dueDate };

        if (id) {
            updateTask(task);
        } else {
            addTask(task);
        }
    });

    addTaskBtn.addEventListener('click', function() {
        taskModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    window.onclick = function(event) {
        if (event.target == taskModal) {
            closeModal();
        }
    }

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const taskId = parseInt(event.target.dataset.taskId);
            editTask(taskId);
        } else if (event.target.classList.contains('delete-btn')) {
            const taskId = parseInt(event.target.dataset.taskId);
            deleteTask(taskId);
        }
    });

    renderTasks();
});
