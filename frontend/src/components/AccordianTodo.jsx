import { useState } from "react";
import Todo from "../components/Todo";
import { ChevronDown } from "lucide-react";

const AccordianTodo = ({ todos, onEdit, onDelete }) => {
  const [showHighPriority, setShowHighPriority] = useState(false);
  const [showMediumPriority, setShowMediumPriority] = useState(false);

  const highPriorityTodos = todos.filter((todo) => todo.priority === "high");
  const mediumPriorityTodos = todos.filter(
    (todo) => todo.priority === "medium"
  );

  return (
    <div className="w-[50%] rounded-lg">
      <h1 className="text-2xl text-center mb-6">Todos</h1>

      {/* High Priority Accordion */}
      <div className="border-b">
        <h2
          onClick={() => setShowHighPriority(!showHighPriority)}
          className="text-lg font-bold cursor-pointer p-4 bg-gray-200 flex justify-between items-center hover:bg-gray-300 transition-colors duration-200"
        >
          <span>High Priority</span>
          <div
            className={`transform transition-transform duration-300 ${
              showHighPriority ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={28} />
          </div>
        </h2>
        <div
          className={`grid transition-all duration-300 ease-out
          ${
            showHighPriority
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-4 justify-center p-4 bg-gray-50 transform origin-top transition-transform duration-300 ease-out">
              {highPriorityTodos.map((todo) => (
                <Todo
                  key={todo._id}
                  todo={todo}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Medium Priority Accordion */}
      <div className="border-b">
        <h2
          onClick={() => setShowMediumPriority(!showMediumPriority)}
          className="text-lg font-bold cursor-pointer p-4 bg-gray-200 flex justify-between items-center hover:bg-gray-300 transition-colors duration-200"
        >
          <span>Medium Priority</span>
          <div
            className={`transform transition-transform duration-300 ${
              showMediumPriority ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={28} />
          </div>
        </h2>
        <div
          className={`grid transition-all duration-300 ease-out
          ${
            showMediumPriority
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-4 justify-center p-4 bg-gray-50 transform origin-top transition-transform duration-300 ease-out">
              {mediumPriorityTodos.map((todo) => (
                <Todo
                  key={todo._id}
                  todo={todo}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordianTodo;
