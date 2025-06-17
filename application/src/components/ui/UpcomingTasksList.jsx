import React from 'react';
import { CircleAlert, Clock } from 'lucide-react';
import { useSurfer } from '../../app/contexts/SurferContext';
import "./upcomingTasks.css";

export default function UpcomingTaskList() {
  const { taskForDashboard } = useSurfer();

  const todayDateStr = new Date().toISOString().split('T')[0];

  const tomorrowDateStr = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];


  const tasksToday = taskForDashboard.filter(task =>
    task.deadline.split('T')[0] === todayDateStr
  );

  const tasksTomorrow = taskForDashboard.filter(task =>
    task.deadline.split('T')[0] === tomorrowDateStr
  );

  function formatClientTime(dateString) {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // console.log("tasksToday:", tasksToday);
  // console.log("tasksTomorrow:", tasksTomorrow);

  return (
    <div className="ut-container">
      <div className="ut-section">
        <h1 className="ut-title">Today's Tasks</h1>
        <ul className="ut-list">
          {tasksToday.length === 0 && <li style={{color: "#FFFFFF"}}>No tasks for today</li>}
          {tasksToday.map(task => (
            <li key={task.id} className="ut-task">
              <div className="ut-task-info">
                <CircleAlert className="ut-icon" />
                <span className="ut-task-title">{task.title}</span>
              </div>
              <div className="ut-right-items">
                <div className="ut-task-forfeit-container">
                  <span className="ut-forfeit-text">{"-$" + task.forfeit}</span>
                </div>
                <div className="ut-task-deadline-container">
                  <Clock className="ut-deadline-icon" />
                  <span className="ut-deadline-text">{formatClientTime(task.deadline)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="ut-section">
        <h1 className="ut-title">Tomorrow's Tasks</h1>
        <ul className="ut-list">
          {tasksTomorrow.length === 0 && <li style={{color: "#FFFFFF"}}>No tasks for tomorrow</li>}
          {tasksTomorrow.map(task => (
            <li key={task.id} className="ut-task">
              <div className="ut-task-info">
                <CircleAlert className="ut-icon" />
                <span className="ut-task-title">{task.title}</span>
              </div>
              <div className="ut-right-items">
                <div className="ut-task-forfeit-container">
                  <span className="ut-forfeit-text">{"-$" + task.forfeit}</span>
                </div>
                <div className="ut-task-deadline-container">
                  <Clock className="ut-deadline-icon" />
                  <span className="ut-deadline-text">{formatClientTime(task.deadline)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
