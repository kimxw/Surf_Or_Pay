"use client";

import React from "react";
import { useSurfer } from "@/app/contexts/SurferContext";

// Inline CSS for card styles
// In cardStyles
const cardStyles = `
  .card {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
    padding: 10px;
    display: grid;
    /* Make sure the whole table fits inside container */
    grid-template-columns:
      3%                /* # */
      12%               /* Surfer */
      minmax(150px, 2fr) /* Description wider, flexible but capped */
      10%               /* Forfeit */
      minmax(150px, 1.5fr) /* Deadline wider */
      12%               /* Status */
      minmax(100px, 120px) /* Verification */
      40px;             /* Action button fixed width */
    text-align: left;
    color: black;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    align-items: center;
    overflow: hidden; /* prevent overflow */
    font-family: Arial, sans-serif;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  /* Header row styling with truncation */
  .card.header, .card:first-child {
    font-weight: bold;
    background-color: #f9f9f9;
  }
  .card.header .card-section {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Body rows allow wrapping in description only */
  .card:not(.header) .card-section {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card:not(.header) .card-section:nth-child(3) {
    white-space: normal; /* allow wrapping for description */
    overflow-wrap: break-word;
    word-break: break-word;
  }

  /* Buttons inside cards */
  .card-section button {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  /* Images inside cards */
  .card-section img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
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
  const { forfeitId, handleVerify, rejectTask, deleteTask } = useSurfer();

  return (
    <div className="relative">
      <style>{cardStyles}</style>
      <div>
        {/* Header Row Styled as a Card */}
        <div className="card" style={{ fontWeight: "bold", backgroundColor: "#f9f9f9", position: "sticky", top: 0, zIndex: 2 }}>
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
                ) : task.verificationStatus === "Submit" ? (
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
                      className="w-24 h-auto mt-2 ml-1"
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
                      className="rounded-lg flex items-center justify-center pr-4"
                      style={{ width: "200px", height: "50px"}}
                    >
                      <img
                        src="/icons/deleteIcon.png"
                        alt="Delete"
                        style={{ width: "50px", height: "28px", objectFit: "contain" }}
                      />
                    </button>
                  ) : (task.completionStatus === "Completed" && task.verificationStatus === "Pending") 
                  ? (
                    <button
                      onClick={() => rejectTask(forfeitId[index])}
                      className="ml-1 rounded-md flex items-center justify-center bg-[#dd5f50] text-white text-lg"
                      style={{ width: "20px", height: "20px"}}
                    >
                      <img
                        src="/icons/rejectIcon.png"
                        alt="Reject"
                        style={{ width: "50px", height: "28px", objectFit: "contain" }}
                      />
                    </button>
                  )
                : (task.completionStatus === "Incomplete" || task.verificationStatus === "Pending") 
                  ? (
                    <button
                      onClick={() => deleteTask(forfeitId[index])}
                      className="ml-1 rounded-md flex items-center justify-center bg-[#dd5f50] text-white text-lg"
                      style={{ width: "20px", height: "20px"}}
                    >
                      −
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