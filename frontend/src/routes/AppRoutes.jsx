import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/user/Home";
import ListingsDetail from '../pages/user/ListingDetails'
import SearchPage from "../pages/user/searchPage";
import Listings  from "../components/listings";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<ProtectedRoute><Listings /></ProtectedRoute>} />
            <Route path="/listing/:id" element={<ProtectedRoute><ListingsDetail/></ProtectedRoute>}/>
            <Route path="/search/:location" element={<SearchPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;