import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [events, setEvents] = useState([
    { event_date: new Date(2025, 3, 1), event_title: "April Fool's Day", event_theme: "blue" },
    { event_date: new Date(2025, 3, 10), event_title: "Birthday", event_theme: "red" },
    { event_date: new Date(2025, 3, 16), event_title: "Upcoming Event", event_theme: "green" },
  ]);
  const [eventModal, setEventModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    event_title: "",
    event_date: "",
    event_theme: "blue",
  });

  useEffect(() => {
    initCalendar();
  }, [month, year]);

  const initCalendar = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month).getDay();

    setBlankDays(Array.from({ length: firstDay }, (_, i) => i + 1));
    setNoOfDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const handleEventSubmit = () => {
    setEvents([
      ...events,
      {
        ...eventDetails,
        event_date: new Date(eventDetails.event_date),
      },
    ]);
    setEventModal(false);
    setEventDetails({ event_title: "", event_date: "", event_theme: "blue" });
  };

  return (
    <div className="antialiased sans-serif bg-gray-100 h-screen">
      <div className="container mx-auto px-4 py-2 md:py-24">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex items-center justify-between py-2 px-6">
            <div>
              <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
              <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
            </div>
            <div className="border rounded-lg px-1">
              <button
                onClick={() => setMonth((prev) => Math.max(prev - 1, 0))}
                disabled={month === 0}
                className={`leading-none rounded-lg inline-flex items-center p-1 hover:bg-gray-200 ${
                  month === 0 ? "opacity-25 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setMonth((prev) => Math.min(prev + 1, 11))}
                disabled={month === 11}
                className={`leading-none rounded-lg inline-flex items-center p-1 hover:bg-gray-200 ${
                  month === 11 ? "opacity-25 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="-mx-1 -mb-1">
            <div className="flex flex-wrap">
              {DAYS.map((day, i) => (
                <div key={i} className="px-2 py-2 w-[14.26%] text-center text-gray-600 text-sm uppercase font-bold">
                  {day}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap border-t border-l">
              {blankDays.map((_, i) => (
                <div key={i} className="text-center border-r border-b px-4 pt-2 w-[14.28%] h-[120px]"></div>
              ))}
              {noOfDays.map((date) => (
                <div
                  key={date}
                  className="px-4 pt-2 border-r border-b relative w-[14.28%] h-[120px]"
                  onClick={() => {
                    setEventDetails({ ...eventDetails, event_date: `${year}-${month + 1}-${date}` });
                    setEventModal(true);
                  }}
                >
                  <div
                    className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer rounded-full ${
                      isToday(date) ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-200"
                    }`}
                  >
                    {date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {eventModal && (
        <div className="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Add Event Details</h2>
            <div className="mb-4">
              <label className="block text-gray-800 font-bold text-sm mb-1">Event title</label>
              <input
                type="text"
                value={eventDetails.event_title}
                onChange={(e) => setEventDetails({ ...eventDetails, event_title: e.target.value })}
                className="w-full bg-gray-200 border-2 rounded-lg px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-bold text-sm mb-1">Event date</label>
              <input
                type="text"
                value={eventDetails.event_date}
                readOnly
                className="w-full bg-gray-200 border-2 rounded-lg px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-bold text-sm mb-1">Select a theme</label>
              <select
                value={eventDetails.event_theme}
                onChange={(e) => setEventDetails({ ...eventDetails, event_theme: e.target.value })}
                className="w-full bg-gray-200 border-2 rounded-lg px-4 py-2"
              >
                <option value="blue">Blue Theme</option>
                <option value="red">Red Theme</option>
                <option value="yellow">Yellow Theme</option>
                <option value="green">Green Theme</option>
                <option value="purple">Purple Theme</option>
              </select>
            </div>
            <div className="text-right">
              <button
                onClick={() => setEventModal(false)}
                className="bg-white text-gray-700 border px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleEventSubmit}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
