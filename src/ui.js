// ui.js
import { myProjectsLocalStorage, Project, getLocalStorageProjects } from "./project.js";
import { getTaskDetails } from './projectTaskUtils.js';
import { loadCheckboxStates, deleteCheckboxStates } from './checkboxStateManager.js';
import { myTasksLocalStorage, getLocalStorageTasks } from "./task.js";
import Task from "./task.js";

const sidebarCardContainer = document.querySelector('.sidebar__inner');
const cardContainer = document.querySelector('.container');
const projectsContainer = document.querySelector('.projects-container');
const myProjectsStorageService = new myProjectsLocalStorage();
const myTasksStorageService = new myTasksLocalStorage();

function createCardElements(card, title, contentCard, cardTitle) {
  card.classList.add('card');
  card.setAttribute('data-title', title); // Unique identifier
  contentCard.classList.add('content');
  card.appendChild(contentCard);
  cardTitle.textContent = title;
  cardTitle.classList.add("heading");
  contentCard.appendChild(cardTitle);
}

function createProjectCardElements(card, title, contentCard, cardTitle) {
  card.classList.add('projectCard');
  card.setAttribute('data-title', title); // Unique identifier
  contentCard.classList.add('content');
  card.appendChild(contentCard);
  cardTitle.textContent = title;
  cardTitle.classList.add("heading");
  contentCard.appendChild(cardTitle);
}

function createSidebarCardElements(card, title, contentCard, cardTitle) {
  card.classList.add('SidebarCardElements');
  card.setAttribute('data-title', title); // Unique identifier
  contentCard.classList.add('content');
  card.appendChild(contentCard);
  cardTitle.textContent = title;
  cardTitle.classList.add("heading");
  contentCard.appendChild(cardTitle);
}

function showCreateClickedProjectCard(clickedProjectTitle,cardContainer) {
  clearContainerContent();
  const AddedCard = createClickedProjectCard(clickedProjectTitle);
  cardContainer.appendChild(AddedCard);
  const foundProject = getLocalStorageProjects().find(project => project._title === clickedProjectTitle);
  const foundTask = foundProject.tasks;
  showTasks(foundTask);
  loadCheckboxStates()
}

function showCreateClickedSidebarCard (title, titleClass, cardContainer,tasksThisWeek){    
      const AddedCard = createClickedSidebarCard(title, titleClass);
      cardContainer.appendChild(AddedCard);
      showTasks(tasksThisWeek);
      loadCheckboxStates();
}
function createDetails(cardDate, className, TextContent, contentCard) {
  cardDate.classList.add(className);
  cardDate.textContent = TextContent;
  contentCard.appendChild(cardDate);
}

function createEditContentTask(editTaskTitle) {
  const editTaskProject = getLocalStorageProjects().find(project => project.tasks.some(task => task._title === editTaskTitle));
  clearContainerContent();
  const foundTask = getLocalStorageTasks().find(task => task._title === editTaskTitle);
  const AddedCard = createClickedProjectCard(editTaskProject._title);
  cardContainer.appendChild(AddedCard);
  showTasks(editTaskProject.tasks);
  
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (foundTask.completed === true) {
      localStorage.setItem(foundTask._title, checkbox.checked = true);
    }
    else {
      localStorage.setItem(foundTask._title, checkbox.checked = false);
    }
    
    if (foundTask.important === true) {
      localStorage.setItem(foundTask.details, checkbox.checked = true);
    }
    else {
      localStorage.setItem(foundTask.details, checkbox.checked = false);
    }
  });
  
  loadCheckboxStates();
}

function createEditContentProject(editProjectTitle) {
  const editProject = getLocalStorageProjects().find(project => project._title === editProjectTitle);
  clearContainerContent();
  const AddedCard = createClickedProjectCard(editProject._title);
  cardContainer.appendChild(AddedCard);
  showTasks(editProject.tasks);
}

function createToggleComplete(CheckBox, attribute, attributeName, Input) {
  CheckBox.setAttribute(attribute, attributeName);
  Input.appendChild(CheckBox);
}

function markImportant(starInput, attribute, attributeName) {
  starInput.setAttribute(attribute, attributeName);
}

function createTaskCard(title, dueDate, details) {
  const card = document.createElement('div');
  const InputCheckBox = document.createElement("label");
  createToggleComplete(InputCheckBox, "class", "checkbox-container", card);
  
  const LabelCheckBox = document.createElement("input");
  createToggleComplete(LabelCheckBox, "type", "checkbox", InputCheckBox);
  markImportant(LabelCheckBox, "id", title);
  
  const divCheckmark = document.createElement("div");
  createToggleComplete(divCheckmark, "class", "checkmark", InputCheckBox);
  
  const contentCard = document.createElement('div');
  const cardTitle = document.createElement('p');
  createCardElements(card, title, contentCard, cardTitle);
  
  const cardDate = document.createElement('p');
  createDetails(cardDate, 'date', dueDate, contentCard);
  
  const cardComment = document.createElement('p');
  createDetails(cardComment, 'para', details, contentCard);
  
  const starInput = document.createElement("input");
  markImportant(starInput, "class", "star");
  markImportant(starInput, "type", "checkbox");
  markImportant(starInput, "id", details);
  
  card.appendChild(starInput);
  return card;
}

function createClickedProjectCard(title) {
  const card = document.createElement('div');
  const contentCard = document.createElement('div');
  const cardTitle = document.createElement('p');
  const img = document.createElement('img');
  img.setAttribute('class', "projectImg");
  card.appendChild(img);
  
  const btnTitle = document.createElement('p');
  btnTitle.setAttribute('class', 'Add-task');
  btnTitle.textContent = 'Add task';
  card.appendChild(btnTitle);
  
  createProjectCardElements(card, title, contentCard, cardTitle);
  
  const addBtn = document.createElement('button');
  addBtn.textContent = '+';
  createBtn(addBtn, 'add-task', "toggleFormPopup('.add-task-form-container')", title, contentCard);
  
  return card;
}

function createClickedSidebarCard(title, imageTitle) {
  const card = document.createElement('div');
  const contentCard = document.createElement('div');
  const cardTitle = document.createElement('p');
  const img = document.createElement('img');
  img.setAttribute('class', imageTitle);
  card.appendChild(img);
  
  createSidebarCardElements(card, title, contentCard, cardTitle);
  
  return card;
}

function createSidebarProjectCard(title) {
  const pcard = document.createElement('li');
  pcard.setAttribute('id', "MyProjects");
  pcard.classList.add('form');
  pcard.setAttribute('data-title', title); // Unique identifier
  pcard.setAttribute('tabindex', "1");
  
  const card = document.createElement('img');
  card.setAttribute('class', "project");
  pcard.appendChild(card);
  
  const contentCard = document.createElement('span');
  createDetails(contentCard, 'title', title, pcard);
  
  const editBtn = document.createElement('button');
  editBtn.setAttribute('class', 'edit-project');
  editBtn.setAttribute('onclick', "toggleFormPopup('.edit-project-form-container')");
    //editBtn.setAttribute('onclick', "myFunction()")

  pcard.appendChild(editBtn);
  
  return pcard;
}

function showSidebarProjects() {
  const localProjects = getLocalStorageProjects();
  
  for (let i = 0; i < localProjects.length; i++) {
    const AddedCard = createSidebarProjectCard(
      localProjects[i]._title,
      localProjects[i].description
    );
    projectsContainer.appendChild(AddedCard);
    createButton(AddedCard, 'delete-project', 'x');
  }
}

function showLastProject() {
  const lastItem = getLocalStorageProjects()[getLocalStorageProjects().length - 1];
  const AddedCard = createSidebarProjectCard(
    lastItem._title,
    lastItem.description
  );
  projectsContainer.appendChild(AddedCard);
  createButton(AddedCard, 'delete-project', 'x');
}

function showLastTask() {
  const tasks = getLocalStorageTasks();
  const lastItem = tasks[tasks.length - 1];
  const AddedCard = createTaskCard(
    lastItem._title,
    lastItem.dueDate,
    lastItem.details
  );
  cardContainer.appendChild(AddedCard);
  createButton(AddedCard, 'delete-task', 'x');
  createEditBtn(AddedCard);
}

function showTasks(foundTask) {
  for (let i = 0; i < foundTask.length; i++) {
    const AddedCard = createTaskCard(
      foundTask[i]._title,
      foundTask[i].dueDate,
      foundTask[i].details
    );
    cardContainer.appendChild(AddedCard);
    createButton(AddedCard, 'delete-task', 'x');
    createEditBtn(AddedCard);
  }
}

function addProject() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container');
    form.addEventListener('submit', event => {
      const NewTitle = form.elements["projectTitle"];
      let ptitle = NewTitle.value;
      const projectToAdd = new Project(ptitle);
      
      myProjectsStorageService.addLocalStorageProject(projectToAdd);
      showLastProject();
      event.preventDefault();
      form.reset(); // Reset all form data
    });
  });
}

function addTask(index) {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container2');
    form.addEventListener('submit', event => {
      event.preventDefault();
      
      const NewTitle = form.elements["taskTitle"];
      const NewDueDate = form.elements["dueDate"];
      const NewDetails = form.elements["taskDetails"];
      
      let title = NewTitle.value;
      let dueDate = NewDueDate.value;
      let details = NewDetails.value;
      const taskToAdd = new Task(title, dueDate, details);
      
      myTasksStorageService.addTask(taskToAdd);
      myProjectsStorageService.addProjectTasks(index, taskToAdd);
      showLastTask();
      form.reset(); // Reset all form data
    });
  });
}

function editTask(index, projectIndex, taskIndex) {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container3');
    form.addEventListener('submit', event => {
      event.preventDefault();

      const NewTitle = form.elements["taskTitle"];
      const NewDueDate = form.elements["dueDate"];
      const NewDetails = form.elements["taskDetails"];

      let title = NewTitle.value;
      let dueDate = NewDueDate.value;
      let details = NewDetails.value;

      const taskDataValue = (getLocalStorageTasks()[index]._title);
      deleteCheckboxStates(taskDataValue, getTaskDetails(taskDataValue));
      myTasksStorageService.LocalStorageEditTask(title, dueDate, details, index);
      myProjectsStorageService.LocalStorageEditProjectTasks(title, dueDate, details, projectIndex, taskIndex);
      createEditContentTask(title);
      form.reset(); // Reset all form data
    });
  });
}

function editProject(index) {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container-edit');

    form.addEventListener('submit', event => {
      event.preventDefault();
      
      const NewTitle = form.elements["projectTitle"];
      let title = NewTitle.value;
      
      myProjectsStorageService.LocalStorageEditProject(title, index);
      createEditContentProject(title);
      updateSidebarProjects();
      showSidebarProjects();
      loadCheckboxStates();
      form.reset(); // Reset all form data
    });
  });
}

function createEditBtn(AddedCard) {
  const btn = document.createElement('button');
  btn.setAttribute('class', 'edit-task');
  btn.setAttribute('onclick', "toggleFormPopup('.edit-task-form-container')");
  AddedCard.appendChild(btn);

  return btn;
}

function createBtn(btn, className, toggle, title, parentElement) {
  btn.setAttribute('class', className);
  btn.setAttribute('data-title', title);
  btn.setAttribute('onclick', toggle);
  parentElement.appendChild(btn);

  return btn;
}

function createButton(parentElement, className, buttonText) {
  const btn = document.createElement('button');
  btn.setAttribute('class', className);
  btn.textContent = buttonText;
  parentElement.appendChild(btn);

  return btn;
}

function Homepage() {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      const AddedCard = createClickedSidebarCard("All Tasks", "inbox");
      cardContainer.appendChild(AddedCard);
      showTasks(getLocalStorageTasks());
      loadCheckboxStates();
      showSidebarProjects();
    },
    false
  );
}

function clearContainerContent() {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

function updateSidebarProjects() {
  const existingProjects = projectsContainer;
  
  while (existingProjects.firstChild) {
    existingProjects.removeChild(existingProjects.firstChild);
  }
}

export {
  Homepage,
  createTaskCard,
  createClickedProjectCard,
  createClickedSidebarCard,
  showSidebarProjects,
  showLastProject,
  addProject,
  showTasks,
  clearContainerContent,
  addTask,
  editTask,
  editProject,
  showCreateClickedProjectCard,
  showCreateClickedSidebarCard ,
};
