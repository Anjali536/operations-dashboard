import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardServices";
import KpiCard from "../components/kpiCards";
import BookingsChart from "../components/BookingsChart";
import BookingStatusChart from "../components/BookingStatusChart";
import RevenueChart from "../components/RevenueChart";
import ServiceBreakdownChart from "../components/ServiceBreakdownChart";
import { getBookings } from "../services/BookingService";
import BookingsTable from "../components/BookingsTable";
import Pagination from "../components/Pagination";

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [error, setError] = useState("");

    const [bookings, setBookings] = useState([]);

    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);


    // --------------------------------
    // FETCH DASHBOARD DATA
    // --------------------------------
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError("");

            const dashboard = await getDashboardData();

            setDashboardData(dashboard);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    // --------------------------------
    // FETCH DASHBOARD ONCE
    // --------------------------------
    useEffect(() => {
        fetchDashboardData();
    }, []);


    // --------------------------------
    // FETCH BOOKINGS
    // --------------------------------
    const fetchBookings = async () => {
        try {
            setBookingsLoading(true);

            const bookingData = await getBookings(
                currentPage,
                10,
                searchQuery,
                statusFilter
            );

            setBookings(bookingData.bookings);
            setPagination(bookingData.pagination);

        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setBookingsLoading(false);
        }
    };


    // --------------------------------
    // FETCH BOOKINGS WHEN FILTER/PAGE
    // CHANGES
    // --------------------------------
    useEffect(() => {
        fetchBookings();
    }, [currentPage, searchQuery, statusFilter]);


    // --------------------------------
    // SEARCH
    // --------------------------------
    const handleSearch = (e) => {
        e.preventDefault();

        setCurrentPage(1);
        setSearchQuery(search);
    };


    // --------------------------------
    // STATUS FILTER
    // --------------------------------
    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };


    // --------------------------------
    // LOADING STATE
    // --------------------------------
    if (loading) {
        return (
            <main className="dashboard loading-page">
                <div className="loading-content">
                    <div className="loading-spinner"></div>

                    <h1>Loading Dashboard</h1>

                    <p>Operations are getting ready</p>
                </div>
            </main>
        );
    }


    // --------------------------------
    // ERROR STATE
    // --------------------------------
    if (error) {
        return (
            <main className="dashboard error-page">
                <div className="error-content">

                    <div className="error-icon">
                        !
                    </div>

                    <h1>Error: Data failed to fetch</h1>

                    <p>
                        We couldn't load the dashboard data.
                        Please try again in a moment.
                    </p>

                    <button
                        className="retry-button"
                        onClick={fetchDashboardData}
                    >
                        Try Again
                    </button>

                </div>
            </main>
        );
    }
    return (
        <main className="dashboard">

            <div className="dashboard-heading">
                <h1>Dashboard</h1>
                <p>Overview of your operations</p>
            </div>


            <div className="dashboard-content">

                <div className="kpi-grid">

                    <KpiCard
                        title="Total Bookings"
                        value={dashboardData.kpis.totalBookings}
                    />

                    <KpiCard
                        title="Today's Bookings"
                        value={dashboardData.kpis.todaysBookings}
                    />

                    <KpiCard
                        title="Completed"
                        value={dashboardData.kpis.completedBookings}
                    />

                    <KpiCard
                        title="Pending"
                        value={dashboardData.kpis.pendingBookings}
                    />

                    <KpiCard
                        title="Cancelled"
                        value={dashboardData.kpis.cancelledBookings}
                    />

                    <KpiCard
                        title="Total Revenue"
                        value={`₹${dashboardData.kpis.totalRevenue.toLocaleString()}`}
                    />

                    <KpiCard
                        title="Active Mechanics"
                        value={dashboardData.kpis.activeMechanics}
                    />

                    <KpiCard
                        title="New Customers"
                        value={dashboardData.kpis.newCustomers}
                    />

                </div>
            </div>


            <div className="charts-section">

                <BookingsChart
                    data={dashboardData.bookingsOverTime}
                />

                <BookingStatusChart
                    data={dashboardData.bookingStatus}
                />

                <RevenueChart
                    data={dashboardData.revenueOverTime}
                />

                <ServiceBreakdownChart
                    data={dashboardData.serviceBreakdown}
                />

            </div>

       <div className="table-card dashboard-bookings-card">

    <div className="table-header">

        <div className="table-title">
            <h2>Recent Bookings</h2>
            <p>Manage and monitor service bookings</p>
        </div>

        <div className="table-controls">

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search bookings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            <select
                value={statusFilter}
                onChange={handleStatusChange}
            >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="Mechanic On The Way">
                    Mechanic On The Way
                </option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>

        </div>

    </div>

</div>


        {/* Bookings table */}
        <BookingsTable
            bookings={bookings}
            searchTerm={search}
            setSearchTerm={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onBookingUpdated={fetchBookings}
        />

        {/* Pagination */}
        <Pagination
            currentPage={pagination?.currentPage || 1}
            totalPages={pagination?.totalPages || 1}
            onPageChange={setCurrentPage}
        />
        </main>
    );
}

export default Dashboard;

