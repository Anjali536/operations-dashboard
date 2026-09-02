const API_URL = import.meta.env.VITE_API_URL;

export const getCustomers = async () => {
    const response = await fetch(`${API_URL}/customers`);

    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }

    return response.json();
};

