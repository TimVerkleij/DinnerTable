var editUserPhoto = document.getElementById("editUserPhoto")
var editName = document.getElementById("editName")
var editEmail = document.getElementById("editEmail")
var editBirthDay = document.getElementById("editBirthDay")
var editAllergies = document.getElementById("editAllergies")
var editPreferences = document.getElementById("editPreferences")




function saveAccount() {
    if (editBirthDay.value != "") {
        console.log(editUserPhoto.src)
        console.log(editName.value)
        console.log(editEmail.value)
        console.log(editBirthDay.value)
        console.log(editAllergies.value)
        console.log(editPreferences.value)

        // var Birthday = firebase.firestore.Timestamp.fromDate(new Date(editBirthDay.value))
        var Birthday = new Date(editBirthDay.value)


        let userInfo = {
            Name: editName.value,
            Email: editEmail.value,
            Photo: editUserPhoto.src,
            Birthday: Birthday,
            Allergies: editAllergies.value,
            Preferences: editPreferences.value
        }

        function uploadData() {
            db.collection("userProfiles").doc(userID).set({
                userInfo
            }, { merge: true })
        }

        uploadData()
        // loadUserInfo()

        var editInfoDiv = document.getElementById("editInfoDiv")
        editInfoDiv.className = "editInfoDivInvisible"
    } else {
        var errorMessage = document.getElementById("errorMessage")
        errorMessage.style.display = "block"
    }
}