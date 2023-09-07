import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Input } from "./UI/Input";
import { DeleteSvg } from "./assets/DeleteIcon";

interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [value, setValue] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [todos, setTodos] = useState<TaskItem[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todosDeleted, setTodosDeleted] = useState<TaskItem[]>(() => {
    const savedTodos = localStorage.getItem("todosDeleted");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const completedTasksCount = todos.filter((todo) => todo.completed).length;

  const onChangeUserName = useCallback((value: string) => {
    setValue(value);
  }, []);

  const createTask = () => {
    if (value !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: value.trim(),
          completed: false,
        },
      ]);
    }
    setValue("");
  };

  function handleDeleteClick(id: number) {
    const removedTask = todos.find((todo) => todo.id === id);

    if (removedTask) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setTodosDeleted((prevDeletedTodos) => [...prevDeletedTodos, removedTask]);
    }
  }
  function toggleTaskCompletion(id: number) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const filterAllTasks = () => {
    setFilterType("all");
  };

  const filterOnlyCompletedTasks = () => {
    setFilterType("completed");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("todosDeleted", JSON.stringify(todosDeleted));
  }, [todos, todosDeleted]);

  return (
    <div className="wrapper">
      <div className="content" data-testid="content">
        <h1>Дневник задач</h1>
        <div className="inputBlock">
          <Input value={value} onChange={onChangeUserName} />
          <button className="button" onClick={createTask} data-testid="create-btn">
            Добавить задачу
          </button>
        </div>
        <ul className="todo-list">
          {!todos.length ? (
            <h2>Нету активных задач</h2>
          ) : (
            (filterType === "all"
              ? todos
              : filterType === "completed"
              ? todos.filter((item) => item.completed)
              : []
            ).map((todo) => (
              <li key={todo.id} className="todo-item">
                <div className="blocks">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTaskCompletion(todo.id)}
                  />
                  <span
                    onClick={() => toggleTaskCompletion(todo.id)}
                    className={todo.completed ? "isCompleted" : "not-completed"}
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="blocks">
                  <span onClick={() => handleDeleteClick(todo.id)} data-testid="delete-btn">
                    <DeleteSvg />
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
        <ul className="active-todo">
          <li>
            <button className="removed-todo-btn">
              Количество удаленных задач({todosDeleted.length})
            </button>
          </li>
          <li>
            <button className="all-todo-btn" onClick={filterAllTasks}>
              Все({todos.length})
            </button>
          </li>
          <li>
            <button
              className="completed-todo-btn"
              onClick={filterOnlyCompletedTasks}
            >
              Сделанные задачи({completedTasksCount})
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
