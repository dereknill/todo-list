import { format, formatDistance, formatRelative, subDays } from "date-fns";

const TaskFactory = (title, dueDate, project = "none", complete = false) => {
  return {
    title,
    dueDate,
    project,
    complete,
  };
};

export default TaskFactory;
