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
var userEmailField = document.getElementById("userEmail")

var editUserPhoto = document.getElementById("editUserPhoto")
var editName = document.getElementById("editName")
var editEmail = document.getElementById("editEmail")
var editBirthDay = document.getElementById("editBirthDay")
var editAllergies = document.getElementById("editAllergies")
var editPreferences = document.getElementById("editPreferences")

// editName.value = "test"
// editEmail.value = "test"
// editAllergies.value = "test"
// editPreferences.value = "test"

var docRef = db.collection("userProfiles").doc(userID);

docRef.get().then(function(doc) {
    if (doc.exists) {
        db.collection("userProfiles").doc(userID)
            .onSnapshot(function(doc) {

                //get profile info from database

                userInfo = doc.data().userInfo

                var userPhoto = userInfo.Photo
                var userName = userInfo.Name
                var userEmail = userInfo.Email

                userProfileImage.src = userPhoto
                userNameField.innerHTML = userName
                userEmailField.innerHTML = userEmail

                editUserPhoto.src = userPhoto
                editName.value = userName
                editEmail.value = userEmail

            })
    } else {
        console.log("No such document!");


        if (typeof Android != 'undefined') {
            // console.log(userID, userEmail, userPhoto, userName)

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
    console.log("Error getting document:", error);
});