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
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/**
 * This function gets the user name from the input and saves it in userName.
 */
function getName() {
    userName = regName.value;
}

/**
 * This function gets the user email from the input and saves it in userEmail.
 */
function getEmail() {
    userEmail = regEmail.value;
}

/**
 * This function gets the user phone number from the input and saves it in userPhoneNumber.
 */
function getPhoneNumber() {
    userPhoneNumber = regPhoneNumber.value;
}

/**
 * This function gets the user department from the input and saves it in userDepartment.
 */
function getDepartment() {
    userDepartment = regDepartment.value;
}

/**
 * This function gets the user position from the input and saves it in userPosition.
 */
function getPosition() {
    userPosition = regPosition.value;
}

/**
 * This function gets the user office from the input and saves it in userOffice.
 */
function getOffice() {
    userOffice = regOffice.value;
}

/**
 * This function gets the first user password from the input and saves it in userPassword1.
 */
function getPassword1() {
    userPassword1 = regPassword1.value;
}

/**
 * This function gets the second user password from the input and saves it in userPassword2.
 */
function getPassword2() {
    userPassword2 = regPassword2.value;
}

/**
 * This function gets the agb accepted info from the input and saves it in userAgbAccept.
 */
function getAgbAccept() {
    userAbgAccept = regAgbAccept.value;
}

/**
 * This function sets passwordError to true if the passwords don't match.
 */
function checkPassword() {
    if (userPassword1 != userPassword2) {
        passwordError = true;
    }
}

/**
 * This function saves a new user to the server.
 */
function addUser() {
    getUserInput();
    checkPassword();
    if (passwordError == false) {
        newUser = { 'name': userName, 'userPicture': 'profile.png', 'email': userEmail, 'phoneNumber': userPhoneNumber, 'department': userDepartment, 'position': userPosition, 'office': userOffice, 'password': userPassword1 };
        users.push(newUser);
        backend.setItem('users', JSON.stringify(users));
        alert('Profile created successfully!')
    } else {
        alert(`Passwords don't match!`);
    }
}

async function showUserPicture() {
    await init();
    let userImg = document.getElementById('userImg');
    let currentUserPosition
    currentUser = localStorage.getItem('currentUser');
    for (let i = 0; i < users.length; i++) {
        if (currentUser == users[i].name) {
            currentUserPosition = i;
        }
    }
    userImg.src = `../php/profiles/${users[currentUserPosition].userPicture}`;
}

/**
 * This function loads the user input from input fields.
 */
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
    if (taskCategory == 'Marketing') {
        categoryColor = 'orange';
    } else if (taskCategory == 'Product') {
        categoryColor = 'pink';
    } else if (taskCategory == 'Sale') {
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

/**
 * This function empties input fields.
 */
function cancelTask() {
    titleInput.value = '';
    dateInput.value = '';
    categoryInput.value = '';
    urgencyInput.value = '';
    descriptionInput.value = '';
}

/**
 * This function creates a new task and saves it on the server.
 */
async function addTask() {
    await init();
    getCurrentUserPosition();
    currentUserPosition = localStorage.getItem('currentUserPosition')
    getTitle();
    getDate();
    getCategory();
    getUrgency();
    getDescription();
    newTask = { 'name': users[currentUserPosition].name, 'email': users[currentUserPosition].email, 'title': taskTitle, 'date': taskDate, 'category': taskCategory, 'color': categoryColor, 'urgency': taskUrgency, 'description': taskDescription };
    tasks.push(newTask);
    backend.setItem('tasks', JSON.stringify(tasks));
    alert('Task added successfully!');
}

/**
 * This function gets the user position.
 */
async function getCurrentUserPosition() {
    await init();
    let currentUserPosition
    currentUser = localStorage.getItem('currentUser');
    for (let i = 0; i < users.length; i++) {
        if (currentUser == users[i].name) {
            currentUserPosition = i;
        }
    }
    localStorage.setItem('currentUserPosition', currentUserPosition);
}

/**
 * This function gets the user position and generates backlog cards with info about the task.
 */
async function showBacklogTasks() {
    await init();
    let backlogScreen = document.getElementById('backlogScreen');
    backlogScreen.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        backlogScreen.innerHTML += generateBacklogCardTemplate(i);
    }
}

/**
 * This function generates the html data for the backlog cards.
 * @param {number} taskPosition - This parameter is the position of the task in the json array "tasks".
 * @param {number} currentUserPosition - This parameter is the position of the user in the json array "users".
 */
function generateBacklogCardTemplate(taskPosition) {
    return `<div class="card"><div class="card-table-container"><div class="line-category color-${tasks[taskPosition].color}"></div>
            <div class="first-div-backlog">${tasks[taskPosition].name}<br>${tasks[taskPosition].email}</div><div class="second-div-backlog">${tasks[taskPosition].category}</div>
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
        return `<div id="to-do${position}" class="container-board" style="border-left: 12px solid ${tasks[taskPosition].color}" draggable="true" ondragstart="dragstart(event)">
    <div class="d-flex date-img-container">
    <div class="blue board-bold">${tasks[taskPosition].title}</div>
    <div class="dustbin" style="font-size: 10px"><img onclick="deleteTaskToDo('${position}')" height="20px" src="./../img/icons/trash.png"></div>
</div>
    <div>${tasks[taskPosition].category}</div>
    <div>${tasks[taskPosition].urgency}</div>
    <div class="date-img-container d-flex">
        <div class="date-board">${tasks[taskPosition].date}</div>
        
        <div><img class="img-board cursorpointer" id="goToInProgress${position}" onclick="goToInProgress('${position}')" src="./../img/icons/next.png"></div>
        <div><img class="img-board" src="./../img/icons/junge.png"></div>
    </div>
</div>
`;
    
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
        return `<div id="in-progress${position}" class="container-board d-none1" style="border-left: 12px solid ${tasks[taskPosition].color}" draggable="true" ondragstart="dragstart(event)">
    <div class="d-flex date-img-container">
    <div class="blue board-bold">${tasks[taskPosition].title}</div>
    <div class="dustbin" style="font-size: 10px"><img onclick="deleteTaskInProgress('${position}')" height="20px" src="./../img/icons/trash.png"></div>
</div>
    <div>${tasks[taskPosition].category}</div>
    <div>${tasks[taskPosition].urgency}</div>
    <div class="date-img-container d-flex">
        <div class="date-board">${tasks[taskPosition].date}</div>
        <div><img class="img-board cursorpointer" id="goBackToDo${position}" onclick="goBackToDo('${position}')" src="./../img/icons/previous.png"></div>
        <div><img class="img-board cursorpointer" id="goToTesting${position}" onclick="goToTesting('${position}')" src="./../img/icons/next.png"></div>
        <div><img class="img-board" src="./../img/icons/junge.png"></div>
    </div>
</div>
`;
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
        return `<div id="testing${position}" class="container-board d-none1" style="border-left: 12px solid ${tasks[taskPosition].color}" draggable="true" ondragstart="dragstart(event)">
    <div class="d-flex date-img-container">
    <div class="blue board-bold">${tasks[taskPosition].title}</div>
    <div class="dustbin" style="font-size: 10px"><img onclick="deleteTaskTesting('${position}')" height="20px" src="./../img/icons/trash.png"></div>
</div>
    <div>${tasks[taskPosition].category}</div>
    <div>${tasks[taskPosition].urgency}</div>
    <div class="date-img-container d-flex">
        <div class="date-board">${tasks[taskPosition].date}</div>
        <div><img class="img-board cursorpointer" id="goBackInProgress${position}" onclick="goBackInProgress('${position}')" src="./../img/icons/previous.png"></div>
        <div><img class="img-board cursorpointer" id="goToDone${position}" onclick="goToDone('${position}')" src="./../img/icons/next.png"></div>
        <div><img class="img-board" src="./../img/icons/junge.png"></div>
    </div>
</div>
`;
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
        return `<div id="done${position}" class="container-board d-none1" style="border-left: 12px solid ${tasks[taskPosition].color}" draggable="true" ondragstart="dragstart(event)">
    <div class="d-flex date-img-container">
    <div class="blue board-bold">${tasks[taskPosition].title}</div>
    <div class="dustbin" style="font-size: 10px"><img onclick="deleteTaskDone('${position}')" height="20px" src="./../img/icons/trash.png"></div>
</div>
    <div>${tasks[taskPosition].category}</div>
    <div>${tasks[taskPosition].urgency}</div>
    <div class="date-img-container d-flex">
        <div class="date-board">${tasks[taskPosition].date}</div>
        <div><img class="img-board cursorpointer" id="goBackToTesting${position}" onclick="goBackToTesting('${position}')" src="./../img/icons/previous.png"></div>
        <div><img class="img-board" src="./../img/icons/junge.png"></div>
    </div>
</div>
`;
}
async function showBoardTasks() {
    await init();
    showBoardTaskToDo();
    showBoardTaskInProgress();
    showBoardTaskTesting();
    showBoardTaskDone();
}
// Move to other board

async function goToInProgress(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('to-do' + position).classList.add('d-none1');
        document.getElementById('in-progress' + position).classList.remove('d-none1');
    }
}

async function goBackToDo(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('to-do' + position).classList.remove('d-none1');
        document.getElementById('in-progress' + position).classList.add('d-none1');
    }
}

async function goToTesting(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('testing' + position).classList.remove('d-none1');
        document.getElementById('in-progress' + position).classList.add('d-none1');
    }
}
async function goToDone(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('done' + position).classList.remove('d-none1');
        document.getElementById('testing' + position).classList.add('d-none1');
    }
}
async function goBackInProgress(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('in-progress' + position).classList.remove('d-none1');
        document.getElementById('testing' + position).classList.add('d-none1');
    }
}
async function goBackToTesting(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('done' + position).classList.add('d-none1');
        document.getElementById('testing' + position).classList.remove('d-none1');
    }
}
// delete task

async function deleteTaskToDo(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
    document.getElementById('to-do' + position).classList.add('d-none1');
}
}

async function deleteTaskInProgress(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
    document.getElementById('in-progress' + position).classList.add('d-none1');
}
}

async function deleteTaskTesting(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
    document.getElementById('testing' + position).classList.add('d-none1');
}
}

async function deleteTaskDone(position) {
    await init();
    for (let i = 0; i < tasks.length; i++) {
    document.getElementById('done' + position).classList.add('d-none1');
}
}
/**
 * This function displays the mobile overlay menu.
 */
function showOverlayMenu() {
    document.getElementById('overlay-menu').classList.remove('d-none');
}
/**
 * This function close the mobile overlay menu.
 */
function closeOverlayMenu() {
    document.getElementById('overlay-menu').classList.add('d-none');
}