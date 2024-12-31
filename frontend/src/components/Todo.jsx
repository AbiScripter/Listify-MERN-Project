import { CircleCheck } from "lucide-react";

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

const Todo = ({ todo, onEdit, onDelete }) => {
  console.log(todo);
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
          className="border bg-gray-400 px-6 py-1 rounded"
        >
          Edit
        </button>
        <button
          className="border bg-red-500 px-6 py-1 rounded"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
