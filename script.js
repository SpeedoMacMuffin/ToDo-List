const toDoList = document.getElementById("tasks");

/**
 * creates a new todo list element.
 * 
 * @param {string} name - name of the element
 */
const createElement = (name) => {

    //create li node
    const element = document.createElement("LI");

    // add the li node to the todo list
    toDoList.appendChild(element);
}

createElement("test1");
createElement("test2");

