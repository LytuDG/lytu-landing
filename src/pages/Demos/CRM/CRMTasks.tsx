import { useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  Filter,
  Search,
  MoreVertical,
  X,
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  type: string;
  dueDate: string;
  time: string;
  priority: string;
  status: string;
  assignee: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Client Meeting with TechCorp",
    description: "Discuss Q4 roadmap and budget allocation.",
    type: "Meeting",
    dueDate: "Today",
    time: "10:00 AM",
    priority: "High",
    status: "Pending",
    assignee: "AD",
  },
  {
    id: 2,
    title: "Send proposal to Global Solutions",
    description: "Finalize the pricing and send the PDF.",
    type: "Email",
    dueDate: "Today",
    time: "2:00 PM",
    priority: "Medium",
    status: "Pending",
    assignee: "SJ",
  },
  {
    id: 3,
    title: "Follow up with StartUp Labs",
    description: "Check if they reviewed the demo.",
    type: "Call",
    dueDate: "Today",
    time: "4:30 PM",
    priority: "Low",
    status: "Pending",
    assignee: "AD",
  },
  {
    id: 4,
    title: "Update Q3 Sales Report",
    description: "Compile data from all regions.",
    type: "Task",
    dueDate: "Tomorrow",
    time: "9:00 AM",
    priority: "High",
    status: "Pending",
    assignee: "MC",
  },
  {
    id: 5,
    title: "Prepare presentation for Media Group",
    description: "Focus on the new features.",
    type: "Task",
    dueDate: "Oct 28",
    time: "11:00 AM",
    priority: "Medium",
    status: "Completed",
    assignee: "AD",
  },
  {
    id: 6,
    title: "Review contract with Future Systems",
    description: "Legal team needs feedback.",
    type: "Task",
    dueDate: "Oct 27",
    time: "3:00 PM",
    priority: "High",
    status: "Completed",
    assignee: "JR",
  },
];

export default function CRMTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    type: "Task",
    priority: "Medium",
    dueDate: "Today",
    time: "12:00 PM",
    assignee: "AD",
  });

  const toggleTaskStatus = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Pending" ? "Completed" : "Pending",
            }
          : task
      )
    );
  };

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now(),
      title: newTask.title || "",
      description: newTask.description || "",
      type: newTask.type || "Task",
      dueDate: newTask.dueDate || "Today",
      time: newTask.time || "12:00 PM",
      priority: newTask.priority || "Medium",
      status: "Pending",
      assignee: newTask.assignee || "AD",
    };

    setTasks([task, ...tasks]);
    setIsModalOpen(false);
    setNewTask({
      title: "",
      description: "",
      type: "Task",
      priority: "Medium",
      dueDate: "Today",
      time: "12:00 PM",
      assignee: "AD",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All"
        ? true
        : filter === "High Priority"
        ? task.priority === "High"
        : task.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks & Activities</h1>
          <p className="text-slate-400">
            Manage your daily to-dos and schedule.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2"
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {["All", "Pending", "Completed", "High Priority"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>No tasks found matching your criteria.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-slate-900 border rounded-xl p-4 transition-all group ${
                task.status === "Completed"
                  ? "border-slate-800 opacity-75"
                  : "border-slate-800 hover:border-indigo-500/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`mt-1 transition-colors ${
                    task.status === "Completed"
                      ? "text-emerald-500 hover:text-emerald-400"
                      : "text-slate-500 hover:text-indigo-500"
                  }`}
                >
                  {task.status === "Completed" ? (
                    <CheckCircle size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`font-semibold text-lg transition-all ${
                          task.status === "Completed"
                            ? "text-slate-500 line-through"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        {task.description}
                      </p>
                    </div>
                    <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar size={16} className="text-slate-500" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock size={16} className="text-slate-500" />
                      <span>{task.time}</span>
                    </div>

                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${
                        task.priority === "High"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : task.priority === "Medium"
                          ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${
                        task.type === "Meeting"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : task.type === "Call"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }`}
                    >
                      {task.type}
                    </span>

                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                        {task.assignee}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Create New Task</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 h-24 resize-none"
                  placeholder="Enter task description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Type
                  </label>
                  <select
                    value={newTask.type}
                    onChange={(e) =>
                      setNewTask({ ...newTask, type: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option>Task</option>
                    <option>Meeting</option>
                    <option>Call</option>
                    <option>Email</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors mt-4"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
