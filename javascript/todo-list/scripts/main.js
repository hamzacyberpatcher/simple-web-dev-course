const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateTasks() {
    const tasksContainerElem = document.querySelector('.js-tasks-container');

    tasksContainerElem.innerHTML = '';

    tasks.forEach((task, i) => {
        tasksContainerElem.innerHTML += `<div class="task-container"><span class="task-name">${task.name}</span> <span class="task-date">${task.date}</span> <button class="remove-button" onclick="removeTask(${i})">Delete</button></div>`;
    })

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