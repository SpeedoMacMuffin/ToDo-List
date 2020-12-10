const toDoList = document.getElementById("task-list");

//id counter to create unique ids of li elements
let idCounter = 0;

//needed to prevent unwanted browser behavior when dragging
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
  //add text span to element
  element.appendChild(textSpan);

  //create edit button node
  const editSpan = document.createElement("SPAN");
  editSpan.className = "edit"; //TODO: add classes
  editSpan.appendChild(document.createTextNode("edit")); //TODO: replace with icon
  //TODO: generate edit button event listener
  //add edit button to element
  element.appendChild(editSpan);

  //create delete button node
  const deleteSpan = document.createElement("SPAN");
  deleteSpan.className = "delete";
  deleteSpan.appendChild(document.createTextNode("delete")); //TODO: replace with icon
  //TODO: generate delete button event listener
  //add delete button to element
  element.appendChild(deleteSpan);

  //add drag and drop functionality
  element.id = "li-" + idCounter++;
  makeDragable(element);
  makeDropable(element);

  // add the li node to the todo list
  toDoList.appendChild(element);
};

const makeDragable = (element) => {
  element.draggable = "true";
  element.addEventListener("dragstart", (ev) => {
    ev.dataTransfer.setData("text", element.id);
  });
};
const makeDropable = (element) => {
  element.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  });
  element.addEventListener("drop", (ev) => {
    toDoList.insertBefore(
      document.getElementById(ev.dataTransfer.getData("text")),
      element
    );
  });
};
const createDropDubElement = () => {
  const element = document.createElement("div");
  element.style.height = "3em";
  makeDropable(element);
  toDoList.prepend(element);
};

createDropDubElement();
createElement("test1");
createElement("test2");
createElement("test3");
createElement("test4");
createElement("test5");
