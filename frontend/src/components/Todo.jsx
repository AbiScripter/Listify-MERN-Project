import { CircleCheck } from "lucide-react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // Remove time components for comparison
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return "Today";
  } else if (date.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
    }).format(date);
  }
}

const Todo = ({ todo, onEdit, onDelete }) => {
  return (
    <div className="flex gap-4 justify-between items-center p-2 border rounded-md">
      <CircleCheck
        size={36}
        fill={todo.completed ? "#088F8F" : "white"}
        color={"#D3D3D3"}
      />

      <p className="capitalize flex-grow truncate text-center">
        {todo.description}
      </p>

      <p className="capitalize flex-shrink-0 whitespace-nowrap text-gray-500 mr-4">
        {formatDate(todo.createdAt)}
      </p>

      <div className="flex gap-2 text-white flex-shrink-0">
        <button
          onClick={() => onEdit(todo.description, todo.completed, todo._id)}
          className="border bg-gray-600 hover:bg-gray-700 px-6 py-1 rounded"
        >
          Edit
        </button>
        <button
          className="border bg-red-500 hover:bg-red-600 px-6 py-1 rounded"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
