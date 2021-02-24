let tasks = [];
let taskTitle;
let taskDate;
let taskCategory;
let taskUrgency;
let taskDescription;
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

function addTask() {
    getTitle();
    getDate();
    getCategory();
    getUrgency();
    getDescription();
    newTask = {'title': taskTitle, 'date': taskDate, 'category': taskCategory, 'urgency': taskUrgency, 'description': taskDescription};
    tasks.push(newTask);
    backend.setItem('tasks', JSON.stringify(tasks));
}