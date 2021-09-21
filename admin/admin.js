console.log(firebase)
let user_id = localStorage.getItem("uid")
console.log(user_id)


let userName = document.getElementById("name")
let email = document.getElementById("email")
let password = document.getElementById("password")




firebase.database().ref("/admin")
.on("child_added", (getData) =>{

    let adminData =  getData.val()

    console.log(adminData)

    userName.value =  adminData.user
    email.value = adminData.email
    password.value = adminData.password   


})
