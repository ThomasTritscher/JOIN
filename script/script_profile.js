let profile = document.getElementById('profile');

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

function profileTemplate(userPosition) {
    return `<div class="profileItem"><span><b>Name:</b> ${users[userPosition].name}</span></div>
            <div class="profileItem"><span><b>Email:</b> ${users[userPosition].email}</span></div>
            <div class="profileItem"><span><b>Phone number:</b> ${users[userPosition].phoneNumber}</span></div>
            <div class="profileItem"><span><b>Department:</b> ${users[userPosition].department}</span></div>
            <div class="profileItem"><span><b>Position:</b> ${users[userPosition].position}</span></div>
            <div class="profileItem"><span><b>Office:</b> ${users[userPosition].office}</span></div>`;
}