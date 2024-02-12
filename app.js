const ınput = document.querySelector("#ınput")
const listGroup = document.querySelector("#list-group")
const button = document.querySelector("#button");
const list = document.querySelectorAll(".list-group-item");
const hWrapper = document.querySelector(".header-wrapper")
const clearButton = document.querySelector("#clearButton");
const search = document.querySelector("#search");

todos = []

run()

function run() {
  button.addEventListener("click", write)
  document.addEventListener("DOMContentLoaded", localStorageWriteList);
  listGroup.addEventListener("click", listGroupClear)
  search.addEventListener("keyup", filter)
  clearButton.addEventListener("click", allRemove)

}


/*

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display : block");
            } else {
                todo.setAttribute("style", "display : none  !important");
            }
        })

    } else {
        showAlert("warning", "filtreleme yapılması içim en az bir todo gereklidir")
    }
}

*/

function allRemove() {
  const sonuc = confirm("Hepsini silmek istediğinize eminmisiniz")
  const ligroup = document.querySelectorAll("#ligroup");
  if (sonuc == true) {
    ligroup.forEach((todo) => {
      todo.remove();
      todos = [];
      localStorage.setItem("todos", todos);
      localStorage.clear();

    })
  }
}

function filter(e) {
  filterValue = e.target.value.toLowerCase().trim();
  const ligroup = document.querySelectorAll("#ligroup");
  if (ligroup.length > 0) {
    ligroup.forEach((todo) => {
      console.log(ligroup)
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display : block");
      } else {
        todo.setAttribute("style", "display:none !important")
      }

    })
  } else {

  }
}

function localStorageWriteList() {
  checkLocalStorage();
  todos.forEach((todo) => {
    writeList(todo);
  })
}



function write(e) {
  const ınputText = ınput.value.trim();
  if (ınputText == "" || ınputText.lenth < 0) {
    showAlert("primary", "lüften en az bir todo ekleyin")
  } else {
    // arayüze ekleme
    writeList(ınputText);
    // locale ekleme
    writeLocalStorage(ınputText);

  }
  e.preventDefault()
}

function listGroupClear(e) {
  if (e.target.id == "icon") {
    // console.log(e.target.className)
    let icon = e.target.parentElement;
    icon.remove();
    removeLocalStorage(icon.textContent);
    showAlert("success", icon.textContent + " silindi")

  }

}

function removeLocalStorage(removeTodo) {
  checkLocalStorage();
  todos.forEach((todo, index) => {
    if (todo == removeTodo) {
      todos.splice(index, 1)
    }
  })
  localStorage.setItem("todos", JSON.stringify(todos));
}



function writeList(ınputText) {
  //  <li class="list-group-item list-group-item-action">C</li> 

  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-action d-flex justify-content-between"
  li.innerHTML = ınputText;
  li.id = "ligroup"
  const a = document.createElement("a");
  a.className = "bi bi-x-lg  "
  a.href = "#"
  a.id = "icon"

  li.appendChild(a)
  listGroup.appendChild(li);

  ınput.value = "";
}



function writeLocalStorage(newTodo) {
  checkLocalStorage()
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos))
}

function checkLocalStorage() {
  if (localStorage.getItem("todos") == null) {
    todos = []
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}



function showAlert(text, message) {
  const div = document.createElement("div");
  div.className = `alert alert-${text} my-3 `
  div.innerHTML = message

  hWrapper.appendChild(div)

  setTimeout(() => {
    div.remove();
  }, 1000);

}