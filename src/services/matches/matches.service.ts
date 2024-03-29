import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";
import { Player } from "../players/players.service";
import { Tournament } from "../tournaments/tournaments.service";

// Types
export type Match = {
  id: number;
  status: string;
  homeId: number;
  awayId: number;
  date: string;
  round: string;
  winnerId: number;
  homeSets: number;
  awaySets: number;
  homeSet1: number;
  homeSet2: number;
  homeSet3: number;
  homeSet4: number;
  homeSet5: number;
  awaySet1: number;
  awaySet2: number;
  awaySet3: number;
  awaySet4: number;
  awaySet5: number;
  tournamentId: number;
  favoriteId?: string;
} & MatchStatsViewModel;

export type MatchStatsViewModel = {
  homeAces?: number;
  homeDoubleFaults?: number;
  homeWinners?: number;
  homeUnforcedErrors?: number;
  awayAces?: number;
  awayDoubleFaults?: number;
  awayWinners?: number;
  awayUnforcedErrors?: number;
};

export type MatchesByRoundViewModel = {
  round: {
    _id: string;
    name: string;
  };
  matches: MatchCardViewModel[];
};

export type MatchesByTournament = {
  tournament: Tournament;
  matches: MatchCardViewModel[];
};

export type MatchCardViewModel = {
  id: number;
  date: string;
  homeId: number;
  homePlayer: {
    name: string;
    ranking: number;
    countryKey: string;
  };
  homeSets: number;
  awayId: number;
  awayPlayer: {
    name: string;
    ranking: number;
    countryKey: string;
  };
  awaySets: number;
  winnerId: number;
  status: string;
  favoriteId: string;
};

export type FilterByPlayerAndSurface = {
  skipMatchId: number;
  playerId: number;
  surface: string;
  email: string;
};

export type FilterByPlayersAndSurface = {
  skipMatchId: number;
  homeId: number;
  awayId: number;
  surface: string;
};

export type GetMatchesViewModel = {
  matches: MatchCardViewModel[];
};

export type GetDrawMatchesViewModel = {
  matches: MatchCardViewModel[];
};

export type GetMatchesGroupedByRoundVieModel = {
  groupedMatches: MatchesByRoundViewModel[];
};

export type GetMatchesGroupedByTournament = {
  groupedMatches: MatchesByTournament[];
};

export type GetLastMatchesByPlayerViewModel = {
  player: Player;
  matches: MatchCardViewModel[];
};

export type SingleMatchViewModel = {
  match: Match;
};

// React Query Hooks

export function useMatchesByTournamentAndDate(
  tournamentId?: number,
  date?: string,
  email?: string
) {
  return useQuery([`matches`, tournamentId, date, email], () =>
    getMatchesByTournamentAndDate(tournamentId, date, email)
  );
}

export function useMatchesByTournamentAndRound(
  tournamentId: number,
  roundId: string
) {
  return useQuery(["matches", tournamentId, roundId], () =>
    getMatchesByTournamentAndRound(tournamentId, roundId)
  );
}

export function useMatchesByTournamentGroupByRound(tournamentId: number) {
  return useQuery(["matches/byTournamentGroupedByRound", tournamentId], () =>
    getMatchesByTournamentGroupByRound(tournamentId)
  );
}

export function useMatchesByPlayerGroupByTournament(playerId: number) {
  return useQuery(["matches/byPlayer", playerId], () =>
    getMatchesByPlayerGroupByTournament(playerId)
  );
}

export function useLastMatchesByPlayer(filter: FilterByPlayerAndSurface) {
  return useQuery(["matches/lastByPlayer", filter], () =>
    getLastMatchesByPlayer(filter)
  );
}

export function useLastH2HMatchesByPlayer(
  filter: FilterByPlayersAndSurface,
  email: string
) {
  return useQuery(["matches/lastH2HMatches", filter], () =>
    getLastH2HMatchesByPlayer(filter, email)
  );
}

export function useSingleMatch(id: number) {
  return useQuery([`matches/${id}`, id], () => getSingleMatch(id));
}

// API Methods

const getMatchesByTournamentAndDate = async (
  tournamentId?: number,
  date?: string,
  email?: string
) => {
  const response = await axios.get<GetMatchesViewModel>(
    `${BASE_URL}/matches/byTournamentAndDate?tournamentId=${tournamentId}&date=${date}&email=${email}`
  );
  const result = response.data;
  return result;
};

const getMatchesByTournamentAndRound = async (
  tournamentId: number,
  roundId: string
) => {
  const response = await axios.get<GetDrawMatchesViewModel>(
    `${BASE_URL}/matches/byTournamentAndRound?tournamentId=${tournamentId}&roundId=${roundId}`
  );
  const result = response.data;

  return result;
};

const getMatchesByTournamentGroupByRound = async (tournamentId: number) => {
  const response = await axios.get<GetMatchesGroupedByRoundVieModel>(
    `${BASE_URL}/matches/byTournamentGroupByRound?tournamentId=${tournamentId}`
  );
  const result = response.data;

  return result;
};

const getLastMatchesByPlayer = async (filters: FilterByPlayerAndSurface) => {
  const response = await axios.post<GetLastMatchesByPlayerViewModel>(
    `${BASE_URL}/matches/lastByPlayer`,
    {
      ...filters,
    }
  );
  const result = response.data;

  return result;
};

const getLastH2HMatchesByPlayer = async (
  filter: FilterByPlayersAndSurface,
  email: string
) => {
  const response = await axios.post<GetMatchesViewModel>(
    `${BASE_URL}/matches/lastH2HByPlayer`,
    {
      ...filter,
      email,
    }
  );
  const result = response.data;

  return result;
};

const getMatchesByPlayerGroupByTournament = async (playerId: number) => {
  const response = await axios.get<GetMatchesGroupedByTournament>(
    `${BASE_URL}/matches/byPlayerGroupByTournament?playerId=${playerId}`
  );
  const result = response.data;

  return result;
};

const getSingleMatch = async (id: number) => {
  const response = await axios.get<SingleMatchViewModel>(
    `${BASE_URL}/matches/${id}`
  );
  const result = response.data;

  return result;
};
