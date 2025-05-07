import axios from "axios";

const API_URL = "https://ghibliapi.vercel.app";

export const ghibliService = {
    getFilms: async () => {
        const response = await axios.get(`${API_URL}/films`);
        return response.data;
    },
    getFilmsById: async (id: string) => {
        const response = await axios.get(`${API_URL}/films/${id}`);
        return response.data;
    }
}