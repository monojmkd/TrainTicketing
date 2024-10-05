import React, { useState } from "react";
import "./styles.css";
const seatData = {
  "2024-09-20": {
    trainA: [
      { id: 1, status: "available" },
      { id: 2, status: "booked" },
      { id: 3, status: "available" },
      { id: 4, status: "pwd" },
      { id: 5, status: "available" },
      { id: 6, status: "booked" },
    ],
    trainB: [
      { id: 1, status: "available" },
      { id: 2, status: "available" },
      { id: 3, status: "booked" },
      { id: 4, status: "pwd" },
      { id: 5, status: "available" },
      { id: 6, status: "booked" },
    ],
  },
  "2024-09-21": {
    trainA: [
      { id: 1, status: "booked" },
      { id: 2, status: "booked" },
      { id: 3, status: "available" },
      { id: 4, status: "pwd" },
      { id: 5, status: "available" },
      { id: 6, status: "available" },
    ],
    trainB: [
      { id: 1, status: "available" },
      { id: 2, status: "pwd" },
      { id: 3, status: "available" },
      { id: 4, status: "booked" },
      { id: 5, status: "available" },
      { id: 6, status: "booked" },
    ],
  },
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [showSeats, setShowSeats] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleDateChange = (e) => {
    const date = formatDate(e.target.value);
    setSelectedDate(date);
    setSelectedTrain(null);
    setShowSeats(false);

    if (!seatData[date]) {
      setAvailableSeats([]);
    }
  };

  const handleTrainSelection = (trainName) => {
    if (seatData[selectedDate] && seatData[selectedDate][trainName]) {
      setSelectedTrain(trainName);
      setAvailableSeats(seatData[selectedDate][trainName]);
      setShowSeats(true);
    } else {
      setAvailableSeats([]);
      setShowSeats(false);
    }
  };

  const handleSeatClick = (seatId) => {
    const updatedSeats = availableSeats.map((seat) =>
      seat.id === seatId && seat.status === "available"
        ? { ...seat, status: "booked" }
        : seat
    );
    setAvailableSeats(updatedSeats);
    seatData[selectedDate][selectedTrain] = updatedSeats;
  };

  return (
    <div className="app-container">
      <header>
        <h1>Train Seat Booking System</h1>
        <p>Select a date, pick a train, and book your seats!</p>
        <p>Available Dates 20-09-2024 & 21-09-2024</p>
      </header>

      <div className="date-picker">
        <label htmlFor="date">Select Date: </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-input"
        />
      </div>

      <div className="train-selection">
        <h2>Trains available on {selectedDate || "Select a Date"}:</h2>
        {seatData[selectedDate] ? (
          <>
            {Object.keys(seatData[selectedDate]).map((trainName) => (
              <div key={trainName} className="train-info">
                <p>
                  <strong>{trainName}</strong> - Available Seats:{" "}
                  {
                    seatData[selectedDate][trainName].filter(
                      (seat) => seat.status === "available"
                    ).length
                  }
                </p>
                <button
                  className="btn"
                  onClick={() => handleTrainSelection(trainName)}
                >
                  View Seats
                </button>
              </div>
            ))}
          </>
        ) : (
          <p>No trains available for the selected date.</p>
        )}
      </div>

      {showSeats && availableSeats.length > 0 && (
        <div className="seat-grid-container">
          <h3>Seats for {selectedTrain}:</h3>
          <div className="seat-grid">
            {availableSeats.map((seat) => (
              <div
                key={seat.id}
                onClick={() => handleSeatClick(seat.id)}
                className={`seat ${
                  seat.status === "booked"
                    ? "seat-booked"
                    : seat.status === "pwd"
                    ? "seat-pwd"
                    : "seat-available"
                }`}
              >
                {seat.status === "booked"
                  ? "X"
                  : seat.status === "pwd"
                  ? "PWD"
                  : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
