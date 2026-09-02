import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function ServiceBreakdownChart({ data }) {
    const chartData = data.map((item) => ({
        service: item._id,
        bookings: item.count
    }));

    return (
        <div className="chart-card">
            <div className="chart-header">
                <h2>Service Breakdown</h2>
                <p>Bookings by service category</p>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="service"
                            tick={{ fontSize: 11 }}
                        />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="bookings"
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ServiceBreakdownChart;