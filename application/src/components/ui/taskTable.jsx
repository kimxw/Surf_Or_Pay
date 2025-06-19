"use client";

import React from "react";
import { useSurfer } from "@/app/contexts/SurferContext";

// Inline CSS for card styles
const cardStyles = `
  .card {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
    padding: 10px;
    display: grid;
    grid-template-columns: 
      3%                     /* index */
      12%                    /* surfer */
      minmax(150px, 1fr)     /* task description */
      8%                     /* forfeit */
      minmax(180px, 18%)     /* deadline: wider now */
      13%                    /* status */
      minmax(100px, 12%)     /* verification */
      minmax(40px, 40px);    /* delete */

    text-align: left;
    color: black;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    align-items: center; /* Vertically center items */
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .card-section {
    padding: 0 8px;
  }

  .card-section:first-child {
    font-weight: bold;
    color: #333;
  }

  .card-section:last-child {
    color: #555;
    display: flex;
    justify-content: center; /* Ensures the button stays aligned */
    align-items: center;
  }

  .card-section button {
    white-space: nowrap; /* Prevents text wrapping */
  }
`;

function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-SG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const TaskTable = ({ tasks }) => {
  const { deleteTask, completed, taskId } = useSurfer();

  return (
    <div>
      <style>{cardStyles}</style>
      <div>
        {/* Header Row Styled as a Card */}
        <div className="card" style={{ fontWeight: "bold", backgroundColor: "#f9f9f9" }}>
          <div className="card-section">#</div>
          <div className="card-section">Shark</div>
          <div className="card-section">Task Description</div>
          <div className="card-section">Forfeit</div>
          <div className="card-section">Deadline</div>
          <div className="card-section">Status</div>
          <div className="card-section">Verification</div>
          <div className="card-section"></div>
        </div>

        {/* Task Rows */}
        {tasks.map((task, index) => (
          <div className="card" key={index}>
            <div className="card-section">{index + 1}</div>
            <div className="card-section">{task.friendUsername}</div>
            <div className="card-section">{task.desc}</div>
            <div className="card-section">${task.credits}</div>
            <div className="card-section">{formatDateTime(task.deadline)}</div>
            <div className="card-section">{task.completionStatus}</div>
            <div className="card-section">
            {(task.completionStatus === "Completed" && task.verificationStatus === "Verified") ? (
              <button
                disabled
                className="bg-[#6bb266] text-[#e8ffe7] py-1 px-4 rounded-lg"
              >
                Verified
              </button>
            ) : (task.verificationStatus === "Pending") ? (
              <button
                disabled
                className="bg-[#fed45f] text-[#936d21] py-1 px-3.5 rounded-lg"
              >
                Pending
              </button>
            ) : (task.completionStatus === "Incomplete") ? (
              <button
                onClick={() => completed(taskId[index])}
                className="bg-[#29597e] text-white py-1 px-5 rounded-lg"
              >
                Submit
              </button>
            ) : (task.completionStatus === "Overdue" )? (
              <button
              >
                <img
                  src="/icons/OMPMIcon.svg"
                  alt="Icon"
                  className="w-36 h-auto mt-2 ml-1"
                />
              </button>
            ) : (
              <button
                disabled
                className="bg-[#7b7b7b] text-gray-700 py-1 px-5 rounded-lg"
              >
                Unknown
              </button>
            )}
            </div>
            <div className="card-section">
            {task.verificationStatus === "Verified" ? (
            <button
              onClick = {() => deleteTask(taskId[index])}
              className="p-2 rounded-lg flex items-center justify-center pt-0"
              style={{ width: "40px", height: "40px" }} // Adjust size to match icon size
            >
              <img
                  src="/icons/deleteIcon.png" // Replace with your verified icon
                  alt="Verified"
                  className="w-full h-full object-contain" // Make the icon fill the button
                />
              </button>
            ) : (
              <button>
              </button>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTable;