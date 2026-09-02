import { useEffect, useState } from "react";
import { getMechanics } from "../services/mechanicService";

function Mechanics() {

    const [mechanics, setMechanics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // -----------------------------
    // FETCH MECHANICS
    // -----------------------------
    const fetchMechanics = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getMechanics();

            setMechanics(data);

        } catch (error) {
            console.error(error);
            setError(error.message);

        } finally {
            setLoading(false);
        }
    };


    // -----------------------------
    // FETCH ON PAGE LOAD
    // -----------------------------
    useEffect(() => {
        fetchMechanics();
    }, []);


    // -----------------------------
    // LOADING
    // -----------------------------
    if (loading) {
        return (
            <main className="dashboard loading-page">
                <div className="loading-content">

                    <div className="loading-spinner"></div>

                    <h1>Loading Mechanics</h1>

                    <p>Getting your mechanics ready</p>

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
                        We couldn't load the mechanics.
                        Please try again in a moment.
                    </p>

                    <button
                        className="retry-button"
                        onClick={fetchMechanics}
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
                <h1>Mechanics</h1>
                <p>Manage and monitor your service mechanics</p>
            </div>

            <div className="table-card">

                <div className="table-header">
                    <div className="table-title">
                        <h2>All Mechanics</h2>
                        <p>
                            {mechanics.length} mechanics available
                        </p>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table>

                        <thead>
                            <tr>
                                <th>Mechanic</th>
                                <th>Status</th>
                                <th>Jobs Completed</th>
                                <th>Current / Last Booking</th>
                            </tr>
                        </thead>

                        <tbody>
                            {mechanics.length === 0 ? (
                                <tr>
                                    <td colSpan="4">
                                        No mechanics found
                                    </td>
                                </tr>
                            ) : (
                                mechanics.map((mechanic) => (
                                    <tr key={mechanic._id}>

                                        <td>
                                            {mechanic.name || "N/A"}
                                        </td>

                                        <td>
                                            <span className="status">
                                                {mechanic.status || "N/A"}
                                            </span>
                                        </td>

                                        <td>
                                            {mechanic.jobsCompleted || 0}
                                        </td>

                                        <td>
                                            {mechanic.currentBooking?.bookingId ||
                                                mechanic.lastBooking?.bookingId ||
                                                "No booking"}
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>

            </div>

        </main>
    );
}

export default Mechanics;

