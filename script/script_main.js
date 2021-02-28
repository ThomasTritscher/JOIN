let tasks = [];
let users = [];
let taskTitle;
let taskDate;
let taskCategory;
let taskUrgency;
let taskDescription;
let categoryColor;
let userName;
let userEmail;
let userPhoneNumber;
let userDepartment;
let userPosition;
let userOffice;
let userPassword1;
let userPassword2;
let userAbgAccept;
let titleInput = document.getElementById('title-input');
let dateInput = document.getElementById('date-input');
let categoryInput = document.getElementById('category-input');
let urgencyInput = document.getElementById('urgency-input');
let descriptionInput = document.getElementById('description-input');
let regName = document.getElementById('regName');
let regEmail = document.getElementById('regEmail');
let regPhoneNumber = document.getElementById('regPhoneNumber');
let regDepartment = document.getElementById('regDepartment');
let regPosition = document.getElementById('regPosition');
let regOffice = document.getElementById('regOffice');
let regPassword1 = document.getElementById('regPassword1');
let regPassword2 = document.getElementById('regPassword2');
let regAgbAccept = document.getElementById('regAgbAccept');
let passwordError = false;

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
    if(users.length > 0) {
        tasks = JSON.parse(backend.getItem('tasks')) || [];
    }
}

function getName() {
    userName = regName.value;
}

function getEmail() {
    userEmail = regEmail.value;
}

function getPhoneNumber() {
    userPhoneNumber = regPhoneNumber.value;
}

function getDepartment() {
    userDepartment = regDepartment.value;
}

function getPosition() {
    userPosition = regPosition.value;
}

function getOffice() {
    userOffice = regOffice.value;
}

function getPassword1() {
    userPassword1 = regPassword1.value;
}

function getPassword2() {
    userPassword2 = regPassword2.value;
}

function getAgbAccept() {
    userAbgAccept = regAgbAccept.value;
}

function checkPassword() {
    if(userPassword1 != userPassword2) {
        passwordError = true;
    }
}

function addUser() {
    getUserInput();
    checkPassword();
    if(passwordError == false) {
        newUser = {'name': userName, 'email': userEmail, 'phoneNumber': userPhoneNumber, 'department': userDepartment, 'position': userPosition, 'office': userOffice, 'password': userPassword1};
        users.push(newUser);
        backend.setItem('users', JSON.stringify(users));
        alert('Profile created successfully!')
    } else {
        alert(`Passwords don't match!`);
    }
}

function getUserInput() {
    getName();
    getEmail();
    getPhoneNumber();
    getDepartment();
    getPosition();
    getOffice();
    getPassword1();
    getPassword2();
    getAgbAccept();
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
    titleInput.value = '';
    dateInput.value = '';
    categoryInput.value = '';
    urgencyInput.value = '';
    descriptionInput.value = '';
}

function addTask() {
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

async function showBoardTaskToDo() {

    await init();
    let pushboardToDo = document.getElementById('pushboard-to-do');
    pushboardToDo.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        pushboardToDo.innerHTML += generateBoardToDo(i);
    }
}

function generateBoardToDo(taskPosition) {
    return `<div class="container-board" style="border-left: 12px solid ${tasks[taskPosition].color}" draggable="true" ondragstart="dragstart(event)">
    <div class="d-flex date-img-container">
    <div class="blue board-bold">${tasks[taskPosition].title}</div>
    <div class="dustbin" style="font-size: 10px" onclick="deleteTask(1)"><img height="32px" src="./../img/icons/trash.png"></div>
</div>
    <div>${tasks[taskPosition].category}</div>
    <div>${tasks[taskPosition].urgency}</div>
    <div class="date-img-container d-flex">
        <div class="date-board">${tasks[taskPosition].date}</div>
        
        <div><img class="img-board cursorpointer" onclick="goToInProgress()" src="./../img/icons/next.png"></div>
        <div><img class="img-board" src="./../img/icons/junge.png"></div>
    </div>
</div>
`
}
async function showBoardTaskInProgress() {

    await init();
    let pushboardInProgress = document.getElementById('pushboard-in-progress');
    pushboardInProgress.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        pushboardInProgress.innerHTML += generateBoardInProgress(i);
    }
}

function generateBoardInProgress(taskPosition) {
    return `<div class="container-board" style="border-left: 12px solid ${tasks[taskPosition].color}" draggable="true" ondragstart="dragstart(event)">
    <div class="d-flex date-img-container">
    <div class="blue board-bold">${tasks[taskPosition].title}</div>
    <div class="dustbin" style="font-size: 10px" onclick="deleteTask(1)"><img height="32px" src="./../img/icons/trash.png"></div>
</div>
    <div>${tasks[taskPosition].category}</div>
    <div>${tasks[taskPosition].urgency}</div>
    <div class="date-img-container d-flex">
        <div class="date-board">${tasks[taskPosition].date}</div>
        <div><img class="img-board cursorpointer" onclick="goBackToDo()" src="./../img/icons/previous.png"></div>
        <div><img class="img-board cursorpointer" onclick="goToTesting()" src="./../img/icons/next.png"></div>
        <div><img class="img-board" src="./../img/icons/junge.png"></div>
    </div>
</div>
`
}
async function showBoardTaskTesting() {

    await init();
    let pushboardTesting = document.getElementById('pushboard-testing');
    pushboardTesting.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        pushboardTesting.innerHTML += generateBoardTesting(i);
    }
}
function generateBoardTesting(taskPosition) {
    return `<div class="container-board" style="border-left: 12px solid ${tasks[taskPosition].color}" draggable="true" ondragstart="dragstart(event)">
    <div class="d-flex date-img-container">
    <div class="blue board-bold">${tasks[taskPosition].title}</div>
    <div class="dustbin" style="font-size: 10px" onclick="deleteTask(1)"><img height="32px" src="./../img/icons/trash.png"></div>
</div>
    <div>${tasks[taskPosition].category}</div>
    <div>${tasks[taskPosition].urgency}</div>
    <div class="date-img-container d-flex">
        <div class="date-board">${tasks[taskPosition].date}</div>
        <div><img class="img-board cursorpointer" onclick="goBackInProgress()" src="./../img/icons/previous.png"></div>
        <div><img class="img-board cursorpointer" onclick="goToDone()" src="./../img/icons/next.png"></div>
        <div><img class="img-board" src="./../img/icons/junge.png"></div>
    </div>
</div>
`
}
async function showBoardTaskDone() {

    await init();
    let pushboardDone = document.getElementById('pushboard-done');
    pushboardDone.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        pushboardDone.innerHTML += generateBoardDone(i);
    }
}
function generateBoardDone(taskPosition) {
    return `<div class="container-board" style="border-left: 12px solid ${tasks[taskPosition].color}" draggable="true" ondragstart="dragstart(event)">
    <div class="d-flex date-img-container">
    <div class="blue board-bold">${tasks[taskPosition].title}</div>
    <div class="dustbin" style="font-size: 10px" onclick="deleteTask(1)"><img height="32px" src="./../img/icons/trash.png"></div>
</div>
    <div>${tasks[taskPosition].category}</div>
    <div>${tasks[taskPosition].urgency}</div>
    <div class="date-img-container d-flex">
        <div class="date-board">${tasks[taskPosition].date}</div>
        <div><img class="img-board cursorpointer" onclick="goBackToTesting()" src="./../img/icons/previous.png"></div>
        <div><img class="img-board" src="./../img/icons/junge.png"></div>
    </div>
</div>
`
}

async function showBoardTasks() {
    await init();
    showBoardTaskToDo();
    showBoardTaskInProgress();
    showBoardTaskTesting();
    showBoardTaskDone();
}

async function goToInProgress() {
    await init();
    document.getElementById('pushboard-to-do').classList.add('d-none1');
    document.getElementById('pushboard-in-progress').classList.remove('d-none1');
}

async function goBackToDo() {
    await init();
    document.getElementById('pushboard-to-do').classList.remove('d-none1');
    document.getElementById('pushboard-in-progress').classList.add('d-none1');
}

async function goToTesting() {
    await init();
    document.getElementById('pushboard-testing').classList.remove('d-none1');
    document.getElementById('pushboard-in-progress').classList.add('d-none1');
}

async function goToDone() {
    await init();
    document.getElementById('pushboard-done').classList.remove('d-none1');
    document.getElementById('pushboard-testing').classList.add('d-none1');
}

async function goBackInProgress() {
    await init();
    document.getElementById('taskInProgress').classList.remove('d-none1');
    document.getElementById('pushboard-testing').classList.add('d-none1');
}

async function goBackToTesting() {
    await init();
    document.getElementById('pushboard-done').classList.add('d-none1');
    document.getElementById('pushboard-testing').classList.remove('d-none1');
}
