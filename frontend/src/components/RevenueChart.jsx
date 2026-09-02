import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function RevenueChart({ data }) {
    const chartData = data.map((item) => ({
        date: item._id,
        revenue: item.revenue
    }));

    return (
        <div className="chart-card">
            <div className="chart-header">
                <h2>Revenue Over Time</h2>
                <p>Daily revenue from completed bookings</p>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11 }}
                        />

                        <YAxis />

                        <Tooltip
                            formatter={(value) =>
                                `₹${value.toLocaleString()}`
                            }
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            strokeWidth={2}
                            fillOpacity={0.2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RevenueChart;