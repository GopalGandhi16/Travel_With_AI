import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/user/Home";
import ListingsDetail from '../pages/user/ListingDetails'
import SearchPage from "../pages/user/searchPage";
import Listings  from "../components/listings";
import Login from "../pages/Login ";
import Signup from "../pages/SignUp";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element ={<ListingsDetail/>}/>
          <Route path ="/search/:location" element={<SearchPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path ="/signup" element={<Signup/>}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;