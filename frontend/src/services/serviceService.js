const API_URL = import.meta.env.VITE_API_URL;

export const getServices = async () => {
    const response = await fetch(`${API_URL}/services`);

    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }

    return response.json();
};

