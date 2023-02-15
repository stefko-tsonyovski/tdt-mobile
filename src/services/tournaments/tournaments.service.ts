import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";

export type Tournament = {
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
  favoritesCount: number;
};

export type GetAllTournamentsViewModel = {
  tournaments: Tournament[];
};

// React Query hooks

export function useTournamentsByWeek(weekId: string) {
  return useQuery(["tournamentsByWeek", weekId], () =>
    getAllTournamentsByWeek(weekId)
  );
}

// API methods

export const getAllTournamentsByWeek = async (weekId: string) => {
  const response = await axios.get<GetAllTournamentsViewModel>(
    `${BASE_URL}/tournaments/byWeek?weekId=${weekId}`
  );
  const result = response.data;

  return result;
};
