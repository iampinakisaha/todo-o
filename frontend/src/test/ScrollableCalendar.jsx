import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { format, addDays, startOfDay } from 'date-fns';
import './ScrollableCalendar.css';

const ScrollableCalendar = () => {
  const today = startOfDay(new Date());
  const endDate = addDays(today, 365 * 2); // 2 years from today

  // Calculate the total number of days
  const totalDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

  // Create an array of dates for use in the list
  const dates = useMemo(() => {
    const datesArray = [];
    let currentDate = today;
    while (currentDate <= endDate) {
      datesArray.push(format(currentDate, 'yyyy-MM-dd'));
      currentDate = addDays(currentDate, 1);
    }
    return datesArray;
  }, [today, endDate]);

  // Render a single item
  const renderRow = ({ index, style }) => (
    <div style={style} className="day">
      {dates[index]}
    </div>
  );

  return (
    <div className="calendar-container">
      
      <List
        height={window.innerHeight}
        itemCount={totalDays}
        itemSize={40}
        width="100%"
      >
        {renderRow}
      </List>
    </div>
  );
};

export default ScrollableCalendar;
