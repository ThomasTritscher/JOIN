let tasks = [];
let taskTitle;
let taskDate;
let taskCategory;
let taskUrgency;
let taskDescription;

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
    users = JSON.parse(backend.getItem('users')) || [];
    userDatabase = JSON.parse(backend.getItem('userDatabase')) || [];
}

/**
 * This function gets the title from the input and saves it in taskTitle.
 */
function getTitle() {
    let titleInput = document.getElementById('title-input');
    taskTitle = titleInput.value;
}

/**
 * This function gets the date from the input and saves it in taskDate.
 */
function getDate() {
    let dateInput = document.getElementById('date-input');
    taskDate = dateInput.value; 
}

/**
 * This function gets the category from the input and saves it in taskCategory.
 */
function getCategory() {
    let categoryInput = document.getElementById('category-input');
    taskCategory = categoryInput.value; 
}

/**
 * This function gets the urgency from the input and saves it in taskUrgency.
 */
function getUrgency() {
    let urgencyInput = document.getElementById('urgency-input');
    taskUrgency = urgencyInput.value; 
}

/**
 * This function gets the description from the input and saves it in taskDescription.
 */
function getDescription() {
    let descriptionInput = document.getElementById('description-input');
    taskDescription = descriptionInput.value; 
}

function cancelTask() {
    alert('Clear input fields!');
}

function addTask() {
    alert('Save task to server');
}