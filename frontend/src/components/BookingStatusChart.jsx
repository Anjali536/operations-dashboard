import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function BookingStatusChart({ data }) {

    const chartData = data.map((item) => ({
        name: item._id,
        value: item.count
    }));


    // Fixed colors for each booking status
    const STATUS_COLORS = {
        Pending: "#c49139",
        Assigned: "#1c3e79",
        "Mechanic On The Way": "#6946bc",
        Completed: "#369374",
        Cancelled: "#a73939"
    };


    return (
        <div className="chart-card">

            <div className="chart-header">
                <h2>Booking Status</h2>
                <p>Current booking distribution</p>
            </div>


            <div className="chart-container">

                <ResponsiveContainer width="100%" height={300}>

                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={3}
                        >

                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        STATUS_COLORS[entry.name] ||
                                        "#64748b"
                                    }
                                />
                            ))}

                        </Pie>


                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default BookingStatusChart;