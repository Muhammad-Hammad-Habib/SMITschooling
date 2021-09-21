console.log(firebase)
let user_id = localStorage.getItem("uid")
let table = document.getElementById("tableData")


firebase.database().ref("/web_design").child(user_id)
    .once("value")
    .then((getData) => {
        let data = getData.val()


        if (data == null || data == undefined) {
            firebase.database().ref("/graphic_design").child(user_id)
                .once("value")
                .then((getData) => {
                    let data = getData.val()

                    if (data == null || data == undefined) {
                        alert("check other")
                    }
                    else {
                        console.log(data)

                        userName.value = data.user
                        email.value = data.email
                        password.value = data.password
                        type.value = data.type
                    }
                })

        }
        else {

            firebase.database().ref("/web_design")
                .child(user_id)
                .child("enrolledIn")
                .once("value")
                .then((getData) => {

                    let data = getData.toJSON()

                    data = Object.values(data)


                    data.map((value) => {

                        firebase.database().ref("/teacher").child(value.teacherUid)
                            .once("value")
                            .then((getData) => {
                                let data = getData.val()
                                // data = Object.values(data)
                                console.log(data)

                                let tableRow = document.createElement("tr")

                                let nameTable = document.createElement("td")
                                nameTable.append(data.user)

                                let emailTable = document.createElement("td")
                                emailTable.append(data.email)

                                let contectTable = document.createElement("td")
                                contectTable.append(data.contect)

                                let courseTable = document.createElement("td")
                                courseTable.append("web design")



                                // contectTable.append(key.contect)
                                tableRow.append(nameTable)
                                tableRow.append(emailTable)
                                tableRow.append(contectTable)
                                tableRow.append(courseTable)
                                table.append(tableRow)
                                // tableRow.append(buttonTable)







                            })
                        console.log(value.teacherUid)
                    })
                    console.log(data)











                })

                .catch((error) => {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                    console.log(errorCode, errorMessage)
                });




        }
    })
    .catch((error) => {

        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage)
    });