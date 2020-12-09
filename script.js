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
  //TODO: generate delete button event listener
  //add delete button to element
  element.appendChild(deleteSpan);

  // add the li node to the todo list
  toDoList.appendChild(element);
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

createElement("test1");
createElement("test2");
