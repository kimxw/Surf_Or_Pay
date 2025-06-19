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
      3% 
      12% 
      1fr 
      10% 
      minmax(140px, 200px) /* deadline wider */
      23% 
      minmax(100px, 150px) /* verification */
      minmax(40px, 40px);
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

const ForfeitTable = ({ forfeits }) => {
  const { forfeitId, handleVerify, deleteTask } = useSurfer();

  return (
    <div className="">
      <style>{cardStyles}</style>
      <div>
        {/* Header Row Styled as a Card */}
        <div className="card" style={{ fontWeight: "bold", backgroundColor: "#f9f9f9" }}>
          <div className="card-section">#</div>
          <div className="card-section">Surfer</div>
          <div className="card-section">Task Description</div>
          <div className="card-section">Forfeit</div>
          <div className="card-section">Deadline</div>
          <div className="card-section">Status</div>
          <div className="card-section">Verification</div>
          <div className="card-section"></div>
        </div>

        {/* Task Rows */}
        {forfeits.map((task, index) => {
          console.log(`Task ${index + 1}:`, task);
          console.log("Completion Status:", task.completionStatus);
          console.log("Verification Status:", task.verificationStatus);

          return (
            <div className="card" key={index}>
              <div className="card-section">{index + 1}</div>
              <div className="card-section">{task.friendUsername}</div>
              <div className="card-section">{task.desc}</div>
              <div className="card-section">${task.credits}</div>
              <div className="card-section">{formatDateTime(task.deadline)}</div>
              <div className="card-section">{task.completionStatus}</div>
              <div className="card-section">
                {task.completionStatus === "Completed" && task.verificationStatus === "Verified" ? (
                  <button
                    disabled
                    className="bg-[#6bb266] text-[#e8ffe7] py-1 px-4 rounded-lg"
                  >
                    Verified
                  </button>
                ) : task.completionStatus === "Completed" && task.verificationStatus === "Pending" ? (
                  <button
                    onClick={() => handleVerify(forfeitId[index])}
                    className="bg-[#fed45f] text-[#936d21] py-1 px-6 rounded-lg"
                  >
                    Verify
                  </button>
                ) : task.completionStatus === "Incomplete" ? (
                  <button
                    disabled
                    className="bg-[#a8aaab] text-[#3d3d3d] py-1 px-3 rounded-lg"
                  >
                    Awaiting
                  </button>
                ) : task.completionStatus === "Overdue" ? (
                  <button onClick={() => handleVerify(forfeitId[index])}>
                    <img
                      src="/icons/OMPMIcon.svg"
                      alt="Icon"
                      className="w-36 h-auto mt-2 ml-1"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => handleVerify(forfeitId[index])}
                    className="bg-[#7b7b7b] text-gray-700 py-1 px-5 rounded-lg"
                  >
                    Unknown
                  </button>
                )}
              </div>
              <div className="card-section">
                {task.verificationStatus === "Verified" || task.completionStatus === "Overdue" 
                ? (
                  <button
                    onClick={() => deleteTask(forfeitId[index])}
                    className="p-2 rounded-lg flex items-center justify-center pt-0"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <img
                      src="/icons/deleteIcon.png"
                      alt="Delete"
                      className="w-full h-full object-contain"
                    />
                  </button>
                ) 
                : task.completionStatus === "Incomplete"
                ? (<button
                    onClick={() => deleteTask(forfeitId[index])}
                    className="bg-[#dd5f50] text-[#ffffff] py-0.25 px-1.5 mr-2 rounded-md text-lg"
                  >
                    ×
                  </button>
                  )
                : (
                  <button></button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForfeitTable;