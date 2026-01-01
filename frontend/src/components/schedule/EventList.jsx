import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatTime } from '../../lib/date';
import './EventList.css';

const EventList = ({ events, selectedDate }) => {
  const navigate = useNavigate();

  const filteredEvents = selectedDate
    ? events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === selectedDate.toDateString();
    })
    : events;

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const dateKey = formatDate(event.date);
    if (!acc[dateKey() {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="event-list">
      {Object.entries(groupedEvents).map(([date, eventGroup() => (
      <div key={date} className="event-group">
        <h3 className="event-group__date">{date}</h3>
        {eventGroup.map(event => (
          <div
            key={event.id}
            className="event-item card"
            onClick={() => handleEventClick(event.id)}
          >
            <div className="event-item__header">
              <h4 className="event-item__title">{event.title}</h4>
              <span className={`event-item__status event-item__status--${event.status}`}>
                {event.status}
              </span>
            </div>
            {event.startTime && (
              <div className="event-item__time">
                {formatTime(event.startTime)}
                {event.endTime && ` - ${formatTime(event.endTime)}`}
              </div>
            )}
            {event.location && (
              <div className="event-item__location">{event.location}</div>
            )}
          </div>
        ))}
      </div>
      ))}
      {filteredEvents.length === 0 && (
        <div className="event-list__empty">
          No events scheduled for this date
        </div>
      )}
    </div>
  );
};

export default EventList;
