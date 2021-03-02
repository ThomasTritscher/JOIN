let profile = document.getElementById('profile');

/**
 * This function gets the user position and generates the profile.
 */
async function showProfile() {
    await init();
    currentUser = localStorage.getItem('currentUser');
    profile.innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        if (currentUser == users[i].name) {
            profile.innerHTML = profileTemplate(i);
        }
    }
}

/**
 * This function generates the html data for the profile.
 * @param {number} userPosition - This parameter is the user position of the users json array.
 */
function profileTemplate(userPosition) {
    return `<form action="../php/uploadProfilePic.php" method="post" enctype="multipart/form-data">
        	    <div class="upload-elements"> 
                    <div id="buttonProfileSubmit" class="button-upload" onclick="getProfilePicture()">Select image</div>
    
                    <div class="upload"><input id="profilePicUpload" type="file" value="upload"
                    name="profilePicUpload" onchange="subProfile(this)"></div>
        
                    <input type="submit" class="button" value="Next">
                </div>
            </form>
            <div class="profileItem"><span><b>Name:</b> ${users[userPosition].name}</span></div>
            <div class="profileItem"><span><b>Email:</b> ${users[userPosition].email}</span></div>
            <div class="profileItem"><span><b>Phone number:</b> ${users[userPosition].phoneNumber}</span></div>
            <div class="profileItem"><span><b>Department:</b> ${users[userPosition].department}</span></div>
            <div class="profileItem"><span><b>Position:</b> ${users[userPosition].position}</span></div>
            <div class="profileItem"><span><b>Office:</b> ${users[userPosition].office}</span></div>`;
}

function getProfilePicture() {
    document.querySelector("#profilePicUpload").click();
}

function subProfile(obj) {
    let fileProfile = obj.value;
    let fileNameProfile = fileProfile.split("\\");
    let fileNameSaveProfile = document.querySelector("#profilePicUpload").files[0].name;
    document.querySelector("#buttonProfileSubmit").innerHTML = fileNameProfile[fileNameProfile.length - 1];
    setUpProfile(fileNameSaveProfile);
}

async function setUpProfile(fileNameSaveProfile) {
    await init();
    let currentUserPosition
    currentUser = localStorage.getItem('currentUser');
    for(let i = 0; i < users.length; i++) {
        if(currentUser == users[i].name) {
            currentUserPosition = i;
        }
    }
    users[currentUserPosition].userPicture = fileNameSaveProfile;
    backend.setItem('users', JSON.stringify(users));
}