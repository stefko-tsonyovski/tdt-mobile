import axios from "axios"
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";

// Types
export type TournamentDto = {
    id: number;
    name: string;
    city: string;
    code: string;
    startDate: string;
    endDate: string;
    countryName: string;
    countryCode: string;
    countryKey: string;
    matchesCount: number;
    surface: string;
    season: number;
    favoritesCount: number, 
};

export type GetAllTournamentsViewModel = {
    tournaments: TournamentDto[],
};

//React Query Hooks

export function useAllTournaments() {
    return useQuery(["tournaments"], getAllTournaments);
};

export function useAllTournamentsByDate(date: string) {
    return useQuery(["tournaments", () =>  getAllTournamentsByDate(date)]);
};

// API Methods

const getAllTournaments = async () => {
    const response = await axios.get<GetAllTournamentsViewModel>(`${BASE_URL}/tournaments`);
    const result = response.data;
    
    return result;
};

const getAllTournamentsByDate = async (date: string) => {
    const response = await axios.get<GetAllTournamentsViewModel>(`${BASE_URL}/tournaments/byDate/${date}`)
    const result = response.data;

    return result;
};