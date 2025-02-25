import React from "react";
import {
    Calendar as BigCalendar,
    momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import CalendarToolbar from "./CalendarToolbar";

const localizer = momentLocalizer(moment);

const events = [
    /* curly brackets denote 1 event object in the array */
    {
        start: moment('2025-02-25T13:00:00').toDate(),
        end: moment('2025-02-25T14:00:00').toDate(),
        title: "lunch"
    },
    {
        start: moment('2025-02-25T13:00:00').toDate(),
        end: moment('2025-02-25T18:00:00').toDate(),
        title: "2109 LECS"
    },
    {
        start: moment('2025-02-25').toDate(),
        end: moment('2025-02-25').toDate(),
        title: "suffer"
    }
]

const components = {
    toolbar: CalendarToolbar
}

export default function Calendar(props) {
    return <BigCalendar {...props} 
        localizer={localizer}     
        style={{ height: '500px' }}
        events={events}
        views={["month", "week", "day"]}
        formats={{timeGutterFormat: (time) => moment(time).format('h a')}}
        components={components}>
    </BigCalendar>;
}