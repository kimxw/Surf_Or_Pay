import React from "react";
import {
    Calendar as BigCalendar,
    momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import CalendarToolbar from "./CalendarToolbar";
import { useSurfer } from "@/app/contexts/SurferContext";

const localizer = momentLocalizer(moment);


const components = {
    toolbar: CalendarToolbar
}

export default function Calendar(props) {
    const {events} = useSurfer();

    const eventsList = events;

    return <BigCalendar {...props} 
        localizer={localizer}     
        style={{ height: '500px' }}
        events={eventsList}
        views={["month", "week", "day"]}
        formats={{timeGutterFormat: (time) => moment(time).format('h a')}}
        components={components}>
    </BigCalendar>;
}