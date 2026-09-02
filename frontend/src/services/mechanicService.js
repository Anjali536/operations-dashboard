const API_URL = import.meta.env.VITE_API_URL;

export const getMechanics = async () => {
    const response = await fetch(`${API_URL}/mechanics`);

    if (!response.ok) {
        throw new Error("Failed to fetch mechanics");
    }

    return response.json();
};

