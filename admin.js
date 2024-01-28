let totalBookings = 0;
const bookingTable = document.getElementById('bookingTable');

function updateTotalBookings() {
  const totalBookingsElement = document.getElementById('totalBookings');
  totalBookingsElement.textContent = totalBookings;
}

function addBookingToTable(bookingId, user, date) {
  const newRow = bookingTable.insertRow(-1); // Insert new row at the end of the table

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);

  cell1.textContent = bookingId;
  cell2.textContent = user;
  cell3.textContent = date;

  totalBookings++;
  updateTotalBookings();
}

const eventList = document.getElementById('eventList');

// Simulating a new booking being added to the table (this could be triggered on the booking page)
addBookingToTable('001', 'John Doe', '2023-12-05');

function fetchTicketData() {
  fetch('http://localhost:3000/event')
    .then(response => response.json())
    .then(events => {
      // Check if events is an array and has at least one item
      if (Array.isArray(events) && events.length > 0) {
        // Update your UI with the first event data
        const eventList = document.getElementById('eventList');
        eventList.innerHTML = ''; // Clear previous data

        const event = events[0]; // Assuming you want to display details of the first event
        const listItem = document.createElement('li');
        listItem.textContent = event.eventName;
        eventList.appendChild(listItem);
      } else {
        console.error('No events found or invalid data format');
      }
    })
    .catch(error => console.error('Error fetching ticket data:', error));
}

// Simulating function to fetch booked tickets from backend (replace with actual implementation)
function fetchBookedTickets(ticketType) {
  // Replace this with your backend API call to get booked tickets
  return new Promise((resolve, reject) => {
    // Simulating async backend call
    setTimeout(() => {
      // Assuming the API returns the total booked tickets for adult and child separately
      // Replace with actual API response parsing
      const bookedTickets = (ticketType === 'adult') ? { total: 20 } : { total: 10 };
      resolve(bookedTickets);
    }, 1000); // Simulating API delay
  });
}

function getOptionForCategory(category) {
  // You can fetch language options based on the selected category using AJAX or a predefined mapping
  // For simplicity, returning a predefined list here
  switch (category) {
    case 'music':
      return ['tamil', 'pop', 'english', 'kpop', 'jazz'];
    case 'comedy':
      return ['event', 'food', 'art', 'sports', 'kids'];
    case 'happystreet':
      return ['stand_up', 'improv', 'sketch', 'slapstick', 'dark'];
    case 'workshops':
      return ['magic', 'pottery', 'artistic', 'dance', 'culinary'];
    default:
      return [];
  }
}

// Function to fetch booked tickets and update UI
async function updateBookedTickets() {
  try {
    // Fetch booked tickets for adult
    const adultTickets = await fetchBookedTickets('adult');
    document.getElementById('totalAdultBookings').textContent = adultTickets.total;

    // Fetch booked tickets for child
    const childTickets = await fetchBookedTickets('child');
    document.getElementById('totalChildBookings').textContent = childTickets.total;

    // You can customize this to update your UI as needed
  } catch (error) {
    console.error('Error updating booked tickets:', error);
  }
}

// Example: Call both functions when the page loads
window.onload = () => {
  fetchTicketData(); // Your existing code to fetch event data
  updateBookedTickets(); // Fetch and update booked tickets
};
