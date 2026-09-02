import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <main className="landing-page">

            {/* Hero Section */}
            <section className="landing-hero">

                <div className="landing-badge">
                    Vehicle Service Operations
                </div>

                <h1>
                    Welcome to <span>Auto Care</span>
                </h1>

                <p>
                    Manage bookings, mechanics, customers and services
                    from one simple and powerful operations dashboard.
                </p>

                <button
                    className="landing-button"
                    onClick={() => navigate("/dashboard")}
                >
                    View Dashboard
                </button>

            </section>


            {/* Features */}
            <section className="landing-features">

                {/* Card 1 */}
                <div className="feature-card">

                    <div className="feature-icon">
                        ↗
                    </div>

                    <h2>Analytics & Charts</h2>

                    <p>
                        Get a clear overview of your vehicle service operations
                        through meaningful visual analytics.
                    </p>

                    <ul>
                        <li>Track booking trends over time</li>
                        <li>Monitor revenue performance</li>
                        <li>Analyze booking status distribution</li>
                        <li>Understand service category demand</li>
                    </ul>

                </div>


                {/* Card 2 */}
                <div className="feature-card">

                    <div className="feature-icon">
                        ▤
                    </div>

                    <h2>Booking Management</h2>

                    <p>
                        Manage and monitor every service booking from one
                        organized operational view.
                    </p>

                    <ul>
                        <li>Search bookings instantly</li>
                        <li>Filter bookings by status</li>
                        <li>Update booking status</li>
                        <li>Navigate through paginated records</li>
                    </ul>

                </div>


                {/* Card 3 */}
                <div className="feature-card">

                    <div className="feature-icon">
                        ⚙
                    </div>

                    <h2>Service Operations</h2>

                    <p>
                        Keep your vehicle service operations organized with
                        structured service and customer information.
                    </p>

                    <ul>
                        <li>Manage available services</li>
                        <li>View service categories and pricing</li>
                        <li>Monitor customer information</li>
                        <li>Access operational records easily</li>
                    </ul>

                </div>


                {/* Card 4 */}
                <div className="feature-card">

                    <div className="feature-icon">
                        ✓
                    </div>

                    <h2>Performance Monitoring</h2>

                    <p>
                        Monitor mechanic activity and operational performance
                        to keep service delivery running smoothly.
                    </p>

                    <ul>
                        <li>Track mechanic availability</li>
                        <li>Monitor completed jobs</li>
                        <li>View current or recent bookings</li>
                        <li>Monitor overall booking performance</li>
                    </ul>

                </div>

            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>Auto Care Operations Dashboard</p>
            </footer>

        </main>
    );
}

export default LandingPage;