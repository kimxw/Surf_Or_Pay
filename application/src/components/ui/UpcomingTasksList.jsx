import React from 'react';
import { CircleAlert, Clock } from 'lucide-react';
import { useSurfer } from '../../app/contexts/SurferContext';
import "./upcomingTasks.css";

export default function UpcomingTaskList() {
  const { taskForDashboard } = useSurfer();

  const [todayDateStr, setTodayDateStr] = React.useState("");
  const [tomorrowDateStr, setTomorrowDateStr] = React.useState("");

  React.useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    setTodayDateStr(todayStr);
    setTomorrowDateStr(tomorrowStr);
  }, []);

  const tasksToday = React.useMemo(() => {
    if (!todayDateStr) return [];
    return taskForDashboard.filter(task =>
      task.deadline.split('T')[0] === todayDateStr
    );
  }, [taskForDashboard, todayDateStr]);

  const tasksTomorrow = React.useMemo(() => {
    if (!tomorrowDateStr) return [];
    return taskForDashboard.filter(task =>
      task.deadline.split('T')[0] === tomorrowDateStr
    );
  }, [taskForDashboard, tomorrowDateStr]);

  function formatClientTime(dateString) {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // console.log("tasksToday:", tasksToday);
  // console.log("tasksTomorrow:", tasksTomorrow);

  return (
    <span suppressHydrationWarning={true}>
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
    </span>
  );
}
