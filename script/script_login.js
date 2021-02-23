let user = [{
    'name': 'Toby',
    'password': 'Tobynator', 
},{
    'name': 'Desi',
    'password': 'Hello', 
},{
    'name': 'Mohsan',
    'password': 'World', 
},{
    'name': 'Gast',
    'password': 'Gast123!', 
},
];



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
function login(i) {
    let loginSuccessful = false;
    for (let i = 0; i < user.length; i++) {
        if (username.value == user[i]['name'] && (password.value) == user[i]['password']) {
            loginSuccessful = true;
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