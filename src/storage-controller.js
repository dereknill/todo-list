const StorageController = (() => {
  const _storage = window.localStorage;

  function saveTask(task) {
    _storage.setItem("TASK" + task.title, JSON.stringify(task));
  }

  function saveProjects(projectList) {
    _storage.setItem("PROJECTS", JSON.stringify(projectList));
  }

  function loadProjects() {
    return JSON.parse(_storage.getItem("PROJECTS"));
  }

  function loadTasks() {
    let keys = Object.keys(_storage);
    let taskArray = [];
    keys.forEach((key) => {
      if (key.substr(0, 4) == "TASK") {
        let parsedObject = JSON.parse(_storage.getItem(key));
        taskArray.push(parsedObject);
      }
    });
    return taskArray;
  }

  return { saveTask, saveProjects, loadProjects, loadTasks };
})();

export default StorageController;
