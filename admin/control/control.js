console.log(firebase)

let table = document.getElementById("table")
let editContent = document.getElementById("editContent")
let seleclted


const control = (e) => {

    console.log("onchange", e.value)
    seleclted = e.value
    firebase.database().ref(e.value)
        .once("value")
        .then((getData) => {

            let data = getData.toJSON()
            data = (Object.values(data))

            console.log(data.length)
            table.innerHTML = `<tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Contect</th>
            <th>Type</th>
          </tr>`

            data.map((key) => {

                let tableRow = document.createElement("tr")

                let nameTable = document.createElement("td")
                nameTable.append(key.user)

                let emailTable = document.createElement("td")
                emailTable.append(key.email)

                


                let passwordTable = document.createElement("td")
                passwordTable.append(key.password)


                let contectTable = document.createElement("td")
                contectTable.append(key.contect)



                let typeTable = document.createElement("td")
                typeTable.append(key.type)

                let buttonTableDel = document.createElement("td")

                let deletebtn = document.createElement("button")
                deletebtn.setAttribute("onclick", "deleteRow(this)")
                deletebtn.setAttribute("id", key.key)
                deletebtn.append("Delete")

                buttonTableDel.append(deletebtn)



                let editbtn = document.createElement("button")
                editbtn.setAttribute("onclick", "editRow(this)")
                editbtn.setAttribute("id", key.key)
                editbtn.append("Edit")

                buttonTableDel.append(editbtn)


                tableRow.append(nameTable)
                tableRow.append(emailTable)
                tableRow.append(passwordTable)
                tableRow.append(contectTable)
                tableRow.append(typeTable)
                tableRow.append(buttonTableDel)

                table.append(tableRow)
                // table.append(tableRow)
                console.log(tableRow)


                console.log(key.email)
            })

        })
        .catch((error) => {

            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage)
        })
}



const deleteRow = (e) => {
    console.log(e.id)
    firebase.database().ref(seleclted).child(e.id).remove()
}


const editRow = (e) => {
    console.log(e.id)
    firebase.database().ref(seleclted).child(e.id)
        .once("value")
        .then((getData) => {
            let data = getData.val()

            console.log(data.email)




            editContent.innerHTML = `
        <label for="Name"><b>Name</b></label>
        <input type="text" value="${data.user}"  id="name" required>
    
        <label for="email"><b>Email</b></label>
        <input type="text"  value="${data.email}"  id="email" required disabled>
    
        <label for="password"><b>Password</b></label>
        <input type="text" value="${data.password}"  id="password" disabled>
    
        <label for="contect"><b>Contect</b></label>
        <input type="text"  value="${data.contect}" id="contect" required>
    
        <button onclick="editDone(this)" id="${e.id}" > done </button>
      
        `






        })
        .catch((error) => {
            alert("error")
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage)
        });


}





const editDone = (e) => {

    let userName = document.getElementById("name")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let contect = document.getElementById("contect")

    firebase.database().ref(seleclted).child(e.id).update({
        user: userName.value,
        email: email.value,
        password: password.value,
        contect: contect.value
    })
    editContent.innerHTML = ""




    console.log(e.id)
}