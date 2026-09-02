import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Mechanics from "./pages/Mechanic";
import Customers from "./pages/Customer";
import Services from "./pages/Service";


function DashboardLayout() {

    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? "app dark-mode" : "app"}>

            <Sidebar />

            <div className="main-area">

                <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                <Outlet />

            </div>

        </div>
    );
}


function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/bookings"
                        element={<Bookings />}
                    />

                    <Route
                        path="/mechanics"
                        element={<Mechanics />}
                    />

                    <Route
                        path="/customers"
                        element={<Customers />}
                    />

                    <Route
                        path="/services"
                        element={<Services />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;