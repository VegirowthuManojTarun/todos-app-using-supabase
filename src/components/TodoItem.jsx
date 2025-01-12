import React, { useState } from "react";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false); // Track if the item is being edited
  const [editedTask, setEditedTask] = useState(todo.todo_item); // Track the edited task text

  const handleSave = () => {
    onEdit(todo.todo_id, editedTask); // Call the onEdit function with the new text
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.todo_id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
      ) : (
        <span className={todo.completed ? "completed" : ""}>
          {todo.todo_item}
        </span>
      )}
      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.todo_id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
