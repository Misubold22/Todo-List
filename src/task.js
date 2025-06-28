// task.js
import { Project,project1,project2,project3} from "./project.js";


export class Task extends Project{
  constructor(title, dueDate,details,ptitle){
  super(ptitle);
  this._title = title;
  this.dueDate = dueDate; 
  this.details = details;
  this.important = false;
  this.completed = false;
}

toggleImportant() {
  this.important = !this.important;
}
  
toggleComplete() {
   this.completed = !this.completed;
}

get title() {
  return this._title;
}
    
set title(newTitle) {
  this._title= newTitle;
}

}


export class myTasksLocalStorage {
  #keys = {
    myLocalTasks: 'myLocalTasks',
  };

  constructor() {
    this.storage = window.localStorage;
  }

  addTask(task) {
    const myLocalTasks = this.getTasks();
    myLocalTasks.push(task);
    this.setTasks(myLocalTasks);
  }

  getTasks() {
    return JSON.parse(this.storage.getItem(this.#keys.myLocalTasks)) || [];
  }

  getTask(title) {
    const myLocalTasks = this.getTasks();
    return myLocalTasks.find((task) => task.title === title);
  }

  setTasks(myLocalTasks) {
    this.storage.setItem(this.#keys.myLocalTasks, JSON.stringify(myLocalTasks));
  }


  LocalStorageDeleteTask(index) {
    const myLocalTasks = this.getTasks();
    myLocalTasks.splice(index, 1);
    this.setTasks(myLocalTasks);
  }

  LocalStorageEditTask(editTitle, editDueDate, editDetails, index) {
    const myLocalTasks = this.getTasks();
    myLocalTasks[index]._title = editTitle;
    myLocalTasks[index].dueDate = editDueDate;
    myLocalTasks[index].details = editDetails;
    this.setTasks(myLocalTasks);
  }

  LocalStorageToggleComplete(taskIndex) {
    const myLocalTasks = this.getTasks();
    const task = myLocalTasks[taskIndex]; 
    const completedTask = task.completed;
    const toggleValue = (completed) => !completed;
    myLocalTasks[taskIndex].completed = toggleValue(completedTask);
    this.setTasks(myLocalTasks);
  }

  LocalStorageToggleImportant(taskIndex) {
    const myLocalTasks = this.getTasks();
    const task = myLocalTasks[taskIndex]; 
    const importantTask = task.important;
    const toggleValue = (important) => !important;
    myLocalTasks[taskIndex].important = toggleValue(importantTask);
    this.setTasks(myLocalTasks);
  }

  clear() {
    this.storage.clear();
  }
}


const myTasksStorageService = new myTasksLocalStorage ();

export function getLocalStorageTasks(){
  return myTasksStorageService.getTasks()
}

export default Task;  

export const task1 = new Task("Declutter Closet", "2025-04-01", "Donate clothes")
export const task2 = new Task("Vacuum Under Furniture", "2025-04-05", "Vacuum hidden spots")
export const task3 = new Task("Pick Recipes", "2025-07-01", "Choose 3 meals")
export const task4 = new Task("Buy Groceries", "2025-07-02", "Shop for food")
export const task5 = new Task("Set Up TS Project", "2025-07-01", "Init with TypeScript")
export const task6 = new Task("Convert JS to TS", "2025-07-02", "Add types to JS file")
export const task7 = new Task("Build Small App", "2025-07-05", "Create with strict types")

project1.addTasks(task1);
project1.addTasks(task2);
project2.addTasks(task3);
project2.addTasks(task4);
project3.addTasks(task5);
project3.addTasks(task6);
project3.addTasks(task7);









 