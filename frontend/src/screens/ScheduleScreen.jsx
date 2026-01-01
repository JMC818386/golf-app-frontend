import React, { useState } from 'react';
import ScheduleCalendar from '../components/schedule/ScheduleCalendar';
import EventList from '../components/schedule/EventList';
import { mockEvents } from '../data/mock';

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <ScheduleCalendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
      <EventList
        events={mockEvents}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default ScheduleScreen;
