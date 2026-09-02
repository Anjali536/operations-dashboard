import { updateBookingStatus } from "../services/BookingService";

function BookingsTable({ bookings, onBookingUpdated }) {
    const handleStatusChange = async (bookingId, status) => {
        try {
            await updateBookingStatus(bookingId, status);
            onBookingUpdated();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Customer</th>
                        <th>Vehicle</th>
                        <th>Service</th>
                        <th>Mechanic</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.length === 0 ? (
                        <tr>
                            <td colSpan="8">
                                No bookings found
                            </td>
                        </tr>
                    ) : (
                        bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>
                                    {booking.bookingId || "N/A"}
                                </td>

                                <td>
                                    {booking.customer?.name || "N/A"}
                                </td>

                                <td>
                                    {booking.vehicle
                                        ? `${booking.vehicle.make} ${booking.vehicle.model}`
                                        : "N/A"}
                                </td>

                                <td>
                                    {booking.service?.name || "N/A"}
                                </td>

                                <td>
                                    {booking.mechanic?.name || "Unassigned"}
                                </td>

                                <td>
                                    {new Date(
                                        booking.scheduledAt
                                    ).toLocaleString()}
                                </td>

                                <td>
                                    <select
                                        value={booking.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                booking._id,
                                                e.target.value
                                            )
                                        }
                                    >
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
                                </td>

                                <td>
                                    ₹
                                    {booking.amount?.toLocaleString() || 0}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BookingsTable;