import { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList"; 
import { TodoDateTime } from "./TodoDateTime";
import "./Todo.css";

import {
  getLocalStorageTodoData,
  setLocalStorageTodoData,
} from "./TodoStorage";

export const Todo = () => {
  const [tasks, setTasks] = useState(() => getLocalStorageTodoData());

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;

    if (!content) return;

    const ifTodoContentMatched = tasks.find(
      (curTask) => curTask.content === content //if matches mean data already axist
    );

    if (ifTodoContentMatched) return; //then reurn

    setTasks((prevTasks) => [...prevTasks, { id, content, checked }]); //now its array od an object
  };

  useEffect(() => {
    setLocalStorageTodoData(tasks);
  }, [tasks]);

  const handleDeleteTodo = (value) => {
    const updatedTasks = tasks.filter((curTask) => curTask.content !== value); //delete one and show all
    setTasks(updatedTasks);
  };

  const handleClearButton = () => {
    setTasks([]);
  };

  const handleCheckedTodo = (content) => {
    const updatedTasks = tasks.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      } else {
        return curTask;
      }
    });
    setTasks(updatedTasks);
  };

  const handleEditTodo = (oldContent, newContent) => {
    if (!newContent.trim()) return;

    const ifTodoContentMatched = tasks.find(
      (curTask) => curTask.content === newContent
    );
    if (ifTodoContentMatched) return;

    const updatedTasks = tasks.map((curTask) =>
      curTask.content === oldContent
        ? { ...curTask, content: newContent }
        : curTask
    );
    setTasks(updatedTasks);
  };
  
  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <TodoDateTime />
      </header>
      <TodoForm onAddTodo={handleFormSubmit} />

      <section className="myUnOrderList">
        <ul>
          {tasks.map((curTask, index) => {
            return (
              <TodoList
                key={curTask.id}
                data={curTask.content}
                checked={curTask.checked}
                onHandleDeleteTodo={handleDeleteTodo}
                onHandleCheckedTodo={handleCheckedTodo}
                onHandleEditTodo={handleEditTodo}
              />
            );
          })}
        </ul>
      </section>
      <section className="clear-btn" onClick={handleClearButton}>
        Clear all
      </section>
    </section>
  );
};
