console.log(firebase)
let user_id = localStorage.getItem("uid")
let table = document.getElementById("tableData")


firebase.database().ref("/teacher").child(user_id).child("enrolled")
    .once("value")
    .then((getData) => {

        let data = getData.toJSON()
        data = Object.values(data)

        console.log(data)

        data.map((value) => {


            let tableRow = document.createElement("tr")

            let nameTable = document.createElement("td")
            nameTable.append(value.studentName)

            let emailTable = document.createElement("td")
            emailTable.append(value.studentEmail)

            let contectTable = document.createElement("td")
            contectTable.append(value.studentContect)

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


    })