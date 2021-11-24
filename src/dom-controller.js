const DOMController = (() => {
  const contentDiv = document.querySelector(".content-inner-container");
  const projectMenuDiv = document.querySelector(".project-menu-container");
  const addProjectButton = document.querySelector("#add-project-button");
  const addProjectFormDiv = document.querySelector(".add-project-container");

  function setProjectMenuDiv(projects) {
    _removeAllChildren(projectMenuDiv);

    if (projects === null) {
      return;
    }
    projects.forEach((project) => {
      let button = document.createElement("button");
      let icon = document.createElement("i");
      let text = document.createElement("span");
      button.classList.add("menu-section-button");
      icon.classList.add("fas", "fa-list", "menu-icon");
      text.innerHTML = project;
      button.appendChild(icon);
      button.appendChild(text);
      projectMenuDiv.appendChild(button);
    });
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
  return {
    setProjectMenuDiv,
    toggleAddProject,
  };
})();

export default DOMController;
