const TaskFactory = (title, description, dueDate, project = "none") => {
  return {
    title,
    description,
    dueDate,
    project,
  };
};

export default TaskFactory;
