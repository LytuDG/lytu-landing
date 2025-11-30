import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Filter,
  X,
  Clock,
  Calendar as CalendarIcon,
  User,
  Trash2,
} from "lucide-react";

export default function BookingCalendar() {
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Form State
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventType, setNewEventType] = useState("consultation");

  // Mock events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Consultation - Sarah Johnson",
      customer: "Sarah Johnson",
      date: "2023-10-24",
      start: "10:00",
      end: "11:00",
      type: "consultation",
      color: "indigo",
      description: "Initial consultation for website redesign project.",
    },
    {
      id: 2,
      title: "Dev Review - Michael Chen",
      customer: "Michael Chen",
      date: "2023-10-24",
      start: "14:30",
      end: "16:00",
      type: "development",
      color: "emerald",
      description: "Code review for the new feature implementation.",
    },
    {
      id: 3,
      title: "Team Sync",
      customer: "Internal Team",
      date: "2023-10-25",
      start: "09:00",
      end: "09:30",
      type: "internal",
      color: "blue",
      description: "Daily standup meeting.",
    },
  ]);

  const timeSlots = Array.from({ length: 9 }, (_, i) => i + 9); // 9 AM to 5 PM
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      id: events.length + 1,
      title: newEventTitle,
      customer: "New Customer", // Mock
      date: newEventDate,
      start: newEventTime,
      end: calculateEndTime(newEventTime), // Helper to add 1 hour
      type: newEventType,
      color: getColorByType(newEventType),
      description: "New event created from dashboard.",
    };

    setEvents([...events, newEvent]);
    setIsNewEventOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventTime("");
    setNewEventType("consultation");
  };

  const calculateEndTime = (startTime: string) => {
    if (!startTime) return "";
    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    date.setHours(date.getHours() + 1);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };

  const getColorByType = (type: string) => {
    switch (type) {
      case "consultation":
        return "indigo";
      case "development":
        return "emerald";
      case "internal":
        return "blue";
      default:
        return "slate";
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((ev) => ev.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Calendar</h1>
          <p className="text-slate-400">
            Manage your schedule and appointments.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            {(["month", "week", "day"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  view === v
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsNewEventOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <Plus size={16} /> New Event
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
        {/* Calendar Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-white">October 2023</h2>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search events..."
                className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors w-48"
              />
            </div>
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-800">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Calendar Grid (Week View Mockup) */}
        <div className="flex-1 overflow-auto flex flex-col">
          {/* Days Header */}
          <div className="grid grid-cols-8 border-b border-slate-800 bg-slate-950/50 sticky top-0 z-10">
            <div className="p-4 border-r border-slate-800 text-center text-xs font-medium text-slate-500">
              Time
            </div>
            {weekDays.map((day, i) => (
              <div
                key={day}
                className={`p-4 border-r border-slate-800 text-center ${
                  i === 6 ? "border-r-0" : ""
                }`}
              >
                <div className="text-xs font-medium text-slate-500 uppercase mb-1">
                  {day}
                </div>
                <div
                  className={`text-lg font-bold ${
                    i === 1
                      ? "text-indigo-400 bg-indigo-500/10 w-8 h-8 rounded-full flex items-center justify-center mx-auto"
                      : "text-white"
                  }`}
                >
                  {23 + i}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex-1 relative">
            {timeSlots.map((hour) => (
              <div
                key={hour}
                className="grid grid-cols-8 h-20 border-b border-slate-800/50"
              >
                <div className="border-r border-slate-800 p-2 text-xs text-slate-500 text-right">
                  {hour}:00
                </div>
                {weekDays.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      // Pre-fill time based on click
                      setNewEventTime(`${hour}:00`);
                      // Pre-fill date (mock logic)
                      if (i === 1) setNewEventDate("2023-10-24"); // Tue
                      else if (i === 2) setNewEventDate("2023-10-25"); // Wed
                      else setNewEventDate("2023-10-23"); // Default Mon

                      setIsNewEventOpen(true);
                    }}
                    className={`border-r border-slate-800/50 relative group ${
                      i === 6 ? "border-r-0" : ""
                    }`}
                  >
                    <div className="absolute inset-0 hover:bg-white/5 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <Plus size={16} className="text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Mock Events Overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none grid grid-cols-8">
              <div className="col-start-1"></div> {/* Time column spacer */}
              {events.map((event) => {
                // Simple mock positioning logic
                let colStart = 3; // Default Tue
                if (event.date.includes("25")) colStart = 4; // Wed
                if (event.date.includes("23")) colStart = 2; // Mon

                let top = 0;
                let height = 60; // Default

                if (event.start) {
                  const [h, m] = event.start.split(":").map(Number);
                  // 9:00 starts at 0px. Each hour is 80px (h-20 class is 5rem = 80px)
                  // (h - 9) * 80 + (m / 60) * 80
                  top = (h - 9) * 80 + (m / 60) * 80;
                }

                if (event.end && event.start) {
                  const [h1, m1] = event.start.split(":").map(Number);
                  const [h2, m2] = event.end.split(":").map(Number);
                  const durationHours = h2 + m2 / 60 - (h1 + m1 / 60);
                  height = durationHours * 80;
                }

                return (
                  <div
                    key={event.id}
                    className={`col-start-${colStart} relative h-full`}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                      style={{ top: `${top}px`, height: `${height}px` }}
                      className={`absolute left-1 right-1 bg-${event.color}-500/20 border-l-2 border-${event.color}-500 rounded p-2 pointer-events-auto cursor-pointer hover:bg-${event.color}-500/30 transition-colors z-10 overflow-hidden`}
                    >
                      <div
                        className={`text-xs font-bold text-${event.color}-300`}
                      >
                        {event.start} - {event.end}
                      </div>
                      <div className="text-xs font-medium text-white truncate">
                        {event.title}
                      </div>
                      {event.customer && (
                        <div
                          className={`text-[10px] text-${event.color}-200 truncate`}
                        >
                          {event.customer}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* New Event Modal */}
      {isNewEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">New Event</h3>
              <button
                onClick={() => setIsNewEventOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Client Meeting"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    required
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  Type
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  value={newEventType}
                  onChange={(e) => setNewEventType(e.target.value)}
                >
                  <option value="consultation">Consultation</option>
                  <option value="development">Development</option>
                  <option value="internal">Internal</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewEventOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/20"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md shadow-2xl animate-fade-in-up">
            <div
              className={`h-2 w-full bg-${selectedEvent.color}-500 rounded-t-xl`}
            ></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white pr-8">
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-slate-400 hover:text-white absolute top-6 right-6"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-300">
                  <CalendarIcon size={18} className="text-slate-500" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Clock size={18} className="text-slate-500" />
                  <span>
                    {selectedEvent.start} - {selectedEvent.end}
                  </span>
                </div>
                {selectedEvent.customer && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <User size={18} className="text-slate-500" />
                    <span>{selectedEvent.customer}</span>
                  </div>
                )}
                <p className="text-slate-400 text-sm leading-relaxed pt-2 border-t border-slate-800">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
