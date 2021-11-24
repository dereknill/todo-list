import("normalize.css");
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import("./style.css");

import TaskFactory from "./Factories.js";
import DOMController from "./dom-controller.js";
import StorageController from "./storage-controller.js";

let taskList = [];
let projectList = [];

// Initialize Application On Load
const init = (() => {
  load();
})();

function createNewProject(projectName) {
  newProject(projectName);
  saveProjects();
}
function newTask(title, description, dueDate, project) {
  let task = TaskFactory(title, description, dueDate, project);
  taskList.push(task);
  StorageController.saveTask(task);
}

function newProject(project) {
  projectList.push(project);
}

function addProjectToggleButton() {
  DOMController.toggleAddProject();
}

// Put functions in global scope for button onclick
window.addProjectToggleButton = addProjectToggleButton;
window.taskList = taskList;
window.projectList = projectList;

function load() {
  projectList = StorageController.loadProjects();
  taskList = StorageController.loadTasks();
  DOMController.setProjectMenuDiv(projectList);
}

// Click Handlers
