import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import supabase from "../supabaseClient";
import { useAuth } from "../AuthContext";
import Header from "./Header";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todo_items")
      .select("*")
      .eq("user_id", user.id);

    if (error) console.error("Error fetching todos:", error);
    else setTodos(data);
  };

  const addTodo = async () => {
    if (newTask.trim() === "") return;

    const { data, error } = await supabase
      .from("todo_items")
      .insert([{ todo_item: newTask, completed: false, user_id: user.id }])
      .select();

    if (error) console.error("Error adding todo:", error);
    else setTodos((prev) => [...prev, ...data]);

    setNewTask("");
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.todo_id === id);
    if (!todo) return;

    const { error } = await supabase
      .from("todo_items")
      .update({ completed: !todo.completed })
      .eq("todo_id", id);

    if (error) {
      console.error("Error toggling todo:", error);
    } else {
      setTodos((prev) =>
        prev.map((t) =>
          t.todo_id === id ? { ...t, completed: !t.completed } : t
        )
      );
    }
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todo_items").delete().eq("todo_id", id);

    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodos((prev) => prev.filter((t) => t.todo_id !== id));
    }
  };

  const editTodo = async (id, updatedTask) => {
    if (updatedTask.trim() === "") return;

    const { error } = await supabase
      .from("todo_items")
      .update({ todo_item: updatedTask })
      .eq("todo_id", id);

    if (error) {
      console.error("Error editing todo:", error);
    } else {
      setTodos((prev) =>
        prev.map((t) =>
          t.todo_id === id ? { ...t, todo_item: updatedTask } : t
        )
      );
    }
  };

  return (
    <div className="todo-list-container">
      <Header />
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
        className="add-task"
      />
      <button onClick={addTodo}>Add</button>
      <br />
      <br />
      {todos.map((todo) => (
        <TodoItem
          key={todo.todo_id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;

