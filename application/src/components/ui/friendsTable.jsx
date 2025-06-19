"use client";

// Inline CSS for card styles
const cardStyles = `
  .card {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Stronger shadow */
    margin-bottom: 8px;
    padding: 10px;
    display: grid; /* Use grid layout instead of flex */
    grid-template-columns: 10% 30% 60%; /* Set column widths */
    text-align: left; /* Ensure all content inside the card is left-aligned */
    color: black;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    font-family: Arial, sans-serif;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
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
  }
`;

const FriendsTable = ({ friends }) => {
  return (
    <div>
      <style>{cardStyles}</style>
      <div>
        {/* Header Row Styled as a Card */}
        <div className="card" style={{ fontWeight: "bold", backgroundColor: "#f9f9f9", position: "sticky", top: 0, zIndex: 2  }}>
          <div className="card-section">#</div>
          <div className="card-section">Username</div>
          <div className="card-section">Email</div>
        </div>
        {/* Friend Rows */}
        {friends.map((friend, index) => (
          <div className="card" key={index}>
            <div className="card-section">{index + 1}</div>
            <div className="card-section">{friend.username}</div>
            <div className="card-section">{friend.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsTable;
