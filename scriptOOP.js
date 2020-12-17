"use strict";

let idCounter = 0;
class ToDoList {
  constructor() {
    this._list = [
      new TodoListElement("title1"),
      new TodoListElement("title2"),
      new TodoListElement("title3"),
      new TodoListElement("title4"),
    ];
  }

  // find index of Element with given ID
  indexOfElement(id) {
    for (let i = 0; i < this._list.length; i++) {
      if (id === this._list[i].getId()) {
        return i;
      }
    }
  }

  addElement(title) {
    this._list.push(new TodoListElement(title, this.deleteElement));
    this.renderElements();
  }
  deleteElement(id) {
    // console.log(id);
    const index = this.indexOfElement(id); //find index from List 
    this._list.splice(index, 1); //delete element from List

    this.renderElements();
  }
  editElement(id, newTitle) {
    const element = this._list[this.indexOfElement(id)];
    if (element.getTitle() !== newTitle) {
      element.setTitle(newTitle);
      this.renderElements();
    }
  }
  renderElements() {
    const toDoList = document.getElementById("task-list");
    //delete all childs
    toDoList.innerHTML = "";

    for (let i = 0; i < this._list.length; i++) {
      toDoList.prepend(this._list[i].render());
    }
  }
}

class TodoListElement {
  constructor(title, deleteHandler) {
    this._id = "li-" + idCounter++;
    this._title = title;
    this._deleteHandler = deleteHandler;
  }

  getTitle() {
    return this._title;
  }
  setTitle(title) {
    this._title = title;
  }
  getId() {
    return this._id;
  }

  render() {
    const htmlElement = document.createElement("LI");


    //create text span node
    const textSpan = document.createElement("SPAN");
    textSpan.className = "text";
    textSpan.appendChild(document.createTextNode(this._title));
    htmlElement.appendChild(textSpan);
    htmlElement.id = this._id;

//create delete button
const deleteSpan = document.createElement("SPAN");  //<span></span>
deleteSpan.className = "delete";  //<span class ="delete"></span>
//generate delete button event listener
deleteSpan.addEventListener("click", () => {
  this._deleteHandler(this._id);
});

//add delete button to element
htmlElement.appendChild(deleteSpan);







    //add done event listener to li element
    htmlElement.addEventListener("click", (ev) => {
      if (
        ev.target === htmlElement ||
        (ev.target === textSpan && ev.target.isContentEditable === false)
      ) {
        htmlElement.classList.toggle("checked");
      }
    });

    //TODO rest
    return htmlElement;
  }
}

const todoList = new ToDoList();
todoList.renderElements();
todoList.addElement("title10");
// todoList.deleteElement("li-1");
/* Add Button functionality */
const addBttn = document.getElementById("add");

addBttn.addEventListener("click", (e) => {
  let name = document.querySelector("#task").value;
  e.preventDefault();
  if (name) {
    todoList.addElement(name);
    document.querySelector("#task").value = "";
  } else {
    alert("Please enter a task");
  }
});



//  console.log(todoList.indexOfElement('li-1'));

/*class TodoList {
  constructor() {
    this._listElements = [];
  }
  createList() {
    const id = 2;

    const element = new ToDoElement();
  }

  deleteToDo(id) {
    for (let i = 0; i < this._listElements.length; i++) {
      if (this._listElements[i]._id === id) {
        //delete that thing
        break;
      }
    }
    document.getElementById;

    console.log(id);
    //delete element with id from dom and list
  }
}
class ToDoElement {
  constructor(title = "task", deleteHandler) {
    this._id = 5;
    this._title = title;
    this._done = false;
    this._htmlElement = null;
    this._deleteHandler = deleteHandler;
  }
  setTitle(title) {
    this._title = title;
    this._htmlElement.firstElementChild.innerHTML = title;
  }

  createListElement() {
    //create li node
    const element = document.createElement("LI");
    element.setAttribute("id", this._id.toString());

    //create text span node
    const textSpan = document.createElement("SPAN");
    textSpan.className = "text";
    textSpan.appendChild(document.createTextNode(this._title));
    //add done event listener to li element
    element.addEventListener("click", (ev) => {
      if (
        ev.target === element ||
        (ev.target === textSpan && ev.target.isContentEditable === false)
      ) {
        element.classList.toggle("checked");
      }
    });

    // addEvent-Listener to supress the return-Key from beeing pressed
    textSpan.addEventListener("keydown", (keyInfo) => {
      // stop editing if the Enter-Key is pressed
      if (keyInfo.keyCode == 13) {
        // console.log('the Return-Key on the Keyboard has the keydown-Number: 13!');
        textSpan.contentEditable = "false";
        editSpan.classList.remove("saveActive");
      }
    });
    //add text span to element
    element.appendChild(textSpan);

    //create edit button node
    const editSpan = document.createElement("SPAN");
    editSpan.className = "edit"; //TODO: add classes
    // add event listener to the button
    editSpan.addEventListener("click", () => {
      // Deactivate the Editable field and hide save Button
      if (textSpan.contentEditable == "true") {
        editSpan.classList.remove("saveActive");
        textSpan.contentEditable = "false";
      } else {
        // Show  the Editable field and hide save Button to make the content editable for the textSpan
        textSpan.contentEditable = "true";
        editSpan.classList.add("saveActive");
        textSpan.focus();
        // PLACE CURSOR AT THE END OF THE CURRENT TEXT
        // select all the content in the element
        document.execCommand("selectAll", false, null);
        // collapse selection to the end
        document.getSelection().collapseToEnd();
      }
    });
    //add edit button to element
    element.appendChild(editSpan);

    //create delete button node
    const deleteSpan = document.createElement("SPAN");
    deleteSpan.className = "delete";
    //generate delete button event listener
    deleteSpan.addEventListener("click", () => this._deleteHandler(this));
    //add delete button to element
    element.appendChild(deleteSpan);
    this._htmlElement = element;

    return element;
  }
}
const element = new ToDoElement("sometitle", () => {
  console.log("delete");
});

const toDoList = document.getElementById("task-list");
toDoList.prepend(element.createListElement());*/
