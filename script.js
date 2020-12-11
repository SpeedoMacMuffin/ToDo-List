const toDoList = document.getElementById("task-list");

//id counter to create unique ids of li elements (for drag and drop)
let idCounter = 0;

//needed to prevent unwanted browser behavior when dragging (opening new window)
window.addEventListener(
  "drop",
  (e) => {
    e.preventDefault();
  },
  false
);

/**
 * creates a new todo list element.
 *
 * @param {string} name - name of the element
 */
const createElement = (name) => {
  //create li node
  const element = document.createElement("LI");

  //create text span node
  const textSpan = document.createElement("SPAN");
  textSpan.className = "text";
  textSpan.appendChild(document.createTextNode(name));
  //add done event listener
  textSpan.addEventListener("click", () => {
    element.classList.toggle("checked");
  });
  // addEvent-Listener to supress the return-Key from beeing pressed
  textSpan.addEventListener("keydown", (keyInfo) => {
    // stop editing if the Enter-Key is pressed
    if (keyInfo.keyCode == 13) {
      // console.log('the Return-Key on the Keyboard has the keydown-Number: 13!');
      textSpan.contentEditable = "false";
    }
  });
  //add text span to element
  element.appendChild(textSpan);

  //create edit button node
  const editSpan = document.createElement("SPAN");
  editSpan.className = "edit"; //TODO: add classes
  editSpan.appendChild(document.createTextNode("edit")); //TODO: replace with icon
  // add event listener to the button
  editSpan.addEventListener("click", () => {
    // make the content editable for the textSpan (previousSibling)!
    textSpan.contentEditable = "true";
  });

  //add edit button to element
  element.appendChild(editSpan);

  //create delete button node
  const deleteSpan = document.createElement("SPAN");
  deleteSpan.className = "delete";
  deleteSpan.appendChild(document.createTextNode("delete")); //TODO: replace with icon
  //generate delete button event listener
  deleteSpan.addEventListener("click", () => {
    element.remove();
  });
  
  //add delete button to element
  element.appendChild(deleteSpan);

  //add drag and drop functionality
  element.id = "li-" + idCounter++;
  makeDragable(element);
  makeDropable(element);

  // add the li node to the todo list
  toDoList.prepend(element);
};

// Add Button & Function
let addButton = document.querySelector("#add");

addButton.addEventListener("click", () => {
  let name = document.querySelector("#task").value;
  event.preventDefault();
  if (name) {
    createElement(name);
    document.querySelector("#task").value = "";
  } else {
    alert("Please enter a task");
  }
});

/** make an HTML Element draggable
 * @param {HTMLElement} element - element to be draggable
 */
const makeDragable = (element) => {
  element.draggable = "true";
  element.addEventListener("dragstart", (ev) => {
    ev.dataTransfer.setData("text", element.id);
  });
};

/** make an HTML Element a valid dropzone
 * @param {HTMLElement} element - element to be a dropzone
 */
const makeDropable = (element) => {
  //change the cursor on the dropzone and mark it as viable
  element.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  });

  //add dragged element before this element
  element.addEventListener("drop", (ev) => {
    toDoList.insertBefore(
      document.getElementById(ev.dataTransfer.getData("text")),
      element
    );
  });
};

/** create an empty dropzone element and add it to the ToDoList
 */
const createDropDubElement = () => {
  const element = document.createElement("div");
  element.style.height = "3em"; //TODO: add a class instead and add it to css
  makeDropable(element);
  toDoList.prepend(element);
};

//add a dropzone to the bottom of the list
createDropDubElement();

//create initial Elements
createElement("test1");
createElement("test2");
createElement("test3");
createElement("test4");
createElement("test5");
