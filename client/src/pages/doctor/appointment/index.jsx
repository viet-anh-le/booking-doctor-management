import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import PageMeta from "../../../components/common/PageMeta";
import { fetchDoctorAppointments } from '../../../actions/doctor_appointments';
import dayjs from "dayjs";

const serverURL = import.meta.env.VITE_SERVER_URL;

const DoctorAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const doctorAccount = useSelector(state => state.doctorAccountReducer);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/doctor/appointment/${doctorAccount._id}`);
      const result = await response.json();
      dispatch(fetchDoctorAppointments(result));
      if (result) {
        const tempData = result.map((item) => {
          const date = item.appointment.date;
          const time = item.appointment.time;

          // 1. Lấy ngày từ date
          const localDate = dayjs(date).format("YYYY-MM-DD");

          // 2. Tách thời gian
          const [startTime, endTime] = time.split(" - ");  // ["08:00", "09:00"]

          // 3. Tạo ISO strings từ ngày và giờ
          const startDateTime = new Date(`${localDate}T${startTime}:00`);
          const endDateTime = new Date(`${localDate}T${endTime}:00`);

          // 4. Định dạng lại
          const start = startDateTime.toISOString();
          const end = endDateTime.toISOString();
          let typeColor = 'primary';

          switch (item.appointment.status) {
            case "pending":
              typeColor = "warning";
              break;
            case "resolve":
              typeColor = "success";
              break;
            case "reject":
              typeColor = "danger";
              break;
            case "fulfilled":
              typeColor = "primary";
              break;
            default:
              typeColor = "primary";
          }
          return ({
            id: item.appointment._id,
            title: item.client_name,
            start: start,
            end: end,
            extendedProps: { calendar: `${typeColor}` },
          })
        })
        setEvents(tempData);
      }
      console.log(result);
    }
    fetchApi();
  }, [])

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    navigate(`/doctor/appointment/detail/${event.id}`)
  };

  return (
    <>
      <PageMeta
        title="Appointments"
      />
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
          />
        </div>
      </div>
    </>
  );
};

const renderEventContent = (eventInfo) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default DoctorAppointment;
