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
let clickOrTouch = "";

// Initialize Application On Load
const init = (() => {
  if (
    "ontouchstart" in window ||
    navigator.MaxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  ) {
    clickOrTouch = "touchstart";
    alert("TOUCHSCREEN DETECTED");
  } else {
    clickOrTouch = "click";
  }
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
  addButtonClickHandlers();
}

function addProjectClickHandlers(projectButtonDivs) {
  if (projectButtonDivs) {
    projectButtonDivs.forEach((buttonDiv) => {
      buttonDiv.removeEventListener("click", projectClickHandler);
      buttonDiv.removeEventListener("touchstart", projectClickHandler);
      buttonDiv.addEventListener(clickOrTouch, projectClickHandler);
    });
  }
}

function addButtonClickHandlers() {
  DOMController.getAddProjectButton().addEventListener(
    clickOrTouch,
    addProjectToggleButton
  );
  DOMController.getDeleteProjectButton().addEventListener(
    clickOrTouch,
    deleteProjectHandler
  );
  DOMController.getAddNewProjectButton().addEventListener(
    clickOrTouch,
    addNewProjectButton
  );
  DOMController.getCancelNewProjectButton().addEventListener(
    clickOrTouch,
    cancelNewProjectButton
  );
  DOMController.getHamburgerButton().addEventListener(
    clickOrTouch,
    toggleHamburgerMenu
  );
}

function loadTasks(projectName) {}

function setDeleteProjectButtonVisibility(projectName) {
  if (
    projectName === "Today" ||
    projectName === "Week" ||
    projectName === "All"
  ) {
    DOMController.setDeleteProjectButtonHidden(true);
  } else {
    DOMController.setDeleteProjectButtonHidden(false);
    DOMController.setDeleteProjectButtonTarget(projectName);
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
  let projectName = this.dataset.projectName;
  DOMController.setContentDiv(projectName);
  setDeleteProjectButtonVisibility(projectName);
  loadTasks(projectName);
}

function deleteProjectHandler() {
  console.log("Delete project " + this.dataset.projectName);
}

function toggleHamburgerMenu() {
  DOMController.toggleMenuSectionVisible();
}
// Validator Utilities
function isEmpty(str) {
  return !str.trim().length;
}
