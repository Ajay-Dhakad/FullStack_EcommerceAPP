export const beautifyDate = (dateString) => {
   return new Intl.DateTimeFormat('en-US', {
     month: 'short',
     day: 'numeric',
     year: 'numeric',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
     hour12: true,
     timeZone: 'UTC'
   }).format(new Date(dateString));
 };