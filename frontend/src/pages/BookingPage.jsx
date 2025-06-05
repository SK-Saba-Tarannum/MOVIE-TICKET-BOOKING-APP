import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import toast, { Toaster } from 'react-hot-toast';

const BookingPage = () => {
  const { showId } = useParams();
  const token = localStorage.getItem('token');

  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);
  const [pricePerSeat, setPricePerSeat] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [paymentDetails, setPaymentDetails] = useState({});

  const fetchShowDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/bookings/seats/${showId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookedSeats(res.data.bookedSeats || []);
      setTotalSeats(res.data.totalSeats || 0);
      setPricePerSeat(res.data.pricePerSeat);
      console.log(res.data.pricePerSeat)
    } catch (err) {
      toast.error('Failed to load seat data');
      console.log(err)
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, [showId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handlePaymentInput = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    try {
      await axios.post(
        'http://localhost:5001/api/bookings/',
        {
          showId: parseInt(showId),
          numSeats: selectedSeats.length,
          seats: selectedSeats,
          method: paymentMethod,
          amount: selectedSeats.length * pricePerSeat, 
          ...paymentDetails,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(' Booking Successful!');
      setSelectedSeats([]);
      setPaymentDetails({});
      setShowModal(false);
      fetchShowDetails();
    } catch (err) {
      toast.error('Booking Failed');
      console.log(err)
    }
  };

  // const columns = 20  ;
  // const rows = Math.ceil(totalSeats / columns);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <div className="p-6 bg-[#0e0e0e] text-white min-h-screen flex flex-col items-center">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Book Your Seats</h2>

        <div className="w-full flex justify-center mb-8 px-2">
          <div
            className="grid gap-2 p-4 border-2 border-teal-400 rounded-xl"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
              maxWidth: '1000px',
              width: '100%',
            }}
          >
            {Array.from({ length: totalSeats }).map((_, index) => {
              const seat = `S${index + 1}`;
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);

              return (
                <button
                  key={seat}
                  disabled={isBooked}
                  onClick={() => toggleSeat(seat)}
                  className={`h-9 sm:h-10 w-9 sm:w-10 rounded text-xs font-bold transition duration-200 ${
                    isBooked
                      ? 'bg-red-400 cursor-not-allowed'
                      : isSelected
                      ? 'bg-green-400 hover:bg-green-300 cursor-pointer'
                      : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
                  }`}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full max-w-md  space-y-4">
          <div className="bg-gray-800 p-4 border-2 border-teal-400 rounded-lg text-lg">
            <p className="mb-2">
              <span className="text-teal-300 font-semibold">Selected:</span>{' '}
              {selectedSeats.join(', ') || 'None'}
            </p>
            <p>
              <span className="text-teal-300 font-semibold">Total:</span> ₹
              {selectedSeats.length * pricePerSeat}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={selectedSeats.length === 0}
            className={`w-full py-3 text-lg font-bold rounded-md border-2 border-gray-400 transition duration-200 ${
              selectedSeats.length === 0
                ? 'bg-teal-600 cursor-not-allowed'
                : 'bg-teal-500 hover:bg-teal-400 text-black'
            }`}
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center z-50">
          <div className="bg-gray-900 border border-teal-400 text-black p-6 rounded-lg w-full max-w-md space-y-4 relative shadow-2xl">
            <h3 className="text-2xl font-bold text-center mb-4 text-teal-400">Payment</h3>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border border-teal-500 rounded-md bg-teal-300"
            >
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>

            {paymentMethod === 'UPI' ? (
              <input
                name="upiId"
                placeholder="Enter UPI ID"
                className="w-full px-4 py-2 border text-gray-800 bg-teal-300 border-teal-500 rounded-md"
                onChange={handlePaymentInput}
              />
            ) : (
              <>
                <input
                  name="cardNumber"
                  placeholder="Card Number"
                  className="w-full px-4 py-2 border text-gray-800 bg-teal-300 border-teal-500 rounded-md"
                  onChange={handlePaymentInput}
                />
                <input
                  name="cardExpiry"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border text-gray-800 bg-teal-300 border-teal-500 rounded-md"
                  onChange={handlePaymentInput}
                />
                <input
                  name="cardCVV"
                  placeholder="CVV"
                  className="w-full px-4 py-2 border text-gray-800 bg-teal-300 border-teal-500 rounded-md"
                  onChange={handlePaymentInput}
                />
              </>
            )}

            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="w-full py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500"
              >
                Pay ₹{selectedSeats.length * pricePerSeat}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingPage;
