let currentUser;

setURL('http://server-58.developerakademie.com/JOIN/backend');


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