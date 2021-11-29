import("normalize.css");
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import {
  differenceInDays,
  format,
  formatDistance,
  formatRelative,
  subDays,
} from "date-fns";

import("./style.css");

import TaskFactory from "./Factories.js";
import DOMController from "./dom-controller.js";
import StorageController from "./storage-controller.js";

let taskList = [];
let projectList = [];
let clickOrTouch = "click";
let currentProject = "Today";

// Initialize Application On Load
const init = (() => {
  //   if (
  //     "ontouchstart" in window ||
  //     navigator.MaxTouchPoints > 0 ||
  //     navigator.msMaxTouchPoints > 0
  //   ) {
  //     clickOrTouch = "touchstart";
  //     alert("TOUCHSCREEN DETECTED");
  //   } else {
  //     clickOrTouch = "click";
  //   }
  load();
})();

function newTask(title, dueDate, project, complete) {
  let task = TaskFactory(title, dueDate, project, complete);
  taskList.push(task);
  StorageController.saveTask(task);
}

function newProject(project) {
  projectList.push(project);
  StorageController.saveProjects(projectList);
  let projectButtons = DOMController.setProjectMenuDiv(projectList);
  addProjectClickHandlers(projectButtons);
  DOMController.populateSelectProjectList(projectList);
}

function addProjectToggleButton() {
  DOMController.toggleAddProject();
  DOMController.clearNewProjectInput();
}

function load() {
  loadProjects();
  taskList = StorageController.loadTasks();
  addButtonClickHandlers();
  setContent(currentProject);
  DOMController.populateSelectProjectList(projectList);
}

function loadProjects() {
  projectList = StorageController.loadProjects();
  let projectButtonDivs = DOMController.setProjectMenuDiv(projectList);
  addProjectClickHandlers(projectButtonDivs);
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
  DOMController.getAddTaskToggleButton().addEventListener(
    clickOrTouch,
    toggleAddTaskMenu
  );
  DOMController.getAddTaskCancel().addEventListener(
    clickOrTouch,
    addTaskCancel
  );
  DOMController.getAddTaskConfirm().addEventListener(
    clickOrTouch,
    addTaskConfirm
  );
}

function setContent(projectName) {
  DOMController.setContentDiv(projectName);
  setDeleteProjectButtonVisibility(projectName);
  populateTasks(projectName);
  if (checkResponsiveBreakpoint()) {
    DOMController.setMenuSectionVisible(false);
  }
  DOMController.hideAddTaskMenu();
  currentProject = projectName;
}

function populateTasks(projectName) {
  DOMController.clearTasks();
  if (projectName === "Today") {
    _populateTasksToday();
  } else if (projectName === "Week") {
    _populateTasksWeek();
  } else if (projectName === "All") {
    _populateTasksAll();
  }
}

function _populateTasksToday() {
  taskList.forEach((task) => {
    if (task.dueDate == format(new Date(), "yyyy-MM-dd")) {
      _initNewTask(task);
    }
  });
}

function _populateTasksWeek() {
  taskList.forEach((task) => {
    const taskDate = new Date(task.dueDate);
    taskDate.setUTCHours(0, 0, 0, 0);
    const todaysDate = new Date();
    todaysDate.setUTCHours(0, 0, 0, 0);

    if (differenceInDays(todaysDate, taskDate) <= 7 && taskDate >= todaysDate) {
      _initNewTask(task);
    }
  });
}

function _populateTasksAll() {
  taskList.forEach((task) => {
    _initNewTask(task);
  });
}

function _initNewTask(task) {
  let deleteTaskButton = DOMController.addTask(task);
  deleteTaskButton.addEventListener(clickOrTouch, deleteTaskHandler);
  deleteTaskButton.dataset.taskName = task.title;
}

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
  } else if (_checkReservedProjectNames(input)) {
    alert("Project name is reserved");
    return;
  } else {
    newProject(input);
  }
  addProjectToggleButton();
}

function _checkReservedProjectNames(input) {
  let pattern = /Projects|All|Week|Today|None|none/g;

  return input.match(pattern);
}

function cancelNewProjectButton() {
  addProjectToggleButton();
}

function projectClickHandler() {
  setContent(this.dataset.projectName);
}

function checkResponsiveBreakpoint() {
  let responsiveBreakpoint = window.matchMedia("(max-width: 700px)");
  return responsiveBreakpoint.matches;
}

function deleteProjectHandler() {
  let projectName = this.dataset.projectName;
  projectList.splice(projectList.indexOf(projectName), 1);
  StorageController.saveProjects(projectList);
  loadProjects();
  setContent("Today");
}

function toggleHamburgerMenu() {
  DOMController.toggleMenuSectionVisible();
}

function toggleAddTaskMenu() {
  DOMController.toggleAddTask();
}

function addTaskCancel() {
  DOMController.clearAddTaskInputs();
  DOMController.toggleAddTask();
}

function addTaskConfirm() {
  const taskInput = DOMController.getAddTaskInput();
  if (isEmpty(taskInput.taskName)) {
    alert("Task name is required");
    return;
  }

  if (isEmpty(taskInput.taskDate)) {
    alert("Task date is required");
    return;
  }

  if (taskList.some((task) => task.title === taskInput.taskName)) {
    alert("Task already exists");
    return;
  }
  newTask(taskInput.taskName, taskInput.taskDate, taskInput.taskProject, false);
  toggleAddTaskMenu();
}

function deleteTaskHandler() {
  console.log("Delete task: " + this.dataset.taskName);
  let taskName = this.dataset.taskName;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].title === taskName) {
      taskList.splice(i, 1);
      break;
    }
  }

  StorageController.deleteTask(taskName);
  populateTasks(currentProject);
}
// Validator Utilities
function isEmpty(str) {
  return !str.trim().length;
}

window.taskList = taskList;
