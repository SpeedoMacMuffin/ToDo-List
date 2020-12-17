"use strict";

let idCounter = 0;
class ToDoList {
  constructor() {
    this._list = [];
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
    this._list.push(new TodoListElement(title,  (id) => {this.deleteElement(id)}));
    this.renderElements();
  }
  deleteElement(id) {
    // console.log(this);
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
    htmlElement.id = this._id;

    //create text span node
    const textSpan = document.createElement("SPAN");
    textSpan.className = "text";
    textSpan.appendChild(document.createTextNode(this._title));
    htmlElement.appendChild(textSpan);

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

    return htmlElement;
  }
}

const todoList = new ToDoList();
todoList.addElement("Talk about our lord and savior Jesus Christ");
todoList.addElement("Deactivate addblocker");
todoList.addElement("Accept all cookies");
todoList.addElement("Take part in a survey");
todoList.addElement("Skip morning coffee");

//add button-listener
const addBttn = document.getElementById("add");

addBttn.addEventListener("click", (e) => {
  let name = document.querySelector("#task").value;
  e.preventDefault();
  if (name.replace(/\s/g, "") == "") {
    alert("Please enter a task");
  } else {
    todoList.addElement(name);
    document.querySelector("#task").value = "";
  }
});
