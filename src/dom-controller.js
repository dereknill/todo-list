const DOMController = (() => {
  const contentDiv = document.querySelector(".content-inner-container");
  const projectMenuDiv = document.querySelector(".project-menu-container");
  const addProjectButton = document.querySelector("#add-project-button");
  const addProjectFormDiv = document.querySelector(".add-project-container");
  const projectInputDiv = document.querySelector(".add-project-input");

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
  return {
    setProjectMenuDiv,
    toggleAddProject,
    getNewProjectName,
    clearNewProjectInput,
    setContentDiv,
  };
})();

export default DOMController;
