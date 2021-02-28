let currentUser;

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
 * This function compares the username with the password from the Json Array
 */
async function login(i) {
    await init();
    let loginSuccessful = false;
    for (let i = 0; i < users.length; i++) {
        if (username.value == users[i]['name'] && (password.value) == users[i]['password']) {
            loginSuccessful = true;
            currentUser = users[i]['name'];
            localStorage.setItem('currentUser', currentUser);
        }
    }
    if (loginSuccessful) { 
        window.location.href = '../sites/add_task.html';
    } else {
        alert('Das Passwort ist leider falsch');
    }
}
function myFunction() {
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }