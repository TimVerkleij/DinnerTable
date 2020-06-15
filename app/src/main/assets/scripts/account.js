//? Open en sluit het scherm om userInfo te bewerken
function editInfo() {
    var editInfoDiv = document.getElementById("editInfoDiv")
    editInfoDiv.className = "editInfoDivVisible"
}

function closeEditInfo() {
    editInfoDiv.className = "editInfoDivInvisible"
}
//? Open en sluit het scherm om userInfo te bewerken //

var userProfileImage = document.getElementById("userPhoto")
var userNameField = document.getElementById("userName")
var userBirthdayField = document.getElementById("birthday")
var userEmailField = document.getElementById("userEmail")
var userAllergiesField = document.getElementById("allergies")
var userPreferencesField = document.getElementById("preferences")

var editUserPhoto = document.getElementById("editUserPhoto")
var editName = document.getElementById("editName")
var editEmail = document.getElementById("editEmail")
var editBirthDay = document.getElementById("editBirthDay")
var editAllergies = document.getElementById("editAllergies")
var editPreferences = document.getElementById("editPreferences")

var docRef = db.collection("userProfiles").doc(userID);

docRef.get().then(function(doc) {
    if (doc.exists) {
        db.collection("userProfiles").doc(userID)
            .onSnapshot(function(doc) {

                //get profile info from database
                userInfo = doc.data().userInfo





                var userPhoto = userInfo.Photo
                var userName = userInfo.Name
                var userBirthday = moment(userInfo.Birthday.toDate()).format("D MMMM YYYY")
                var userEmail = userInfo.Email
                var userAllergies = userInfo.Allergies
                var userPreferences = userInfo.Preferences

                if (userAllergies == "") {
                    userAllergies = "Geen"
                }
                if (userPreferences == "") {
                    userPreferences = "Geen"
                }

                userProfileImage.src = userPhoto
                userNameField.innerHTML = userName
                userBirthdayField.innerHTML = userBirthday
                userEmailField.innerHTML = userEmail
                userAllergiesField.innerHTML = userAllergies
                userPreferencesField.innerHTML = userPreferences

                editUserPhoto.src = userPhoto
                editName.value = userName
                editBirthDay.value = moment(userInfo.Birthday.toDate()).format("YYYY-MM-DD")
                editEmail.value = userEmail
                editAllergies.value = userAllergies
                editPreferences.value = userPreferences

            })
    } else {


        if (typeof Android != 'undefined') {

            //create document for new user

            userProfileImage.src = userPhoto
            userNameField.innerHTML = userName
            userEmailField.innerHTML = userEmail

            editUserPhoto.src = userPhoto
            editName.value = userName
            editEmail.value = userEmail
                // editAllergies.value = "test"
                // editPreferences.value = "test"


            let userInfo = {
                Name: userName,
                Email: userEmail,
                Photo: userPhoto,
                ID: userID
            }

            // let user = {
            //     [userID]: userInfo
            // }

            function uploadData() {
                db.collection("userProfiles").doc(userID).set({
                    userInfo
                }, { merge: true })
            }

            uploadData()
        }




    }
}).catch(function(error) {
    console.error("Error getting document:", error);
});


function allergiesInfo() {
    document.getElementById("darkBackground").style.display = "block"
    document.getElementById("infoDivAllergies").style.display = "block"
}

function preferenceInfo() {
    document.getElementById("darkBackground").style.display = "block"
    document.getElementById("infoDivPreferences").style.display = "block"

}

function exitDarkBackground() {
    document.getElementById("darkBackground").style.display = "none"
    document.getElementById("infoDivAllergies").style.display = "none"
    document.getElementById("infoDivPreferences").style.display = "none"
}