import "./styles.css";
import { myTasksLocalStorage, Task, task1, task2, task3, task4,task5,task6,task7, getLocalStorageTasks } from "./task.js";
import { project1, project2,project3, myProjectsLocalStorage, getLocalStorageProjects } from "./project.js";
import { Homepage, addProject, showTasks, clearContainerContent, addTask, editTask, editProject, createClickedSidebarCard, createClickedProjectCard ,showCreateClickedProjectCard,showCreateClickedSidebarCard } from "./ui.js";
import { getWeek } from "date-fns";
import { loadCheckboxStates, loadEditCheckboxStates, deleteCheckboxStates } from './checkboxStateManager.js';
import { editProjectTasks, getTaskDetails, toggleCompleteProjectTasks, toggleImportantProjectTasks, getProjectDataValue, getIndex, projectIndex, taskIndex, editTaskIndex } from './projectTaskUtils.js';

const cardContainer = document.querySelector('.container');

Homepage();
addProject();
addTask(projectIndex);
editTask(taskIndex, projectIndex, editTaskIndex);
editProject(projectIndex);
sidebarOptions();

const myProjectsStorageService = new myProjectsLocalStorage();
const myTasksStorageService = new myTasksLocalStorage();

if (localStorage.getItem("myLocalProjects") === null) {
  myProjectsStorageService.addProjects(project1, project2);
     myProjectsStorageService.addLocalStorageProject(project3)
}

if (localStorage.getItem('myLocalTasks') === null) {
  myTasksStorageService.addTask(task1);
  myTasksStorageService.addTask(task2);
  myTasksStorageService.addTask(task3);
  myTasksStorageService.addTask(task4);
  myTasksStorageService.addTask(task5);
  myTasksStorageService.addTask(task6);
  myTasksStorageService.addTask(task7);
}
function sidebarOptions() {
  const options = document.querySelector('.sidebar__inner');
  const fns = require('date-fns');
  const formattedToday = fns.format(new Date(), "yyyy-MM-dd");
  
  options.addEventListener("click", (e) => handleButton(e));

  function handleButton(e) {
    let clickedElement = e.target;
    let title, id;
    
    if (clickedElement.classList.contains('title')) {
      title = clickedElement.textContent;
      id = clickedElement.parentElement.id;
    } 
    else if (clickedElement.classList.contains('form')) {
      title = clickedElement.querySelector('.title').textContent;
      id = clickedElement.id;
    }
    else if (clickedElement.tagName === 'IMG') {
      title = clickedElement.parentElement.querySelector('.title').textContent;
      id = clickedElement.parentElement.id;
    }
    else {
      return; 
    }

    clearContainerContent();
    
    switch (id) {
      case "All Tasks":
        showCreateClickedSidebarCard(title, "inbox", cardContainer, getLocalStorageTasks());
        break;

      case "Today":
        const tasksToday = getLocalStorageTasks().filter(task => task.dueDate === formattedToday);
        showCreateClickedSidebarCard(title, "today", cardContainer, tasksToday);
        break;

      case "This Week":
        const currentWeek = getWeek(formattedToday);
        const tasksThisWeek = getLocalStorageTasks().filter(task => 
          getWeek(new Date(task.dueDate)) === currentWeek
        );
        showCreateClickedSidebarCard(title, "thisWeek", cardContainer, tasksThisWeek);
        break;

      case "Important":
        const taskImportant = getLocalStorageTasks().filter(task => task.important === true);
        showCreateClickedSidebarCard(title, "important", cardContainer, taskImportant);
        break;

      case "Completed":
        const taskCompleted = getLocalStorageTasks().filter(task => task.completed === true);
        if (taskCompleted.length > 0) {
          loadEditCheckboxStates();
        }
        showCreateClickedSidebarCard(title, "completed", cardContainer, taskCompleted);
        break;

      default:
        console.log('Unknown section:', id);
    }
  }
}

document.querySelector('.sidebar__inner').addEventListener("click", e => {
  const cardElement = e.target.parentElement;
  const clickedProjectTitle = cardElement.dataset.title;
  const clickedProject = e.target.getAttribute("data-title");
  
  if (clickedProject) {
    showCreateClickedProjectCard(clickedProject, cardContainer);
  }
  else if (clickedProjectTitle) {
    showCreateClickedProjectCard(clickedProjectTitle, cardContainer);
  }

  if (e.target.classList.contains('delete-project')) {
    const projectIndex = getIndex(getLocalStorageProjects(), clickedProjectTitle);
    const project = getLocalStorageProjects()[projectIndex]; 
  
  if (project.tasks && project.tasks.length > 0) {
    project.tasks.forEach(task => {
      const taskIndex = getIndex(getLocalStorageTasks(), task._title);
      if (taskIndex > -1) {
        deleteCheckboxStates(task._title, getTaskDetails(task._title));
        myTasksStorageService.LocalStorageDeleteTask(taskIndex);
      }
    });
  }
  
  myProjectsStorageService.LocalStorageDeleteProject(projectIndex);
  cardElement.remove();
  
  clearContainerContent();
  showTasks(getLocalStorageTasks());
  loadCheckboxStates();
}
  else if (e.target.classList.contains('edit-project')) {
    cardElement.focus();
    const editProject = getIndex(getLocalStorageProjects(), clickedProjectTitle);
    projectIndex.push(editProject);

    if (projectIndex.length > 1) {
      projectIndex.splice(0, 1);
    }
  }
});



document.querySelector('.container').addEventListener('click', e => {
  if (e.target.classList.contains('delete-task')) {
    const deleteCard = e.target.parentElement;
    const deleteDataValue = deleteCard.dataset.title;
    const taskIndex = getIndex(getLocalStorageTasks(), deleteDataValue);
    
    if (taskIndex > -1) {
      deleteCheckboxStates(deleteDataValue, getTaskDetails(deleteDataValue));
      myTasksStorageService.LocalStorageDeleteTask(taskIndex);
      deleteCard.remove();
      myProjectsStorageService.deleteProjectTasks(deleteDataValue);
      deleteCard.remove();
    }
  }
  else if (e.target.classList.contains('add-task')) {
    const addProjectTitle = e.target.getAttribute("data-title");
    const project = getIndex(getLocalStorageProjects(), addProjectTitle);
    projectIndex.push(project);
    
    if (projectIndex.length > 1) {
      projectIndex.splice(0, 1);
    }
  }
  else if (e.target.classList.contains('edit-task')) {
    const editCard = e.target.parentElement;
    const taskDataValue = editCard.dataset.title;
    const taskDataValueIndex = getIndex(getLocalStorageTasks(), taskDataValue);
    taskIndex.push(taskDataValueIndex);
    editProjectTasks(getProjectDataValue(taskDataValue), taskDataValue);
    
    if (taskIndex.length > 1) {
      taskIndex.splice(0, taskIndex.length - 1);
    }
    
    if (projectIndex.length > 1) {
      projectIndex.splice(0, projectIndex.length - 1);
    }
    
    if (editTaskIndex.length > 1) {
      editTaskIndex.splice(0, editTaskIndex.length - 1);
    }
  }
  else if (e.target.classList.contains('checkmark')) {
    const checkCard = e.target.parentElement;
    const checkboxContainer = checkCard.parentNode;
    const taskDataValue = checkboxContainer.dataset.title;
    const taskIndex = getIndex(getLocalStorageTasks(), taskDataValue);
    
    toggleCompleteProjectTasks(getProjectDataValue(taskDataValue), taskDataValue);
    myTasksStorageService.LocalStorageToggleComplete(taskIndex);
  }
  else if (e.target.classList.contains('star')) {
    const starCard = e.target.parentElement;
    const taskDataValue = starCard.dataset.title;
    const taskDataValueIndex = getIndex(getLocalStorageTasks(), taskDataValue);
    
    toggleImportantProjectTasks(getProjectDataValue(taskDataValue), taskDataValue);
    myTasksStorageService.LocalStorageToggleImportant(taskDataValueIndex);
  }
});