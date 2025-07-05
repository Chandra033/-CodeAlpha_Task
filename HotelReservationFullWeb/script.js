const roomDatabase = {
  Mumbai: [
    { number: 101, category: "Standard", available: true },
    { number: 102, category: "Deluxe", available: true },
    { number: 103, category: "Suite", available: true }
  ],
  Delhi: [
    { number: 201, category: "Standard", available: true },
    { number: 202, category: "Deluxe", available: true },
    { number: 203, category: "Suite", available: true }
  ],
  Chennai: [
    { number: 301, category: "Standard", available: true },
    { number: 302, category: "Deluxe", available: true },
    { number: 303, category: "Suite", available: true }
  ]
};

let bookings = [];
let selectedRoom = null;

function showRooms() {
  const city = localStorage.getItem("selectedCity");
  document.getElementById("cityName").innerText = city;
  const type = document.getElementById("roomType").value;

  const roomList = document.getElementById("roomList");
  const available = roomDatabase[city].filter(r => r.category === type && r.available);

  if (available.length === 0) {
    roomList.innerHTML = "<p>No available rooms of this type.</p>";
    selectedRoom = null;
    return;
  }

  selectedRoom = available[0];
  roomList.innerHTML = `<p>Available Room: ${selectedRoom.number} (${selectedRoom.category})</p>`;
}

function bookSelectedRoom() {
  if (!selectedRoom) {
    alert("No room selected.");
    return;
  }

  const name = document.getElementById("guestName").value;
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;

  const city = localStorage.getItem("selectedCity");
  bookings.push({ name, city, room: selectedRoom, checkIn, checkOut });

  selectedRoom.available = false;

  document.getElementById("bookingSummary").innerHTML = bookings.map(b =>
    `<p>${b.name} booked Room ${b.room.number} (${b.room.category}) in ${b.city} from ${b.checkIn} to ${b.checkOut}</p>`
  ).join("");

  alert("Booking successful!");
}
