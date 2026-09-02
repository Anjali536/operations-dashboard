const API_URL = import.meta.env.VITE_API_URL;

export const updateBookingStatus = async (bookingId, status) => {
    const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    });

    if (!response.ok) {
        throw new Error("Failed to update booking status");
    }

    return response.json();
};

export const getBookings = async (
    page = 1,
    limit = 10,
    search = "",
    status = "All"
) => {
    const params = new URLSearchParams({
        page,
        limit
    });

    if (search.trim()) {
        params.append("search", search.trim());
    }

    if (status && status !== "All") {
        params.append("status", status);
    }

    const response = await fetch(
        `${API_URL}/bookings?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    return response.json();
};