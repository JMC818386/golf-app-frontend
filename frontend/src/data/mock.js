export const mockEvents = [
  {
    id: '1',
    title: 'Morning Round at Tates Creek',
    type: 'round',
    status: 'upcoming',
    date: '2025-01-05',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Tates Creek Country Club',
    description: 'Weekly Saturday morning round with the group',
    participants: ['John', 'Mike', 'Sarah'],
  },
  {
    id: '2',
    title: 'Golf Lesson',
    type: 'lesson',
    status: 'upcoming',
    date: '2025-01-08',
    startTime: '14:00',
    endTime: '15:00',
    location: 'Pine Valley Golf Academy',
    description: 'Working on short game with Coach Williams',
  },
  {
    id: '3',
    title: 'Club Championship',
    type: 'tournament',
    status: 'upcoming',
    date: '2025-01-15',
    startTime: '07:00',
    endTime: '17:00',
    location: 'Tates Creek Country Club',
    description: 'Annual club championship - 36 holes',
  },
  {
    id: '4',
    title: 'Practice Session',
    type: 'practice',
    status: 'completed',
    date: '2024-12-28',
    startTime: '16:00',
    endTime: '18:00',
    location: 'Driving Range',
    description: 'Driver and iron practice',
  },
];

export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

export const getEventsByDate = (date: Date): Event[] => {
  const dateStr = date.toISOString().split('T')[0];
  return mockEvents.filter(event => event.date === dateStr);
};

export const getUpcomingEvents = (): Event[] => {
  const now = new Date().toISOString().split('T')[0];
  return mockEvents
    .filter(event => event.date >= now && event.status === 'upcoming')
    .sort((a, b) => a.date.localeCompare(b.date));
};
