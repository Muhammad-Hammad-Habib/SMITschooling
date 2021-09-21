console.log(firebase)
let table = document.getElementById("tableData")

let user_id = localStorage.getItem("uid")




firebase.database().ref("teacher")
    .once("value")
    .then((getData) => {
        let data = getData.toJSON()
        data = Object.values(data)


        console.log(data)


        data.map((key) => {
            console.log(key.user)

            let tableRow = document.createElement("tr")

            let nameTable = document.createElement("td")
            nameTable.append(key.user)

            let emailTable = document.createElement("td")
            emailTable.append(key.email)

            let contectTable = document.createElement("td")
            contectTable.append(key.contect)

            let buttonTable = document.createElement("td")
            let enrollBtn = document.createElement("button")
            enrollBtn.setAttribute("id", key.key)
            enrollBtn.setAttribute("onclick", "enroll(this)")


            enrollBtn.append("Enroll")
            buttonTable.append(enrollBtn)


            // contectTable.append(key.contect)
            tableRow.append(nameTable)
            tableRow.append(emailTable)
            tableRow.append(contectTable)
            table.append(tableRow)
            tableRow.append(buttonTable)

        })
    })
    .catch((error) => {
        alert("error")
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage)
    });





const enroll = (e) => {



    let Key = firebase.database().ref("/teacher")
        .child(e.id)
        .child("enrolled")
        .push("heello").key

    console.log(Key)







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
                            firebase.database().ref("/teacher").child(e.id)
                                .child("enrolled")
                                .child(Key)
                                .set({
                                    studentName: data.user,
                                    studentEmail: data.email,
                                    studentContect: data.contect,
                                    key: Key,
                                    course: data.type,
                                    studentKey: data.key

                                })


                        }
                    })

            }
            else {

                firebase.database().ref("/teacher").child(e.id)
                    .child("enrolled")
                    .child(Key)
                    .set({
                        studentName: data.user,
                        studentEmail: data.email,
                        studentContect: data.contect,
                        key: Key,
                        course: data.type,
                    })

                let key2 = firebase.database().ref("/web_design")
                    .child(user_id)
                    .child("enrolledIn")
                    .push("teacher").key

                firebase.database().ref("/web_design")
                    .child(user_id)
                    .child("enrolledIn")
                    .child(key2)
                    .set({
                        teacherUid: e.id,
                        key: key2
                    })
            }
        })
        .catch((error) => {
            alert("error")
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage)
        });

}