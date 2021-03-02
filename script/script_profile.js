let profile = document.getElementById('profile');

/**
 * This function gets the user position and generates the profile.
 */
async function showProfile() {
    await init();
    currentUser = localStorage.getItem('currentUser');
    profile.innerHTML = '';
    for(let i = 0; i < users.length; i++) {
        if(currentUser == users[i].name) {
            profile.innerHTML = profileTemplate(i);
        }
    }
}

/**
 * This function generates the html data for the profile.
 * @param {number} userPosition - This parameter is the user position of the users json array.
 */
function profileTemplate(userPosition) {
    return `<div class="profileItem"><span><b>Name:</b> ${users[userPosition].name}</span></div>
            <div class="profileItem"><span><b>Email:</b> ${users[userPosition].email}</span></div>
            <div class="profileItem"><span><b>Phone number:</b> ${users[userPosition].phoneNumber}</span></div>
            <div class="profileItem"><span><b>Department:</b> ${users[userPosition].department}</span></div>
            <div class="profileItem"><span><b>Position:</b> ${users[userPosition].position}</span></div>
            <div class="profileItem"><span><b>Office:</b> ${users[userPosition].office}</span></div>`;
}