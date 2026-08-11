import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  CalendarDays,
  Users,
  BedDouble,
  IndianRupee,
  Hotel,
  Phone,
  Mail,
  User,
  FileText,
} from "lucide-react";

const BookingPage = () => {

  const { hotelId } = useParams();
const { user } = useAuth();
  const [hotel, setHotel] = useState(null);

  const [booking, setBooking] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
    specialRequest: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/hotels/${hotelId}`)
      .then((res) => setHotel(res.data.data))
      .catch(console.log);
  }, [hotelId]);

  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

  useEffect(() => {
    if (user) {
      setBooking((prev) => ({
        ...prev,
        fullName: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  let nights = 1;

  if (booking.checkIn && booking.checkOut) {

    const inDate = new Date(booking.checkIn);
    const outDate = new Date(booking.checkOut);

    const diff =
      (outDate - inDate) / (1000 * 60 * 60 * 24);

    if (diff > 0) nights = diff;

  }

  const taxes = 850;
  const platformFee = 250;

  const totalAmount = hotel
    ? hotel.pricePerNight * nights + taxes + platformFee
    : 0;

const handlePayment = async () => {
  console.log(
  "Razorpay Key:",
  import.meta.env.VITE_RAZORPAY_KEY_ID
);
  if (
    !booking.fullName ||
    !booking.email ||
    !booking.phone ||
    !booking.checkIn ||
    !booking.checkOut
  ) {
    alert("Please fill all booking details.");
    return;
  }

  if (new Date(booking.checkOut) <= new Date(booking.checkIn)) {
    alert("Check-Out date must be after Check-In.");
    return;
  }

  try {

    // Create Razorpay Order
    const { data: orderData } = await axios.post(
      "http://localhost:3000/api/payment/create-order",
      {
        amount: totalAmount,
      }
    );

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: orderData.order.amount,

      currency: orderData.order.currency,

      order_id: orderData.order.id,

      name: "AI Travel Planner",

      description: `Booking for ${hotel.name}`,

      image:
        "https://cdn-icons-png.flaticon.com/512/854/854878.png",

      prefill: {

        name: booking.fullName,

        email: booking.email,

        contact: booking.phone,

      },

      notes: {

        hotelId: hotel._id,

        hotelName: hotel.name,

      },

      theme: {

        color: "#2563EB",

      },

      handler: async function (response) {

  try {

    const bookingResponse = await axios.post(
      "http://localhost:3000/api/auth/bookings",
      {
        userId: user._id,
        hotelId: hotel._id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        rooms: booking.rooms
      }
    );

    console.log("Booking Created:", bookingResponse.data);

    alert("Payment & Booking Successful 🎉");

  } catch (error) {

    console.log("Booking Error:", error);

    alert(
      "Payment successful but booking creation failed."
    );

  }
},

      modal: {

        ondismiss() {

          console.log("Payment Cancelled");

        },

      },

    };

  if (!window.Razorpay) {
  alert("Razorpay SDK is not loaded yet");
  return;
}

const razorpay = new window.Razorpay(options);
razorpay.open();

  } catch (err) {

    console.log(err);

    alert("Something went wrong.");

  }

};
if (!hotel) {
  return (
    <div className="mt-40 text-center text-2xl">
      Loading...
    </div>
  );
}
return (

<div className="max-w-7xl mx-auto mt-28 mb-20 px-6">

  <h1 className="text-5xl font-bold text-gray-800 mb-12">
    Book Your Stay
  </h1>

  <div className="grid lg:grid-cols-3 gap-10">

    {/* LEFT */}

    <div className="lg:col-span-2 space-y-8">

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <img
  src={
    hotel?.images?.length
      ? hotel.images[0]
      : "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  }
  alt={hotel?.name || "Hotel"}
  className="w-full h-80 object-cover"
/>

        <div className="p-8">

          <h2 className="text-3xl font-bold">
            {hotel.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {hotel.category}
          </p>

          <div className="flex items-center justify-between mt-6">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

              ⭐ {hotel.userRating}

            </span>

            <span className="text-3xl font-bold text-blue-600">

              ₹{hotel.pricePerNight}

              <span className="text-base text-gray-500">
                /night
              </span>

            </span>

          </div>

        </div>

      </div>

      {/* Guest Form */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-8">

          Guest Details

        </h2>

        <div className="grid md:grid-cols-2 gap-6"></div>
                  <div className="relative">

            <User className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              value={booking.fullName}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  fullName: e.target.value,
                })
              }
              placeholder="Full Name"
              className="w-full border rounded-xl pl-12 p-4 outline-none focus:border-blue-500"
            />

          </div>

          <div className="relative">

            <Mail className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              value={booking.email}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              className="w-full border rounded-xl pl-12 p-4 outline-none focus:border-blue-500"
            />

          </div>

          <div className="relative">

            <Phone className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              value={booking.phone}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  phone: e.target.value,
                })
              }
              placeholder="Phone Number"
              className="w-full border rounded-xl pl-12 p-4 outline-none focus:border-blue-500"
            />

          </div>

          <div className="relative">

            <CalendarDays className="absolute left-4 top-4 text-gray-400" />

            <input
              type="date"
              value={booking.checkIn}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  checkIn: e.target.value,
                })
              }
              className="w-full border rounded-xl pl-12 p-4 outline-none focus:border-blue-500"
            />

          </div>

          <div className="relative">

            <CalendarDays className="absolute left-4 top-4 text-gray-400" />

            <input
              type="date"
              value={booking.checkOut}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  checkOut: e.target.value,
                })
              }
              className="w-full border rounded-xl pl-12 p-4 outline-none focus:border-blue-500"
            />

          </div>

          <div className="relative">

            <Users className="absolute left-4 top-4 text-gray-400" />

            <input
              type="number"
              min="1"
              value={booking.guests}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  guests: Number(e.target.value),
                })
              }
              className="w-full border rounded-xl pl-12 p-4 outline-none focus:border-blue-500"
            />

          </div>

          <div className="relative">

            <BedDouble className="absolute left-4 top-4 text-gray-400" />

            <input
              type="number"
              min="1"
              value={booking.rooms}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  rooms: Number(e.target.value),
                })
              }
              className="w-full border rounded-xl pl-12 p-4 outline-none focus:border-blue-500"
            />

          </div>

        </div>

        <div className="relative mt-6">

          <FileText className="absolute left-4 top-4 text-gray-400" />

          <textarea
            rows="5"
            value={booking.specialRequest}
            onChange={(e) =>
              setBooking({
                ...booking,
                specialRequest: e.target.value,
              })
            }
            placeholder="Special Requests (Optional)"
            className="w-full border rounded-xl pl-12 p-4 outline-none focus:border-blue-500"
          />

        </div>

      </div>

    </div>
        {/* RIGHT */}

    <div>

      <div className="sticky top-28 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

        <h2 className="text-3xl font-bold mb-8">
          Booking Summary
        </h2>

        <div className="space-y-6">

          <div className="flex justify-between items-center">

            <span className="text-gray-500 flex items-center gap-2">
              <Hotel size={18} />
              Hotel
            </span>

            <span className="font-semibold">
              {hotel.name}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-500 flex items-center gap-2">
              <IndianRupee size={18} />
              Price / Night
            </span>

            <span className="font-semibold">
              ₹{hotel.pricePerNight}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-500">
              Nights
            </span>

            <span className="font-semibold">
              {nights}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-500">
              Guests
            </span>

            <span className="font-semibold">
              {booking.guests}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <span className="text-gray-500">
              Rooms
            </span>

            <span className="font-semibold">
              {booking.rooms}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Taxes
            </span>

            <span>
              ₹{taxes}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Platform Fee
            </span>

            <span>
              ₹{platformFee}
            </span>

          </div>

          <hr />

          <div className="flex justify-between items-center text-3xl font-bold">

            <span>Total</span>

            <span className="text-blue-600">
              ₹{totalAmount}
            </span>

          </div>

        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl text-xl font-bold transition duration-300 shadow-lg hover:shadow-2xl"
        >
          Proceed To Payment
        </button>

        <p className="text-center text-gray-400 text-sm mt-5">
          🔒 Secure payments powered by Razorpay
        </p>

      </div>

    </div>

  </div>


);
};

export default BookingPage;