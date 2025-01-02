import { X } from "lucide-react";

const AddTodoModal = ({
  onAdd,
  setTodoDescription,
  setPriority,
  setIsAddModalOpen,
}) => {
  const handleCloseModal = () => setIsAddModalOpen(false);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Close button */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Add Todo</h1>
          <button
            onClick={handleCloseModal}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Add Todo Form */}
        <form className="flex flex-col gap-4 w-full mt-6" onSubmit={onAdd}>
          <input
            type="text"
            required
            placeholder="Description"
            onChange={(e) => setTodoDescription(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
          <select
            className="border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            defaultValue={"medium"}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={"medium"}>Medium</option>
            <option value={"high"}>High</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            <span>Add Task</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
