const todokey = "reactTodo";

export const getLocalStorageTodoData = () => {
  const rawTodos = localStorage.getItem(todokey);
  if (!rawTodos) return [];
  return JSON.parse(rawTodos);
};

export const setLocalStorageTodoData = (tasks) => {
  return localStorage.setItem(todokey, JSON.stringify(tasks));
};
