var addBtn = document.getElementById("addBtn")

function getUpdate() {
  var text = document.getElementById("addTxt").value
  var title = document.getElementById("title").value
  if(text ==="" && title === ""){
    swal("ERROR", "Please Enter Values!", "error");

  }else{
    firebase.database().ref('todos').push({
      title: title,
      text: text
    })
    swal("Good job!", "Your Todo has been added!", "success");
    text = "";
    title = "";
  }

  
}

firebase.database().ref('todos').on('child_added', (data) => {
 let notes = document.getElementById("notes")
  notes.innerHTML +=
    `  <div class="div" class="my-2 mx-3 card" style="width: 19rem;">
        <div class="card-body">
        <h4 class="card-text">  <input id="${data.key}title" class="input" type="text" value="${data.val().title}" disabled class="form-control"> </h4>
        <p class="card-text"><textarea name="" id="${data.key}text" class="input" disabled cols="19" rows="5">${data.val().text}</textarea></p>
          <button onclick="deleteTodo('${data.key}')"  id="delete" class="btn btn-primary">Delete</button>
          <button onclick="edit('${data.key}')"  id="${data.key}" class="btn btn-primary my-3">EDIT</button>
          <button style="display: none;" onclick="updates('${data.key}')"  id="${data.key}update" class="btn btn-primary my-3">Update</button>
        
        </div>
      </div>`

})

let deleteAll = ()=>{
  firebase.database().ref(`todos`).remove()
  notes.innerHTML ="";
  
}

let deleteTodo = (key)=>{
    
  firebase.database().ref(`todos/${key}`).remove()
  event.target.parentNode.remove()

}




function edit (id){
    let title = document.getElementById(`${id}title`)
    let text = document.getElementById(`${id}text`)
    let btn = document.getElementById(id)
    let update = document.getElementById(`${id}update`)
    btn.style.display = "none"
    update.style.display = "block"
    text.disabled = false
    title.disabled = false    
}
let updates = (id)=>{
  let title = document.getElementById(`${id}title`)
  let text = document.getElementById(`${id}text`)
  let btn = document.getElementById(id)
    let update = document.getElementById(`${id}update`)
  firebase.database().ref(`todos/${id}`).update({title:title.value,text:text.value}).then(()=>{
    text.disabled = true
    title.disabled = true
    btn.style.display = "block"
    update.style.display = "none"
  })
}


