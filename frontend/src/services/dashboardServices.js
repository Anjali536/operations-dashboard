const API_URL = import.meta.env.VITE_API_URL;

export const getDashboardData = async () => {
    const response = await fetch(`${API_URL}/dashboard`);

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return response.json();
};