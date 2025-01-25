"use client";

// Inline CSS for card styles
const cardStyles = `
  .card {
    background-color: white;
    opacity: 0.95;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
    padding: 10px;
    display: grid;
    grid-template-columns: 3% 12% 33% 8% 15% 13% 8% 8%; /* Adjusted column widths */
    text-align: left;
    color: black;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    align-items: center; /* Vertically center items */
  }

  .card:hover {
    transform: translateY(-4px);
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

const ForfeitTable = ({ forfeits }) => {
  const handleVerify = (index) => {
    const updatedForfeits = [...forfeits];
    updatedForfeits[index].verificationStatus = "verified";
    // Assuming you have a setState function to update the tasks list
    // setTasks(updatedTasks);
  };

  return (
    <div>
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
        {forfeits.map((task, index) => (
          <div className="card" key={index}>
            <div className="card-section">{index + 1}</div>
            <div className="card-section">{task.friendUsername}</div>
            <div className="card-section">{task.desc}</div>
            <div className="card-section">{task.credits}</div>
            <div className="card-section">{task.deadline}</div>
            <div className="card-section">{task.completionStatus}</div>
            <div className="card-section">
            {task.completionStatus === "Complete" && task.verificationStatus == 'Verified' ? (
              <button
                disabled
                className="bg-[#6bb266] text-[#e8ffe7] py-1 px-4 rounded-lg"
              >
                Verified
              </button>
            ) : task.completionStatus === "Complete" && task.verificationStatus == 'Pending' ? (
              <button
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
              <button
                onClick={() => handleVerify(index)}
              >
                <img
                  src="/icons/OMPMIcon.svg"
                  alt="Icon"
                  className="w-36 h-auto mt-2 ml-1"
                />
              </button>
            ) : (
              <button
                onClick={() => handleVerify(index)}
                className="bg-[#7b7b7b] text-gray-700 py-1 px-5 rounded-lg"
              >
                Unknown
              </button>
            )}
            </div>
            <div className="card-section">
            {task.verificationStatus === "Verified" || task.completionStatus == "Overdue" ? (
            <button
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

export default ForfeitTable;
