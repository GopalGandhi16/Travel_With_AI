import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { AuthProvider } from "../context/AuthContext"; 
import ProtectedRoute from "../components/ProtectedRoute"; 
import MainLayout from "../layouts/MainLayout"; 
import Home from "../pages/user/Home";
import ListingsDetail from '../pages/user/ListingDetails' 
import SearchPage from "../pages/user/SearchPage";
import Listings from "../components/Listings"; 
import Login from "../pages/Login"; 
import Signup from "../pages/SignUp";
import Watchlist from "../pages/user/Watchlist";
import BookingPage from "../pages/user/BookingPage";
import MyBookings from "../pages/user/MyBookings";
import TravelPlanner from "../pages/user/TravelPlanner";
import TripResult from "../pages/user/TripResult";
const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
  <Route path="/" element={<Home />} />

  <Route path="/destinations" element={<Listings />} />

  <Route path="/destinations/:slug" element={<ListingsDetail />} /> 

<Route
  path="/destinations/search/:location"
  element={<SearchPage />}
/>
<Route
  path="/booking/:hotelId"
  element={
    <ProtectedRoute>
      <BookingPage />
    </ProtectedRoute>
  }
/>
  <Route path="/login" element={<Login />} />

  <Route path="/signup" element={<Signup />} />

  <Route
    path="/watchlist"
    element={
      <ProtectedRoute>
        <Watchlist />
      </ProtectedRoute>
    }
  />

  <Route
  path="/my-bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  }
/>
<Route
  path="/plan-trip"
  element={<TravelPlanner />}
/>
<Route
  path="/trip-result"
  element={<TripResult />}
/>

</Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;