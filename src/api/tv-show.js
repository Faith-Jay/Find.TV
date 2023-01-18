import axios from "axios"
import { FAKE_POPULARS, FAKE_RECOMMENDATIONS } from "./Fake_data"
import { BASE_URL, API_KEY_PARAM } from "../config";

export class TVShowAPI {
    static async fecthPopulars() {
        const response = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`);
        // console.log(response.data.results);
        return response.data.results;
        // return FAKE_POPULARS;
    }

    static async fecthRecommendations(tvShowId) {
        const response = await axios.get(`${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`);
        // console.log(response.data.results);
        return response.data.results;
        // return FAKE_RECOMMENDATIONS;
    }

    static async fecthByTitle(title) {
        const response = await axios.get(`${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`);
        return response.data.results;
    }
}
//a25b098c458340317946083b1a97173c
//https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US