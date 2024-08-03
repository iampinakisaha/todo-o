export  const dateFormat = (dateString) => {
  if (!dateString) return ""; // Return an empty string if dateString is null or undefined

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Check if the date is invalid

  const options = { day: '2-digit', month: 'long' };
  return date.toLocaleDateString('en-GB', options); // Use 'en-GB' for day month format
};