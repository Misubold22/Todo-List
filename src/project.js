// project.js
import Task from "./task.js";  

export class Project {
  constructor(ptitle) {
    this._title = ptitle;
    this.tasks = [];
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  addTasks(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      console.log(`Task ${task} removed successfully.`);
    } else {
      console.log(`Task "${task}" does not exist.`);
    }
  }
}

export class myProjectsLocalStorage {
  #keys = {
    myLocalProjects: 'myLocalProjects',
  };

  constructor() {
    this.storage = window.localStorage;
  }

  addProjects(firstProject, secondProject) {
    const myLocalProjects = this.getProjects();
    myLocalProjects.push(firstProject, secondProject);
    this.setProjects(myLocalProjects);
  }

  addLocalStorageProject(project) {
    const myLocalProjects = this.getProjects();
    myLocalProjects.push(project);
    this.setProjects(myLocalProjects);
  }

  getProjects() {
    return JSON.parse(this.storage.getItem(this.#keys.myLocalProjects)) || [];
  }

  setProjects(myLocalProjects) {
    this.storage.setItem(this.#keys.myLocalProjects, JSON.stringify(myLocalProjects));
  }

  addProjectTasks(index, task) {
    const myLocalProjects = this.getProjects();
    const projectTask = myLocalProjects[index].tasks;
    projectTask.push(task);
    this.setProjects(myLocalProjects);
  }

  deleteProjectTasks(deleteDataValue) {
    const myLocalProjects = this.getProjects();
    for (const value of myLocalProjects) {
      const projectTasks = value.tasks;
      const index = projectTasks.findIndex(item => item._title === deleteDataValue);
      if (index > -1) {
        projectTasks.splice(index, 1);
        this.setProjects(myLocalProjects);
      }
    }
  }

  LocalStorageDeleteProject(index) {
    const myLocalProjects = this.getProjects();
    myLocalProjects.splice(index, 1);
    this.setProjects(myLocalProjects);
  }

  LocalStorageEditProject(editTitle, index) {
    const myLocalProjects = this.getProjects();
    myLocalProjects[index]._title = editTitle;
    this.setProjects(myLocalProjects);
  }

  LocalStorageEditProjectTasks(editTitle, editDueDate, editDetails, projectIndex, taskIndex) {
    const myLocalProjects = this.getProjects();
    const projectTasks = myLocalProjects[projectIndex].tasks;
    const editTask = projectTasks[taskIndex];
    editTask._title = editTitle;
    editTask.dueDate = editDueDate;
    editTask.details = editDetails;
    this.setProjects(myLocalProjects);
  }

  LocalStorageToggleCompleteProjectTasks(projectIndex, taskIndex) {
    const myLocalProjects = this.getProjects();
    const projectTasks = myLocalProjects[projectIndex].tasks;
    const projectTaskComplete = projectTasks[taskIndex];
    const completedTask = projectTaskComplete.completed;
    const toggleValue = (completed) => !completed;
    projectTaskComplete.completed = toggleValue(completedTask);
    this.setProjects(myLocalProjects);
  }

  LocalStorageToggleImportantProjectTasks(projectIndex, taskIndex) {
    const myLocalProjects = this.getProjects();
    const projectTasks = myLocalProjects[projectIndex].tasks;
    const projectTaskImportant = projectTasks[taskIndex];
    const importantTask = projectTaskImportant.important;
    const toggleValue = (important) => !important;
    projectTaskImportant.important = toggleValue(importantTask);
    this.setProjects(myLocalProjects);
  }

  clear() {
    this.storage.clear();
  }
}

const  myProjectsStorageService = new myProjectsLocalStorage ();
export const project1 = new Project('Spring Cleaning');
export const project2 = new Project('Weekly Meal Prep');
export const project3 = new Project('Learn TypeScript');

export function getLocalStorageProjects(){
  return myProjectsStorageService.getProjects()
}



      
