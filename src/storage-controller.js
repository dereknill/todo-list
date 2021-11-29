const StorageController = (() => {
  const _storage = window.localStorage;

  function saveTask(task) {
    _storage.setItem("TASK" + task.title, JSON.stringify(task));
  }

  function saveProjects(projectList) {
    _storage.setItem("PROJECTS", JSON.stringify(projectList));
  }

  function loadProjects() {
    const projects = JSON.parse(_storage.getItem("PROJECTS"));
    if (projects) {
      return projects;
    } else {
      return [];
    }
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

  function deleteTask(taskTitle) {
    _storage.removeItem("TASK" + taskTitle);
  }

  function setTaskComplete(taskTitle, complete) {
    let task = JSON.parse(_storage.getItem("TASK" + taskTitle));
    task.complete = complete;
    deleteTask(taskTitle);
    saveTask(task);
  }
  return {
    saveTask,
    saveProjects,
    loadProjects,
    loadTasks,
    deleteTask,
    setTaskComplete,
  };
})();

export default StorageController;
