import { useEffect, useState } from "react";
import { getServices } from "../services/serviceService";

function Services() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // -----------------------------
    // FETCH SERVICES
    // -----------------------------
    const fetchServices = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getServices();

            setServices(data);

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
        fetchServices();
    }, []);


    // -----------------------------
    // LOADING
    // -----------------------------
    if (loading) {
        return (
            <main className="dashboard loading-page">
                <div className="loading-content">

                    <div className="loading-spinner"></div>

                    <h1>Loading Services</h1>

                    <p>Getting your services ready</p>

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
                        We couldn't load the services.
                        Please try again in a moment.
                    </p>

                    <button
                        className="retry-button"
                        onClick={fetchServices}
                    >
                        Try Again
                    </button>

                </div>
            </main>
        );
    }


    return (
        <main className="dashboard">

            {/* Page heading */}
            <div className="dashboard-heading">
                <h1>Services</h1>
                <p>Manage your vehicle service offerings</p>
            </div>


            {/* Services table */}
            <div className="table-card">

                <div className="table-header">
                    <div className="table-title">
                        <h2>All Services</h2>
                        <p>
                            {services.length} services available
                        </p>
                    </div>
                </div>


                <div className="table-wrapper">

                    <table>

                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Base Price</th>
                            </tr>
                        </thead>


                        <tbody>

                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan="3">
                                        No services found
                                    </td>
                                </tr>
                            ) : (
                                services.map((service) => (
                                    <tr key={service._id}>

                                        <td>
                                            {service.name || "N/A"}
                                        </td>

                                        <td>
                                            {service.category || "N/A"}
                                        </td>

                                        <td>
                                            ₹{service.basePrice?.toLocaleString() || 0}
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

export default Services;

