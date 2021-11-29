const DOMController = (() => {
  const contentDiv = document.querySelector(".content-inner-container");
  const projectMenuDiv = document.querySelector(".project-menu-container");
  const addProjectButton = document.querySelector("#add-project-button");
  const addProjectFormDiv = document.querySelector(".add-project-container");
  const projectInputDiv = document.querySelector(".add-project-input");
  const todayButton = document.querySelector("#today-button");
  const weekButton = document.querySelector("#week-button");
  const allButton = document.querySelector("#all-button");
  const deleteProjectButton = document.querySelector(".button-delete-project");
  const addNewProjectButton = document.querySelector(".button-add");
  const cancelNewProjectButton = document.querySelector(".button-cancel");
  const menuSectionDiv = document.querySelector(".menu-section");
  const hamburgerButton = document.querySelector(".hamburger-button");
  const addTaskToggleDiv = document.querySelector(".add-task-toggle-container");
  const addTaskFormDiv = document.querySelector(".add-task-container");
  const addTaskTitleInput = document.querySelector(".add-task-title-input");
  const addTaskDateInput = document.querySelector(".add-task-date-input");
  const addTaskProjectInput = document.querySelector(
    ".add-task-project-select-input"
  );
  const addTaskConfirm = document.querySelector(".add-task-confirm");
  const addTaskCancel = document.querySelector(".add-task-cancel");
  const tasksDiv = document.querySelector(".tasks");

  function setProjectMenuDiv(projects) {
    _removeAllChildren(projectMenuDiv);

    if (projects === null) {
      return;
    }
    let projectButtonDivs = [];
    projects.forEach((project) => {
      let button = document.createElement("div");
      let icon = document.createElement("i");
      let text = document.createElement("span");
      button.classList.add("menu-section-button");
      icon.classList.add("fas", "fa-list", "menu-icon");
      text.innerHTML = project;
      button.appendChild(icon);
      button.appendChild(text);
      button.setAttribute("data-project-name", project);
      projectMenuDiv.appendChild(button);
      projectButtonDivs.push(button);
    });

    projectButtonDivs.push(todayButton);
    projectButtonDivs.push(weekButton);
    projectButtonDivs.push(allButton);
    return projectButtonDivs;
  }

  function _removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function toggleAddProject() {
    if (addProjectButton.classList.contains("hide")) {
      addProjectButton.classList.remove("hide");
    } else {
      addProjectButton.classList.add("hide");
    }

    if (addProjectFormDiv.classList.contains("hide")) {
      addProjectFormDiv.classList.remove("hide");
    } else {
      addProjectFormDiv.classList.add("hide");
    }
  }

  function getNewProjectName() {
    return projectInputDiv.value;
  }

  function clearNewProjectInput() {
    projectInputDiv.value = "";
  }

  function setContentDiv(title) {
    _setContentTitle(title);
  }

  function _setContentTitle(title) {
    let titleDiv = document.querySelector(".content-title");
    titleDiv.innerHTML = title;
  }

  function setDeleteProjectButtonHidden(isHidden) {
    if (isHidden) {
      deleteProjectButton.classList.add("hide");
    } else {
      deleteProjectButton.classList.remove("hide");
    }
  }

  function getDeleteProjectButton() {
    return deleteProjectButton;
  }
  function getAddProjectButton() {
    return addProjectButton;
  }

  function setDeleteProjectButtonTarget(projectName) {
    deleteProjectButton.setAttribute("data-project-name", projectName);
  }

  function getAddNewProjectButton() {
    return addNewProjectButton;
  }

  function getCancelNewProjectButton() {
    return cancelNewProjectButton;
  }

  function toggleMenuSectionVisible() {
    if (menuSectionDiv.classList.contains("unhide-menu")) {
      menuSectionDiv.classList.remove("unhide-menu");
    } else {
      menuSectionDiv.classList.add("unhide-menu");
    }
  }

  function toggleAddTask() {
    if (addTaskToggleDiv.classList.contains("hide")) {
      addTaskToggleDiv.classList.remove("hide");
    } else {
      addTaskToggleDiv.classList.add("hide");
    }

    if (addTaskFormDiv.classList.contains("hide")) {
      addTaskFormDiv.classList.remove("hide");
    } else {
      addTaskFormDiv.classList.add("hide");
    }
  }

  function hideAddTaskMenu() {
    if (addTaskToggleDiv.classList.contains("hide")) {
      addTaskToggleDiv.classList.remove("hide");
    }

    if (!addTaskFormDiv.classList.contains("hide")) {
      addTaskFormDiv.classList.add("hide");
    }
  }

  function setMenuSectionVisible(isVisible) {
    if (isVisible && !menuSectionDiv.classList.contains("unhide-menu")) {
      menuSectionDiv.classList.add("unhide-menu");
    } else {
      menuSectionDiv.classList.remove("unhide-menu");
    }
  }

  function getAddTaskToggleButton() {
    return addTaskToggleDiv;
  }

  function getHamburgerButton() {
    return hamburgerButton;
  }

  function getAddTaskConfirm() {
    return addTaskConfirm;
  }

  function getAddTaskCancel() {
    return addTaskCancel;
  }

  function clearAddTaskInputs() {
    addTaskTitleInput.value = "";
    addTaskDateInput.value = "";
    addTaskProjectInput.value = "";
  }

  function getAddTaskInput() {
    const taskName = addTaskTitleInput.value;
    const taskDate = addTaskDateInput.value;
    let taskProject = addTaskProjectInput.value;

    if (taskProject === "Projects") {
      taskProject = undefined;
    }
    return {
      taskName,
      taskDate,
      taskProject,
    };
  }

  function getAddTaskDateElement() {
    return addTaskDateInput;
  }

  function addTasks(taskList) {
    taskList.foreach((task) => {
      addTask(task);
    });
  }
  function addTask(task) {
    let taskContainer = document.createElement("div");
    let checkBoxContainer = document.createElement("div");
    let titleContainer = document.createElement("div");
    let dueDateContainer = document.createElement("div");
    let projectContainer = document.createElement("div");
    let deleteContainer = document.createElement("div");
    let checkBox = document.createElement("input");
    let deleteIcon = document.createElement("i");

    if (task.complete) {
      checkBox.checked = true;
      taskContainer.classList.add("completed-text");
    }
    taskContainer.classList.add("task-container");

    checkBox.classList.add("task-checkbox");
    checkBox.type = "checkbox";
    checkBoxContainer.appendChild(checkBox);

    titleContainer.innerHTML = task.title;
    dueDateContainer.innerHTML = task.dueDate;

    if (task.project === "none") {
      projectContainer.innerHTML = "";
    } else {
      projectContainer.innerHTML = task.project;
    }

    deleteIcon.classList.add("fas", "fa-trash-alt");
    deleteContainer.appendChild(deleteIcon);
    deleteContainer.style.cursor = "pointer";

    taskContainer.appendChild(checkBoxContainer);
    taskContainer.appendChild(titleContainer);
    taskContainer.appendChild(dueDateContainer);
    taskContainer.appendChild(projectContainer);
    taskContainer.appendChild(deleteContainer);

    tasksDiv.appendChild(taskContainer);
    return { checkBox, deleteContainer };
  }

  function clearTasks() {
    _removeAllChildren(tasksDiv);
  }

  function populateSelectProjectList(projectList) {
    _removeAllChildren(addTaskProjectInput);
    let display = document.createElement("option");
    display.disabled = true;
    display.selected = true;
    display.hidden = true;
    display.innerHTML = "Projects";
    addTaskProjectInput.appendChild(display);
    let none = document.createElement("option");
    none.value = "none";
    none.innerHTML = "None";
    addTaskProjectInput.appendChild(none);
    projectList.forEach((projectName) => {
      let option = document.createElement("option");
      option.value = projectName;
      option.innerHTML = projectName;
      addTaskProjectInput.appendChild(option);
    });
  }

  return {
    setProjectMenuDiv,
    toggleAddProject,
    getNewProjectName,
    clearNewProjectInput,
    setContentDiv,
    getAddProjectButton,
    setDeleteProjectButtonHidden,
    getDeleteProjectButton,
    setDeleteProjectButtonTarget,
    getAddNewProjectButton,
    getCancelNewProjectButton,
    getHamburgerButton,
    toggleMenuSectionVisible,
    setMenuSectionVisible,
    toggleAddTask,
    getAddTaskToggleButton,
    clearAddTaskInputs,
    getAddTaskConfirm,
    getAddTaskCancel,
    getAddTaskInput,
    addTask,
    clearTasks,
    populateSelectProjectList,
    hideAddTaskMenu,
    getAddTaskDateElement,
    addTasks,
  };
})();

export default DOMController;
