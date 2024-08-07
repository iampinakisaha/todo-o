import moment from 'moment';

// Function to generate a list of dates for a 1-year span
export  function generateDateRangeOneYear() {
  const startDate = moment(); // Current date
  const endDate = moment().add(1, 'year'); // 1 year later

  const dates = [];
  let currentDate = startDate.clone();

  while (currentDate <= endDate) {
    dates.push(currentDate.clone()); // Add the date to the list
    currentDate.add(1, 'day'); // Move to the next day
  }

  return dates;
}
