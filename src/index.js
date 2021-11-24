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

function newTask(title, description, dueDate, project) {
  let task = TaskFactory(title, description, dueDate, project);
  taskList.push(task);
  StorageController.saveTask(task);
}

function newProject(project) {
  projectList.push(project);
  StorageController.saveProjects(projectList);
  let projectButtons = DOMController.setProjectMenuDiv(projectList);
  addProjectClickHandlers(projectButtons);
}

function addProjectToggleButton() {
  DOMController.toggleAddProject();
  DOMController.clearNewProjectInput();
}

// Put functions in global scope for button onclick
window.addProjectToggleButton = addProjectToggleButton;
window.addNewProjectButton = addNewProjectButton;
window.cancelNewProjectButton = cancelNewProjectButton;
window.taskList = taskList;
window.projectList = projectList;

function load() {
  projectList = StorageController.loadProjects();
  taskList = StorageController.loadTasks();
  let projectButtonDivs = DOMController.setProjectMenuDiv(projectList);
  addProjectClickHandlers(projectButtonDivs);
}

function addProjectClickHandlers(projectButtonDivs) {
  if (projectButtonDivs.length > 0) {
    projectButtonDivs.forEach((buttonDiv) => {
      buttonDiv.removeEventListener("click", projectClickHandler);
      buttonDiv.addEventListener("click", projectClickHandler);
    });
  }
}
// Click Handlers

function addNewProjectButton() {
  const input = DOMController.getNewProjectName();
  if (isEmpty(input)) {
    alert("Project must have a name");
    return;
  } else if (projectList.includes(input)) {
    alert("Project already exists");
    return;
  } else {
    newProject(input);
  }
  addProjectToggleButton();
}

function cancelNewProjectButton() {
  addProjectToggleButton();
}

function projectClickHandler() {
  DOMController.setContentDiv(this.dataset.projectName);
}

// Validator Utilities
function isEmpty(str) {
  return !str.trim().length;
}
