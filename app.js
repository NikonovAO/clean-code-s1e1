//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('task-new__input');
const addButton = document.getElementById('task__add');
const incompleteTaskHolder = document.getElementById('task__incomplete');
const completedTasksHolder = document.getElementById('task__completed');

const createNewTaskElement = function(taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'task__item';
  label.innerText = taskString;
  label.className = 'task__name';

  checkBox.type = 'checkbox';
  checkBox.className = 'task__mark-complete';

  editInput.type = 'text';
  editInput.className = 'task__input task-incomplete__input';

  editButton.innerText = 'Edit';
  editButton.className = 'task__edit button';

  deleteButton.className = 'task__delete button';
  deleteButtonImg.className = 'task__delete-img';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'delete';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function() {
  console.log('Add Task...');
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
};

const editTask = function() {
  console.log('Edit Task...');
  console.log(`Change 'edit' to 'save'`);

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.task__input');
  const label = listItem.querySelector('.task__name');
  const editBtn = listItem.querySelector('.task__edit');
  const containsClass = listItem.classList.contains('task__item--edit');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('task__item--edit');
};

const deleteTask = function() {
  console.log('Delete Task...');
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function() {
  console.log('Complete Task...');
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function() {
  console.log('Incomplete Task...');
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
};

const ajaxRequest = function() {
  console.log('AJAX Request');
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log('bind list item events');
  const checkBox = taskListItem.querySelector('.task__mark-complete');
  const editButton = taskListItem.querySelector('.task__edit');
  const deleteButton = taskListItem.querySelector('.task__delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.