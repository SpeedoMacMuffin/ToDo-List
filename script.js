const toDoList = document.getElementById("task-list");

//id counter to create unique ids of li elements
let idCounter = 0;

//needed to prevent unwanted browser behavior when dragging
window.addEventListener(
  "dragover",
  (e) => {
    e.preventDefault();
  },
  false
);
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
  element.draggable = "true";
  element.addEventListener("dragstart", (ev) => {
    console.log(element.id);
    ev.dataTransfer.setData("text", element.id);
    ev.dataTransfer.dropEffect = "move";
  });
  element.addEventListener("dragover", (ev) => {
    console.log(element.id);
    ev.preventDefault();
    element.classList.add("drag");
  });
  element.addEventListener("dragleave", () => {
    element.classList.remove("drag");
  });
  element.addEventListener("drop", (ev) => {
    console.log("droped");
    toDoList.insertBefore(
      document.getElementById(ev.dataTransfer.getData("text")),
      element
    );
  });

  // add the li node to the todo list
  toDoList.appendChild(element);
};

createElement("test1");
createElement("test2");
createElement("test3");
createElement("test4");
createElement("test5");
