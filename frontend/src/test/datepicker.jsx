import React, { useState, useRef } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { format, addDays, startOfWeek, endOfWeek, isSameDay, isBefore } from 'date-fns';
import "@/test/datepicker.css"
// Helper to create an array of dates
const createDateArray = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};

const Datepicker = () => {
  const today = new Date();
  const endDate = addDays(today, 365 * 2); // 2 years from today
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(today));
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentActiveDay, setCurrentActiveDay] = useState(today);
  const listRef = useRef();

  const dates = createDateArray(today, endDate);

  const getItemSize = index => 100; // Fixed size for simplicity

  const handleScroll = ({ scrollOffset }) => {
    const visibleDate = dates[Math.floor(scrollOffset / getItemSize(0))];
    setCurrentWeekStart(startOfWeek(visibleDate));

    setCurrentActiveDay(visibleDate);
    console.log(visibleDate)
  };

  const scrollToDate = (date) => {
    const index = dates.findIndex(d => isSameDay(d, date));
    if (listRef.current) {
      listRef.current.scrollToItem(index, 'center');
    }
    setSelectedDate(date);
  };

  const Row = ({ index, style }) => (
    <div style={style} className={`day-item text-sm font-semibold text-[#002C54]/80 ${isSameDay(dates[index], selectedDate) ? 'selected' : ''}`}>
      {format(dates[index], 'd MMM ‧ EEEE')}
    </div>
  );

  const handleWeekDayClick = (date) => {
    scrollToDate(date);
  };

  const weekDays = createDateArray(currentWeekStart, endOfWeek(currentWeekStart));

  return (
    <div className='h-full w-full bg-white '>
      <div className='flex w-[80%]   justify-between mx-auto'>
        {weekDays.map(day => (
          <div
            key={day}
            className={`day-nav-item cursor-pointer p-1 text-md text-center 
              ${isBefore(day, today) ? ' text-gray-500 cursor-not-allowed' : 
              isSameDay(day, currentActiveDay)  && ' text-red-600'}`}
            onClick={() => handleWeekDayClick(day)}
          >
            {format(day, 'EEE d')}
          </div>
        ))}
      </div>
      <AutoSizer className='day-container'>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={dates.length}
            itemSize={getItemSize}
            width={width}
            onScroll={handleScroll}
            ref={listRef}
            className='day-container'
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default Datepicker;
