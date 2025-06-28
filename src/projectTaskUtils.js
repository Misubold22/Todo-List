// projectTaskUtils.js - Utilities for working with projects and tasks

import { myProjectsLocalStorage, getLocalStorageProjects } from "./project.js";
import { myTasksLocalStorage, getLocalStorageTasks } from "./task.js";

const myProjectsStorageService = new myProjectsLocalStorage();
const myTasksStorageService = new myTasksLocalStorage();

let projectIndex = [];
let taskIndex = [];
let editTaskIndex = [];

function getIndex(myObjects, value) {
  const index = myObjects.findIndex(item => item._title === value);
  if (index > -1) {
    return index;
  }
}

function editProjectTasks(projectDataValue, taskDataValue) {
  const myLocalProjects = getLocalStorageProjects();
  const projectDataValueIndex = getIndex(myLocalProjects, projectDataValue);
  const projectTasks = myLocalProjects[projectDataValueIndex].tasks;
  const projectTasksIndex = getIndex(projectTasks, taskDataValue);
  projectIndex.push(projectDataValueIndex);
  editTaskIndex.push(projectTasksIndex);
}

function toggleCompleteProjectTasks(projectDataValue, taskDataValue) {
  const myLocalProjects = getLocalStorageProjects();
  const projectDataValueIndex = getIndex(myLocalProjects, projectDataValue);
  const projectTasks = myLocalProjects[projectDataValueIndex].tasks;
  const projectTasksIndex = getIndex(projectTasks, taskDataValue);
  myProjectsStorageService.LocalStorageToggleCompleteProjectTasks(projectDataValueIndex, projectTasksIndex);
}

function toggleImportantProjectTasks(projectDataValue, taskDataValue) {
  const myLocalProjects = getLocalStorageProjects();
  const projectDataValueIndex = getIndex(myLocalProjects, projectDataValue);
  const projectTasks = myLocalProjects[projectDataValueIndex].tasks;
  const projectTasksIndex = getIndex(projectTasks, taskDataValue);
  myProjectsStorageService.LocalStorageToggleImportantProjectTasks(projectDataValueIndex, projectTasksIndex);
}

function getProjectDataValue(taskDataValue) {
  const projectTaskDataValue = getLocalStorageProjects().find(project => 
    project.tasks.some(task => task._title === taskDataValue)
  );
  const projectDataValue = projectTaskDataValue._title;
  return projectDataValue;
}

function getTaskDetails(taskDataValue) {
  const foundTask = getLocalStorageTasks().find(task => task._title === taskDataValue);
  const foundDetails = foundTask.details;
  return foundDetails;
}


export {
  projectIndex,
  taskIndex,
  editTaskIndex,
  getIndex,
  editProjectTasks,
  toggleCompleteProjectTasks,
  toggleImportantProjectTasks,
  getProjectDataValue,
  getTaskDetails
};