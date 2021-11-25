export const updateList = (name, priority, status) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const data = [...tasks, { name, priority, status }];
  localStorage.setItem("tasks", JSON.stringify(data));
};

export const insertTaskList = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const insertIntoUserList = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const data = [...users, user];
  localStorage.setItem("users", JSON.stringify(data));
};

export const resetUserList = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};
