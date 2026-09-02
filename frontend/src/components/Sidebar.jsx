import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>AutoCare</h2>
                <p>Operations</p>
            </div>

            <nav className="sidebar-nav">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/bookings"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Bookings
                </NavLink>

                <NavLink
                    to="/mechanics"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Mechanics
                </NavLink>

                <NavLink
                    to="/customers"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Customers
                </NavLink>

                <NavLink
                    to="/services"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Services
                </NavLink>

            </nav>
        </aside>
    );
}

export default Sidebar;