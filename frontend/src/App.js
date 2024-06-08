import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Banks from "./components/Banks/Banks";
import Users from "./components/Users/Users";
import UserDetails from "./components/DetailsPage/UserDetails";
import BankDetails from "./components/DetailsPage/BankDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Banks />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/bank-details" element={<BankDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
