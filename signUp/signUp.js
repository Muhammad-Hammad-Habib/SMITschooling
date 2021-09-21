console.log(firebase)




let userName = document.getElementById("name")
let email = document.getElementById("email")
let password = document.getElementById("password")
let contect = document.getElementById("contect")
let type = document.getElementById("type")






const register = () => {

    if (userName == "" || email == "" || password == "" || contect == "" || type == "") {
        alert("Please Enter Complete Information")
    }
    else {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((snap) => {
                var user = snap.user;
                let data = {
                    user: userName.value,
                    email: email.value,
                    password: password.value,
                    type: type.value,
                    contect : contect.value,
                    key: user.uid
                }
                firebase.database().ref(`${type.value}`).child(user.uid).set(data)
               alert("Registered")
            })
            .catch((error) => {
                alert("error")
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage)
            });
    }
}