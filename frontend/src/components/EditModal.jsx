import { useEffect, useState } from "react";
import { updateTodo } from "../services/api";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const EditModal = ({
  setTodos,
  descriptionValue,
  isCompletedValue,
  todoId,
  ToggleEditModal,
}) => {
  const [description, setDescription] = useState(descriptionValue || "");
  const [isCompleted, setIsCompleted] = useState(isCompletedValue || false);
  const [currentTodoId, setCurrentTodoId] = useState(todoId || "");

  // Syncing description state with descriptionValue props
  useEffect(() => {
    console.log(descriptionValue);
    setDescription(descriptionValue || "");
    setIsCompleted(isCompleted || false);
    setCurrentTodoId(currentTodoId || "");
  }, [descriptionValue, isCompleted, currentTodoId]);

  const handleUpdateTodo = async () => {
    try {
      const response = await updateTodo(currentTodoId, {
        description: description,
        completed: isCompleted,
      });

      // Update the local state
      const updatedTodo = response.data.todo;
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === currentTodoId ? updatedTodo : todo
        )
      );

      console.log(updatedTodo);
      toast.success(response.data.msg);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      ToggleEditModal(false);
    }
  };

  return (
    <div className="bg-black bg-opacity-50 z-10 h-screen fixed inset-0 flex justify-center items-center">
      <div className="bg-white border-gray-300 rounded-lg shadow-lg p-6 w-96 h-auto">
        {/* Modal header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Edit Todo</h1>
          <button
            onClick={() => ToggleEditModal(false)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col gap-4 mt-6">
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            value={description}
          />
          <select
            className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            defaultValue={isCompleted}
            onChange={(e) => setIsCompleted(e.target.value)}
          >
            <option value={false}>Incomplete</option>
            <option value={true}>Complete</option>
          </select>
          <button
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors"
            onClick={handleUpdateTodo}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
