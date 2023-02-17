import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";

// Types
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

export type GetSingleTournamentViewModel = {
  tournament: Tournament;
};

//React Query Hooks

export function useAllTournaments() {
  return useQuery(["tournaments"], getAllTournaments);
}

export function useAllTournamentsByDate(date: string, email: string) {
  return useQuery(["tournaments", date], () =>
    getAllTournamentsByDate(date, email)
  );
}

export function useTournamentsByWeek(weekId: string) {
  return useQuery(["tournamentsByWeek", weekId], () =>
    getAllTournamentsByWeek(weekId)
  );
}

export function useSingleTournament(tournamentId: number) {
  return useQuery(["tournaments/byId", tournamentId], () =>
    getSingleTournament(tournamentId)
  );
}

// API Methods

const getAllTournaments = async () => {
  const response = await axios.get<GetAllTournamentsViewModel>(
    `${BASE_URL}/tournaments`
  );
  const result = response.data;

  return result;
};

const getAllTournamentsByDate = async (date: string, email: string) => {
  const response = await axios.get<GetAllTournamentsViewModel>(
    `${BASE_URL}/tournaments/byDate?date=${date}&email=${email}`
  );
  const result = response.data;

  return result;
};

export const getAllTournamentsByWeek = async (weekId: string) => {
  const response = await axios.get<GetAllTournamentsViewModel>(
    `${BASE_URL}/tournaments/byWeek?weekId=${weekId}`
  );
  const result = response.data;

  return result;
};

const getSingleTournament = async (tournamentId: number) => {
  const response = await axios.get<GetSingleTournamentViewModel>(
    `${BASE_URL}/tournaments/${tournamentId}`
  );
  const result = response.data;

  return result;
};
