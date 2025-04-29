import { IoMdCheckmark } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";

export const Todolist = ({
  data,
  checked,
  onHandleDeleteTodo,
  onHandleCheckedTodo,
  onHandleEditTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditeValue] = useState(data);

  const handleEditConfirm = () => {
    onHandleEditTodo(data, editValue); // Pass old and new values
    setIsEditing(false);
  };
  
  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditeValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEditConfirm()}
          />
          <button className="check-btn" onClick={onHandleCheckedTodo}>
            <IoMdCheckmark />
          </button>
        </>
      ) : (
        <>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <FaRegEdit />
          </button>
          <span className={checked ? "checkList" : "notcheckList"}>{data}</span>
          <button
            className="check-btn"
            onClick={() => onHandleCheckedTodo(data)}
          >
            <IoMdCheckmark />
          </button>
        </>
      )}

      <button className="delete-btn" onClick={() => onHandleDeleteTodo(data)}>
        <MdDeleteForever />
      </button>
    </li>
  );
};
