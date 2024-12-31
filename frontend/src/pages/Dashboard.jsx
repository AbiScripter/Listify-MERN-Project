import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos } from "../services/api";
import { toast } from "react-toastify";
import EditModal from "../components/EditModal";
import AccordianTodo from "../components/AccordianTodo";
import AddTodoModal from "../components/AddTodoModal";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [todoDescription, setTodoDescription] = useState("");
  const [isTodoCompleted, setIsTodoCompleted] = useState(false);
  const [priority, setPriority] = useState("medium");
  const [todoId, setTodoId] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAddModal = () => setIsAddModalOpen(true);

  //!Fetch todos on app load
  useEffect(() => {
    async function fetchTodos() {
      try {
        const todosData = await getTodos();
        console.log(todosData);
        setTodos(todosData.data);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }

    fetchTodos();
  }, []);

  // !Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  //!AddTodod
  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await createTodo({
        description: todoDescription,
        priority: priority,
      });

      //update local state
      setTodos((prevTodos) => [...prevTodos, response.data.todo]);

      console.log(response.data.msg);
      toast.success(response.data.msg);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  //!DeleteTodo
  const handleDeleteTodo = async (id) => {
    try {
      const response = await deleteTodo(id);
      console.log(deleteTodo);

      // Update local state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));

      toast.success(response.data.msg);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  //!Toggle Edit Modal
  const ToggleEditModal = (state) => {
    setEditModalOpen(state);
  };

  // !Edit Todo
  const handleEditTodo = (description, completed, id) => {
    setTodoDescription(description); // Set the description of the todo being edited
    setIsTodoCompleted(completed);
    setTodoId(id);
    ToggleEditModal(true);
  };

  return (
    <div className="flex flex-col items-center gap-20 h-screen bg-gray-700">
      {/* Logout Btn */}
      <button
        className="absolute right-2 top-2 border-gray-400 bg-gray-300 px-4 py-1"
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Add Todo Form Modal */}
      <button
        onClick={handleOpenAddModal}
        className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition-colors mt-10"
      >
        Open Add Todo Form
      </button>

      {/* Todo List */}
      <AccordianTodo
        todos={todos}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
      />

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddTodoModal
          onAdd={handleAddTodo}
          setTodoDescription={setTodoDescription}
          setPriority={setPriority}
          setIsAddModalOpen={setIsAddModalOpen}
        />
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <EditModal
          setTodos={setTodos}
          descriptionValue={todoDescription}
          isCompleted={isTodoCompleted}
          todoId={todoId}
          ToggleEditModal={ToggleEditModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
