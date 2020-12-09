const toDoList = document.getElementById("task-list");

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

  // add the li node to the todo list
  toDoList.appendChild(element);
};

createElement("test1");
createElement("test2");
