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
    grid-template-columns: 3% 22% 30% 8% 15% 13% 8%; /* Adjusted column widths */
    text-align: left;
    color: black;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
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

const TaskTable = ({ tasks }) => {
  const handleVerify = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].verificationStatus = "verified";
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
          <div className="card-section">Shark</div>
          <div className="card-section">Task Description</div>
          <div className="card-section">Forfeit</div>
          <div className="card-section">Deadline</div>
          <div className="card-section">Status</div>
          <div className="card-section">Verify</div>
        </div>

        {/* Task Rows */}
        {tasks.map((task, index) => (
          <div className="card" key={index}>
            <div className="card-section">{index + 1}</div>
            <div className="card-section">{task.friend}</div>
            <div className="card-section">{task.desc}</div>
            <div className="card-section">{task.credits}</div>
            <div className="card-section">{task.deadline}</div>
            <div className="card-section">{task.completionStatus}</div>
            <div className="card-section">
              {task.verificationStatus === "Verified" ? (
                <button
                  disabled
                  className="bg-[#6bb266] text-[#e8ffe7] py-1 px-4 rounded-lg"
                >
                  Verified
                </button>
              ) : (
                <button
                  onClick={() => handleVerify(index)}
                  className="bg-[#29597e] text-white py-1 px-6 rounded-lg"
                >
                  Verify
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
