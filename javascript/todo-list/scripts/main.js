const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const addButton = document.querySelector('.js-add');
addButton.addEventListener('click', () => addTask());

function updateTasks() {
    const tasksContainerElem = document.querySelector('.js-tasks-container');

    tasksContainerElem.innerHTML = '';

    tasks.forEach((task, i) => {
        const { name, date } = task;
        tasksContainerElem.innerHTML += `<div class="task-container"><span class="task-name">${name}</span> <span class="task-date">${date}</span> <button class="remove-button js-remove-button">Delete</button></div>`;
    })

    document.querySelectorAll('.js-remove-button').forEach(
        (buttonElem, index) => {
            buttonElem.addEventListener('click', () => removeTask(index));
        }
    )
}

function addTask() {
    const task = {
        name: '',
        date: ''
    };

    const nameElem = document.querySelector('.js-input-name');
    const dateElem = document.querySelector('.js-input-date');

    if (nameElem.value === '' || dateElem.value === '') return;
    
    task.name = nameElem.value;
    task.date = dateElem.value;



    tasks.push(task);

    nameElem.value = '';
    dateElem.value = '';

    localStorage.setItem('tasks', JSON.stringify(tasks));

    updateTasks();
}

function removeTask(i) {
    tasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTasks();
}

updateTasks();