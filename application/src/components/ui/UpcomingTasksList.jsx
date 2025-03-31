import React, { useEffect, useState } from 'react';
import { CircleAlert, Clock } from 'lucide-react';
import "./upcomingTasks.css";

const tasks = [
  {
    id: 1,
    title: 'Complete Project Proposal',
    deadline: '2024-03-27T14:00:00Z', // Stored as ISO string
    forfeitAmount: 50,
  },
  {
    id: 2,
    title: 'Team Strategy Meeting',
    deadline: '2024-03-28T10:30:00Z',
    forfeitAmount: 75,
  },
  {
    id: 3,
    title: 'Client Presentation Prep',
    deadline: '2024-03-28T16:45:00Z',
    forfeitAmount: 100,
  }
];

export default function UpcomingTaskList() {
  // Define fixed dates to avoid mismatches
  const todayDateStr = '2024-03-27';
  const tomorrowDateStr = '2024-03-28';

  const tasksToday = tasks.filter(task => 
    task.deadline.split('T')[0] === todayDateStr
  );
  
  const tasksTomorrow = tasks.filter(task => 
    task.deadline.split('T')[0] === tomorrowDateStr
  );

  // Function to format time on the client only
  const useClientTime = (dateString) => {
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
      setFormattedTime(
        new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }, [dateString]);

    return formattedTime || '...';
  };

  return (
    <div className="ut-container">
      <div className="ut-section">
        <h1 className="ut-title">Today's Tasks</h1>
        <ul className="ut-list">
          {tasksToday.map(task => (
            <li key={task.id} className="ut-task">
              <div className="ut-task-info">
                <CircleAlert className="ut-icon" />
                <span className="ut-task-title">{task.title}</span>
              </div>
              <div className="ut-right-items">
                <div className = "ut-task-forfeit-container">
                    <span className="ut-forfeit-text">{"-$"+ task.forfeitAmount}</span>
                </div>
                <div className = "ut-task-deadline-container">
                    <Clock className="ut-deadline-icon" />
                    <span className="ut-deadline-text">{useClientTime(task.deadline)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="ut-section">
        <h1 className="ut-title">Tomorrow's Tasks</h1>
        <ul className="ut-list">
          {tasksTomorrow.map(task => (
            <li key={task.id} className="ut-task">
              <div className="ut-task-info">
                <CircleAlert className="ut-icon" />
                <span className="ut-task-title">{task.title}</span>
              </div>
              <div className="ut-right-items">
                <div className = "ut-task-forfeit-container">
                    <span className="ut-forfeit-text">{"-$"+ task.forfeitAmount}</span>
                </div>
                <div className = "ut-task-deadline-container">
                    <Clock className="ut-deadline-icon" />
                    <span className="ut-deadline-text">{useClientTime(task.deadline)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
