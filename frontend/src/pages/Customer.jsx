import { useEffect, useState } from "react";
import { getCustomers } from "../services/customerService";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // -----------------------------
    // FETCH CUSTOMERS
    // -----------------------------
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getCustomers();

            setCustomers(data);

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
        fetchCustomers();
    }, []);


    // -----------------------------
    // LOADING
    // -----------------------------
    if (loading) {
        return (
            <main className="dashboard loading-page">
                <div className="loading-content">

                    <div className="loading-spinner"></div>

                    <h1>Loading Customers</h1>

                    <p>Getting your customers ready</p>

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
                        We couldn't load the customers.
                        Please try again in a moment.
                    </p>

                    <button
                        className="retry-button"
                        onClick={fetchCustomers}
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
                <h1>Customers</h1>
                <p>Manage and monitor your customers</p>
            </div>


            {/* Customers table */}
            <div className="table-card">

                <div className="table-header">
                    <div className="table-title">
                        <h2>All Customers</h2>
                        <p>
                            {customers.length} customers registered
                        </p>
                    </div>
                </div>


                <div className="table-wrapper">

                    <table>

                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>


                        <tbody>

                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan="3">
                                        No customers found
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer._id}>

                                        <td>
                                            {customer.name || "N/A"}
                                        </td>

                                        <td>
                                            {customer.email || "N/A"}
                                        </td>

                                        <td>
                                            {customer.phone || "N/A"}
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

export default Customers;

