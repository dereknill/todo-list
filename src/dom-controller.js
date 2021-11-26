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

  function setContentDiv(title, tasks) {
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

  function setMenuSectionVisible(isVisible) {
    if (isVisible && !menuSectionDiv.classList.contains("unhide-menu")) {
      menuSectionDiv.classList.add("unhide-menu");
    } else {
      menuSectionDiv.classList.remove("unhide-menu");
    }
  }

  function getHamburgerButton() {
    return hamburgerButton;
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
  };
})();

export default DOMController;
