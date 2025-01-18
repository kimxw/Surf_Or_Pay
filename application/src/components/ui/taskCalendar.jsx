import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './customCalendar.css';

const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const events = [{
    title: 'Meeting with Bob',
    start: new Date(2025, 0, 20, 10, 0), // January 20, 2025, 10:00 AM
    end: new Date(2025, 0, 20, 11, 0), // January 20, 2025, 11:00 AM
  },
  {
    title: 'Project Deadline',
    start: new Date(2025, 0, 22), // January 22, 2025, all-day event
    end: new Date(2025, 0, 22),
    allDay: true,
  },
]; // Your calendar events

  return (
    <div style={{ height: '600px', width: '800px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default CalendarComponent;
