import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function BookingsChart({ data }) {
    const chartData = data.map((item) => ({
        date: item._id,
        bookings: item.bookings
    }));

    return (
        <div className="chart-card">
            <div className="chart-header">
                <h2>Bookings Over Time</h2>
                <p>Daily booking activity</p>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11 }}
                        />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="bookings"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BookingsChart;