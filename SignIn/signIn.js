let email = document.getElementById("email")
let password = document.getElementById("password")
console.log(email.value, password.value)

const signIn = () => {

    if (email.value == "" || password.value == "") {
        alert("Empty Email or Password")
    }

    else {
        // console.log(email.value,password.value)

        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .then((result) => {
                var user = result.user;
                console.log(user.uid)



                firebase.database().ref("/admin")
                    .orderByChild('key')
                    .equalTo(user.uid)
                    .once('value')
                    .then((getData) => {
                        let Data = getData.val()

                        if (Data == undefined || Data == null) {
                            firebase.database().ref("/teacher")
                                .orderByChild('key')
                                .equalTo(user.uid)
                                .once('value')
                                .then((getData) => {
                                    let Data = getData.val()

                                    if (Data == undefined || Data == null) {


                                        firebase.database().ref("/web_design")
                                            .orderByChild('key')
                                            .equalTo(user.uid)
                                            .once('value')
                                            .then((getData) => {
                                                let Data = getData.val()

                                                if (Data == undefined || Data == null) {

                                                    firebase.database().ref("/graphic_design")
                                                        .orderByChild('key')
                                                        .equalTo(user.uid)
                                                        .once('value')
                                                        .then((getData) => {
                                                            let Data = getData.val()

                                                            console.log("hello graphic_design ")
                                                            console.log(Data)
                                                            localStorage.setItem("uid", user.uid)

                                                            window.location.href = "../studentPanel/studentPanel.html"


                                                        })
                                                        .catch((error) => {
                                                            let errorMessage = error.Message
                                                            let errorcode = error.code

                                                            alert(errorMessage, errorcode)
                                                        })

                                                }
                                                else {
                                                    console.log("hello webdesign ")
                                                    console.log(Data)
                                                    localStorage.setItem("uid", user.uid)

                                                    window.location.href = "../studentPanel/studentPanel.html"

                                                }
                                            })
                                            .catch((error) => {
                                                let errorMessage = error.Message
                                                let errorcode = error.code
                                                console.log(errorMessage, errorcode)
                                            })


                                    }
                                    else {
                                        console.log("hello Teacher")
                                        console.log(Data)
                                        localStorage.setItem("uid", user.uid)

                                        window.location.href = "../teacherPanel/teacherPanel.html"
                                        

                                    }
                                })
                                .catch((error) => {
                                    let errorMessage = error.Message
                                    let errorcode = error.code
                                    console.log(errorMessage, errorcode)
                                })





                        }
                        else {
                            console.log("hello admin")
                            console.log(user.uid)

                            localStorage.setItem("uid", user.uid)
                            window.location.href = "../admin/admin.html"
                        }
                    })
                    .catch((error) => {
                        let errorMessage = error.Message
                        let errorcode = error.code
                        console.log(errorMessage, errorcode)
                    })



            })
            .catch((error) => {
                let errorMessage = error.Message
                let errorcode = error.code
                alert(errorMessage, errorcode)
            })
    }
}
