let tasks = [];
let taskTitle;
let taskDate;
let taskCategory;
let taskUrgency;
let taskDescription;
let categoryColor;
let titleInput = document.getElementById('title-input');
let dateInput = document.getElementById('date-input');
let categoryInput = document.getElementById('category-input');
let urgencyInput = document.getElementById('urgency-input');
let descriptionInput = document.getElementById('description-input');

setURL('http://server-58.developerakademie.com/JOIN/backend');

/**
 * This function sets margin-right of the lineNav element to 8px and the width of lineNav to 6px.
 * @param {number} lineNumber - This is the number of the navigation element.
 */
function navItemMove(lineNumber) {
    let lineNavigation = document.getElementById('lineNav' + lineNumber);
    lineNavigation.style.marginRight = '8px'; 
    lineNavigation.style.width = '6px';  
}

/**
 * This function sets margin-right of the lineNav element to 32px and the width of lineNav to 0px.
 * @param {number} lineNumber - This is the number of the navigation element.
 */
function navItemEnd(lineNumber) {
    let lineNavigation = document.getElementById('lineNav' + lineNumber);
    lineNavigation.style.marginRight = '32px';
    lineNavigation.style.width = '0px';    
}

/**
 * This function downloads data from server.
 */
async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/**
 * This function gets the title from the input and saves it in taskTitle.
 */
function getTitle() {
    taskTitle = titleInput.value;
}

/**
 * This function gets the date from the input and saves it in taskDate.
 */
function getDate() {
    taskDate = dateInput.value; 
}

/**
 * This function gets the category from the input and saves it in taskCategory.
 */
function getCategory() {
    taskCategory = categoryInput.value;
    if(taskCategory == 'Marketing') {
        categoryColor = 'orange';
    } else if(taskCategory == 'Product') {
        categoryColor = 'pink';
    } else if(taskCategory == 'Sale') {
        categoryColor = 'green';
    }
}

/**
 * This function gets the urgency from the input and saves it in taskUrgency.
 */
function getUrgency() {
    taskUrgency = urgencyInput.value; 
}

/**
 * This function gets the description from the input and saves it in taskDescription.
 */
function getDescription() {
    taskDescription = descriptionInput.value; 
}

function cancelTask() {
    alert('Clear input fields!');
}

async function addTask() {
    await init();
    getTitle();
    getDate();
    getCategory();
    getUrgency();
    getDescription();
    newTask = {'title': taskTitle, 'date': taskDate, 'category': taskCategory, 'color': categoryColor, 'urgency': taskUrgency, 'description': taskDescription};
    tasks.push(newTask);
    backend.setItem('tasks', JSON.stringify(tasks));
}

async function showBacklogTasks() {
    await init();
    let backlogScreen = document.getElementById('backlogScreen');
    backlogScreen.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        backlogScreen.innerHTML += generateBacklogCardTemplate(i);
    }
}

function generateBacklogCardTemplate(taskPosition) {
    return `<div class="card"><div class="card-table-container"><div class="line-category color-${tasks[taskPosition].color}"></div>
            <div class="first-div-backlog">Name<br> Email</div><div class="second-div-backlog">${tasks[taskPosition].category}</div>
            <div class="third-div-backlog">${tasks[taskPosition].description}</div></div></div>`
}

// This function generate board tasks

async function showBoardTasks() {

    await init();
    let pushboardToDo = document.getElementById('pushboard-to-do');
    pushboardToDo.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        pushboardToDo.innerHTML += generateBoardToDo();
    }
}

function generateBoardToDo(taskPosition) {
    return `<div>${tasks[taskPosition].taskTitle}</div>`
}