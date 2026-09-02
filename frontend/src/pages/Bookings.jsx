import { useEffect, useState } from "react";
import { getBookings } from "../services/BookingService";
import BookingsTable from "../components/BookingsTable";
import Pagination from "../components/Pagination";

function Bookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);


    // -----------------------------
    // FETCH BOOKINGS
    // -----------------------------
    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError("");

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
            setLoading(false);
        }
    };


    // -----------------------------
    // FETCH WHEN FILTER / PAGE
    // CHANGES
    // -----------------------------
    useEffect(() => {
        fetchBookings();
    }, [currentPage, searchQuery, statusFilter]);


    // -----------------------------
    // SEARCH
    // -----------------------------
    const handleSearch = (e) => {
        e.preventDefault();

        setCurrentPage(1);
        setSearchQuery(search);
    };


    // -----------------------------
    // STATUS FILTER
    // -----------------------------
    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };


    // -----------------------------
    // LOADING
    // -----------------------------
    if (loading) {
        return (
            <main className="dashboard loading-page">
                <div className="loading-content">

                    <div className="loading-spinner"></div>

                    <h1>Loading Bookings</h1>

                    <p>Getting your bookings ready</p>

                </div>
            </main>
        );
    }


    // -----------------------------
    // ERROR
    // -----------------------------
    if (error) {
        return (
            <main className="dashboard error-page">
                <div className="error-content">

                    <div className="error-icon">
                        !
                    </div>

                    <h1>Error: Data failed to fetch</h1>

                    <p>
                        We couldn't load the bookings.
                        Please try again in a moment.
                    </p>

                    <button
                        className="retry-button"
                        onClick={fetchBookings}
                    >
                        Try Again
                    </button>

                </div>
            </main>
        );
    }

    return (
        <main className="dashboard">

            {/* Page Heading */}
            <div className="dashboard-heading">
                <h1>Bookings</h1>
                <p>Manage and monitor all vehicle service bookings</p>
            </div>


            {/* Bookings Card */}
            <div className="table-card">

                {/* Table Header */}
                <div className="table-header">

                    {/* Left Side */}
                    <div className="table-title">
                        <h2>All Bookings</h2>
                        <p>
                            {pagination?.totalBookings || 0} total bookings
                        </p>
                    </div>


                    {/* Right Side */}
                    <div className="table-controls">

                        {/* Search */}
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search bookings..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />
                        </form>


                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={handleStatusChange}
                        >
                            <option value="All">
                                All Statuses
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Assigned">
                                Assigned
                            </option>

                            <option value="Mechanic On The Way">
                                Mechanic On The Way
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>
                        </select>

                    </div>

                </div>


                {/* Bookings Table */}
                <BookingsTable
                    bookings={bookings}
                    onBookingUpdated={fetchBookings}
                />


                {/* Pagination */}
                <Pagination
                    currentPage={pagination?.currentPage || 1}
                    totalPages={pagination?.totalPages || 1}
                    onPageChange={setCurrentPage}
                />

            </div>

        </main>
    );
}

export default Bookings;