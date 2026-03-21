import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/user/Home";
import ListingsDetail from '../pages/user/ListingDetails'
import SearchPage from "../pages/user/searchPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element ={<ListingsDetail/>}/>
          <Route path ="/search/:location" element={<SearchPage/>}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;