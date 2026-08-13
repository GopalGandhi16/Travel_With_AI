import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const MyBookings = () => {

  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!user?._id) return;

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/auth/bookings/${user._id}`
      )
      .then((res) => {

        setBookings(res.data.data);

      })
      .catch(console.log)
      .finally(() => setLoading(false));

  }, [user]);

  if (loading) {
    return (
      <div className="mt-40 text-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-28 px-6 mb-20">

      <h1 className="text-5xl font-bold mb-10">
        My Bookings
      </h1>

      {bookings.length === 0 ? (

        <div className="bg-white rounded-3xl p-10 shadow">

          <h2 className="text-2xl font-semibold">
            No Bookings Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Start exploring destinations and book
            your stay.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {bookings.map((booking) => (

            <div
              key={booking._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <img
                src={
                  booking.hotelId?.images?.[0]
                }
                alt={booking.hotelId?.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {booking.hotelId?.name}
                </h2>

                <p className="text-gray-500">
                  {booking.destinationId?.name}
                </p>

                <div className="mt-5 space-y-2">

                  <p>
                    Check In:
                    {" "}
                    {new Date(
                      booking.checkIn
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    Check Out:
                    {" "}
                    {new Date(
                      booking.checkOut
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    Guests:
                    {" "}
                    {booking.guests}
                  </p>

                  <p>
                    Nights:
                    {" "}
                    {booking.numberOfNights}
                  </p>

                </div>

                <div className="mt-6 flex justify-between items-center">

                  <span className="text-2xl font-bold text-blue-600">
                    ₹{booking.totalAmount}
                  </span>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                    Confirmed
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyBookings;