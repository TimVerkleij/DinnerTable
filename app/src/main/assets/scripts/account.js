//? Open en sluit het scherm om userInfo te bewerken
function editInfo() {
    var editInfoDiv = document.getElementById("editInfoDiv")
    editInfoDiv.className = "editInfoDivVisible"
}

function closeEditInfo() {
    editInfoDiv.className = "editInfoDivInvisible"
}
//? Open en sluit het scherm om userInfo te bewerken //

var docRef = db.collection("userProfiles").doc(userID);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        db.collection("userProfiles").doc(userID)
        .onSnapshot(function(doc) {
        
        //get profile info from database
        
        
        })
    } else {
        console.log("No such document!");


        if (typeof Android != 'undefined') {
            //? console.log(userID, userEmail, userPhoto, userName)
        
            //create document for new user

            let userInfo = {
                Name: userName,
                Email: userEmail,
                Photo: userPhoto,
                ID: userID
            }
        
            let user = {
                [userID]: userInfo
            }
        
            function uploadData() {
                db.collection("userProfiles").doc(userID).set({
                    user
                }, { merge: true })
            }
        
            uploadData()
        }




    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


